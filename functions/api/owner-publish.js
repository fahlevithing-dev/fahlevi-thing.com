import { requireSession } from '../_lib/session.js';
import { getFile, commitFiles } from '../_lib/github.js';
import { renderArticleHTML, paragraphize, slugify, isoDate, humanDate } from '../_lib/template.js';

function jsonEscape(s) {
    return JSON.stringify(String(s || ''));
}

function insertAfterMarker(source, marker, insertion) {
    const idx = source.indexOf(marker);
    if (idx === -1) throw new Error(`Could not find anchor "${marker}" - the file may have changed shape.`);
    const pos = idx + marker.length;
    return source.slice(0, pos) + insertion + source.slice(pos);
}

function stripHtmlToText(html) {
    return String(html || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

async function handleCreate(env, body) {
    const required = ['titleEn', 'titleId', 'category', 'excerptEn', 'excerptId', 'bodyEn', 'bodyId'];
    for (const key of required) {
        if (!body[key] || !String(body[key]).trim()) throw new Error(`Missing field: ${key}`);
    }

    const slug = (body.slug && slugify(body.slug)) || slugify(body.titleEn);
    if (!slug) throw new Error('Could not derive a URL slug from the title - please set one manually.');

    const existing = await getFile(env.GITHUB_TOKEN, `${slug}.html`);
    if (existing) throw new Error(`A post already exists at /${slug} - choose a different slug or use Edit instead.`);

    const now = new Date();
    const isoDateStr = isoDate(now);
    const humanDateStr = humanDate(now);
    const descriptionEn = stripHtmlToText(body.excerptEn).slice(0, 300);

    const image = body.image && body.image.path ? body.image.path : '';

    const articleHtml = renderArticleHTML({
        slug,
        titleEn: body.titleEn,
        titleId: body.titleId,
        category: body.category,
        humanDateStr,
        isoDateStr,
        descriptionEn,
        bodyEn: body.bodyEn,
        bodyId: body.bodyId,
        image,
    });

    const scriptFile = await getFile(env.GITHUB_TOKEN, 'script.js');
    const translationsFile = await getFile(env.GITHUB_TOKEN, 'translations.js');
    const sitemapFile = await getFile(env.GITHUB_TOKEN, 'sitemap.xml');
    const feedFile = await getFile(env.GITHUB_TOKEN, 'feed.xml');

    const allPostsEntry = `
        {
            title: ${jsonEscape(body.titleEn)},
            url: ${jsonEscape(slug)},
            category: ${jsonEscape(body.category)},
            date: ${jsonEscape(humanDateStr)},
            excerpt: ${jsonEscape(stripHtmlToText(body.excerptEn))},
            image: ${jsonEscape(image)}
        },`;
    const newScriptJs = insertAfterMarker(scriptFile.content, 'const allPosts = [', allPostsEntry);

    const translationsEntry = `
            ${jsonEscape(slug)}: {
                titleId: ${jsonEscape(body.titleId)},
                excerptId: ${jsonEscape(stripHtmlToText(body.excerptId))}
            },`;
    const newTranslationsJs = insertAfterMarker(translationsFile.content, 'posts: {', translationsEntry);

    const sitemapEntry = `\n    <url><loc>https://fahlevi-thing.com/${slug}</loc><lastmod>${isoDateStr}</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>`;
    const sitemapMarker = '</urlset>';
    const sitemapIdx = sitemapFile.content.lastIndexOf(sitemapMarker);
    if (sitemapIdx === -1) throw new Error('Could not find </urlset> in sitemap.xml');
    const newSitemap = sitemapFile.content.slice(0, sitemapIdx) + sitemapEntry + '\n' + sitemapFile.content.slice(sitemapIdx);

    const feedEntry = `    <item>
      <title>${body.titleEn.replace(/&/g, '&amp;').replace(/</g, '&lt;')}</title>
      <link>https://fahlevi-thing.com/${slug}</link>
      <guid isPermaLink="true">https://fahlevi-thing.com/${slug}</guid>
      <pubDate>${now.toUTCString()}</pubDate>
      <category>${body.category}</category>
      <description>${descriptionEn.replace(/&/g, '&amp;').replace(/</g, '&lt;')}</description>
    </item>\n`;
    const feedMarker = /<item>/;
    const feedMatch = feedFile.content.match(feedMarker);
    const newFeed = feedMatch
        ? feedFile.content.slice(0, feedMatch.index) + feedEntry + feedFile.content.slice(feedMatch.index)
        : feedFile.content.replace('</channel>', feedEntry + '</channel>');

    const files = [
        { path: `${slug}.html`, content: articleHtml, encoding: 'utf-8' },
        { path: 'script.js', content: newScriptJs, encoding: 'utf-8' },
        { path: 'translations.js', content: newTranslationsJs, encoding: 'utf-8' },
        { path: 'sitemap.xml', content: newSitemap, encoding: 'utf-8' },
        { path: 'feed.xml', content: newFeed, encoding: 'utf-8' },
    ];

    if (body.image && body.image.dataUrl && body.image.path) {
        const base64 = body.image.dataUrl.split(',')[1];
        if (base64) files.push({ path: body.image.path, content: base64, encoding: 'base64' });
    }

    await commitFiles(env.GITHUB_TOKEN, files, `feat: publish "${body.titleEn}" via /owner`);

    return { slug, url: `https://fahlevi-thing.com/${slug}` };
}

async function handleUpdate(env, body) {
    if (!body.slug || !body.content) throw new Error('Missing slug or content.');
    const safeSlug = String(body.slug).replace(/[^a-z0-9-]/gi, '');
    const existing = await getFile(env.GITHUB_TOKEN, `${safeSlug}.html`);
    if (!existing) throw new Error(`No existing post found at /${safeSlug}.`);

    await commitFiles(
        env.GITHUB_TOKEN,
        [{ path: `${safeSlug}.html`, content: body.content, encoding: 'utf-8' }],
        `fix: edit "${safeSlug}" via /owner`
    );

    return { slug: safeSlug, url: `https://fahlevi-thing.com/${safeSlug}` };
}

export async function onRequestPost({ request, env }) {
    if (!(await requireSession(request, env))) {
        return new Response(JSON.stringify({ error: 'Not authenticated.' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
    }
    if (!env.GITHUB_TOKEN) {
        return new Response(JSON.stringify({ error: 'Owner CMS is not configured yet (missing GITHUB_TOKEN).' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }

    let body;
    try {
        body = await request.json();
    } catch {
        return new Response(JSON.stringify({ error: 'Invalid request body.' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    try {
        const result = body.action === 'update' ? await handleUpdate(env, body) : await handleCreate(env, body);
        return new Response(JSON.stringify({ ok: true, ...result }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } catch (e) {
        return new Response(JSON.stringify({ error: String(e.message || e) }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
}

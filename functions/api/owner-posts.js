import { requireSession } from '../_lib/session.js';
import { getFile } from '../_lib/github.js';
import { parseJsLiteral } from '../_lib/jsparse.js';

function extractAllPosts(scriptSource) {
    const marker = 'const allPosts = [';
    const start = scriptSource.indexOf(marker);
    if (start === -1) throw new Error('Could not find allPosts in script.js');
    let depth = 0;
    let i = start + marker.length - 1; // sit on the '['
    for (; i < scriptSource.length; i++) {
        if (scriptSource[i] === '[') depth++;
        else if (scriptSource[i] === ']') {
            depth--;
            if (depth === 0) { i++; break; }
        }
    }
    const arrayLiteral = scriptSource.slice(start + marker.length - 1, i);
    // The literal uses unquoted keys and single/double quotes, which is valid
    // JS but not JSON. Cloudflare Workers disallows eval()/new Function(), so
    // parse it with a small hand-rolled parser instead.
    return parseJsLiteral(arrayLiteral);
}

export async function onRequestGet({ request, env }) {
    if (!(await requireSession(request, env))) {
        return new Response(JSON.stringify({ error: 'Not authenticated.' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
    }
    if (!env.GITHUB_TOKEN) {
        return new Response(JSON.stringify({ error: 'Owner CMS is not configured yet (missing GITHUB_TOKEN).' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }

    const url = new URL(request.url);
    const slug = url.searchParams.get('slug');

    try {
        if (slug) {
            const safeSlug = slug.replace(/[^a-z0-9-]/gi, '');
            const file = await getFile(env.GITHUB_TOKEN, `${safeSlug}.html`);
            if (!file) {
                return new Response(JSON.stringify({ error: 'No post found for that slug.' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
            }
            return new Response(JSON.stringify({ slug: safeSlug, content: file.content }), { status: 200, headers: { 'Content-Type': 'application/json' } });
        }

        const scriptFile = await getFile(env.GITHUB_TOKEN, 'script.js');
        const posts = extractAllPosts(scriptFile.content).map((p) => ({ title: p.title, url: p.url, category: p.category, date: p.date }));
        return new Response(JSON.stringify({ posts }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } catch (e) {
        return new Response(JSON.stringify({ error: String(e.message || e) }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
}

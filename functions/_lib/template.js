// Generates a new article's full HTML, matching the structure every other
// post on the site already uses (meta tags, JSON-LD, header/footer, the
// EN/ID excerpt-div bilingual pattern). Keeping this in one place means a
// post made through /owner looks identical to one written by hand.

function esc(s) {
    return String(s || '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

// Plain-text paragraphs (blank-line separated) -> <p> tags.
// If the input already contains HTML tags, it's passed through untouched.
export function paragraphize(text) {
    const t = String(text || '').trim();
    if (!t) return '';
    if (/<[a-z][\s\S]*>/i.test(t)) return t;
    return t
        .split(/\n\s*\n/)
        .map((p) => p.trim())
        .filter(Boolean)
        .map((p) => `<p>${p.replace(/\n/g, '<br>')}</p>`)
        .join('\n\n                        ');
}

export function isoDate(d) {
    return d.toISOString().slice(0, 10);
}

export function humanDate(d) {
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export function slugify(title) {
    return String(title)
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

export function renderArticleHTML({ slug, titleEn, titleId, category, humanDateStr, isoDateStr, descriptionEn, bodyEn, bodyId, image }) {
    const figureBlock = image
        ? `<figure>
                            <img src="${esc(image)}" alt="${esc(titleEn)}" class="article-icon-image">
                        </figure>

                        `
        : '';
    const figureBlockId = image
        ? `<figure>
                            <img loading="lazy" decoding="async" src="${esc(image)}" alt="${esc(titleId)}" class="article-icon-image">
                        </figure>

                        `
        : '';
    const ogImage = image
        ? `https://fahlevi-thing.com/${image}`
        : 'https://fahlevi-thing.com/images/logofahlevithing.jpeg';

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="author" content="Reza Fahlevi">
    <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com; font-src 'self' https://fonts.gstatic.com https://cdnjs.cloudflare.com data:; img-src 'self' data: https: blob:; connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://api.emailjs.com https://www.googletagmanager.com https://stats.g.doubleclick.net https://region1.google-analytics.com; frame-src https://www.googletagmanager.com; object-src 'none'; base-uri 'self'; form-action 'self'; upgrade-insecure-requests;">
    <meta name="referrer" content="strict-origin-when-cross-origin">
    <!-- Google Tag Manager -->
    <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-W8Z8Z6KL');</script>
    <!-- End Google Tag Manager -->
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-Y4Q533NLP5"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'G-Y4Q533NLP5');
      gtag('config', 'AW-17921611070');
    </script>
    <meta name="description" content="${esc(descriptionEn)}">
    <link rel="icon" type="image/jpeg" href="images/logofahlevithing.jpeg">
    <title>${esc(titleEn)} - Fahlevi Thing</title>
    <link rel="canonical" href="https://fahlevi-thing.com/${slug}">

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="article">
    <meta property="og:title" content="${esc(titleEn)}">
    <meta property="og:description" content="${esc(descriptionEn)}">
    <meta property="og:url" content="https://fahlevi-thing.com/${slug}">
    <meta property="og:image" content="${ogImage}">

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${esc(titleEn)}">
    <meta name="twitter:description" content="${esc(descriptionEn)}">
    <meta name="twitter:image" content="${ogImage}">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="preconnect" href="https://cdnjs.cloudflare.com">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&family=Lora:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">

    <!-- Structured Data (Schema.org) for Faster Indexing -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": "${esc(titleEn)}",
      "datePublished": "${isoDateStr}",
      "dateModified": "${isoDateStr}",
      "author": {
        "@type": "Person",
        "name": "Reza Fahlevi",
        "url": "https://fahlevi-thing.com/about",
        "sameAs": [
          "https://twitter.com/rezafahlevirff",
          "https://instagram.com/fahlevithing"
        ]
      },
      "description": "${esc(descriptionEn)}",
      "url": "https://fahlevi-thing.com/${slug}",
      "publisher": {
        "@type": "Organization",
        "name": "Fahlevi Thing",
        "url": "https://fahlevi-thing.com",
        "logo": {
          "@type": "ImageObject",
          "url": "https://fahlevi-thing.com/images/logofahlevithing.jpeg"
        }
      },
      "image": "${ogImage}",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://fahlevi-thing.com/${slug}"
      },
      "inLanguage": "en"
    }
    </script>
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://fahlevi-thing.com/" },
        { "@type": "ListItem", "position": 2, "name": "Insights", "item": "https://fahlevi-thing.com/insights" },
        { "@type": "ListItem", "position": 3, "name": "${esc(titleEn)}", "item": "https://fahlevi-thing.com/${slug}" }
      ]
    }
    </script>
    <link rel="alternate" type="application/rss+xml" title="Fahlevi Thing RSS Feed" href="https://fahlevi-thing.com/feed.xml">
    <link rel="stylesheet" href="style.css">
    <meta property="article:published_time" content="${isoDateStr}">
    <meta property="article:modified_time" content="${isoDateStr}">
    <meta property="article:author" content="https://fahlevi-thing.com/about">
    <meta property="article:section" content="${esc(category)}">
</head>
<body>
    <!-- Google Tag Manager (noscript) -->
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-W8Z8Z6KL"
    height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    <!-- End Google Tag Manager (noscript) -->

    <header class="main-header">
        <div class="container header-container">
            <div class="brand">
                <h1 class="brand-name"><a href="/">FAHLEVI THING</a></h1>
                <p class="tagline">a Reza POV</p>
            </div>

            <div class="nav-wrapper">
                <nav class="navbar">
                    <ul class="nav-links">
                        <li><a href="/">HOME</a></li>
                        <li><a href="/#show-portfolio" id="portfolio-nav">MY PORTFOLIO</a></li>
                        <li><a href="/insights">INSIGHTS</a></li>
                        <li><a href="/about">ABOUT</a></li>
                    </ul>
                </nav>

                <div class="search-box">
                    <form action="/search" method="get">
                        <input type="text" placeholder="Search...">
                        <button type="submit" aria-label="Search">
                            <i class="fa-solid fa-magnifying-glass"></i>
                            <span class="eye-icon">👀</span>
                        </button>
                    </form>
                </div>

                <div class="hamburger">
                    <i class="fas fa-bars"></i>
                </div>
            </div>
        </div>
    </header>

    <div class="container main-layout">

        <main class="content-area">

            <article class="post-item">
                <div class="post-details">
                    <div class="meta-cat">${esc(category)} • <span class="meta-date">${humanDateStr}</span></div>
                    <h1>${esc(titleEn)}</h1>

                    <div class="excerpt" lang="en">
                        ${figureBlock}${paragraphize(bodyEn)}
                    </div>
                    <div class="excerpt" lang="id" style="display:none">
                        ${figureBlockId}${paragraphize(bodyId)}
                    </div>
                    <div class="share-container"></div>
                </div>
            </article>

            <div class="recent-posts">
                <h2 class="featured-label" style="margin-top: 40px;">Related Posts</h2>
                <div id="related-posts-container" class="posts-grid">
                    <!-- Static pre-render for crawlers. JS replaces with interactive list. -->
                </div>
            </div>

        </main>

        <aside class="sidebar-area">
            <div class="widget">
                <div class="connect-wrapper">
                    <div class="connect-left">
                        <h3 class="connect-title">Connect</h3>
                        <div class="social-icons">
                            <a href="https://instagram.com/fahlevithing" class="soc-icon ig"><i class="fab fa-instagram"></i></a>
                            <a href="https://twitter.com/rezafahlevirff" class="soc-icon tw"><i class="fab fa-x-twitter"></i></a>
                            <a href="mailto:fahlevithing@gmail.com" class="soc-icon em"><i class="fas fa-envelope"></i></a>
                        </div>
                    </div>
                    <a href="/" class="logo-link">
                        <img src="images/logofahlevithing.jpeg" alt="Fahlevi Thing Logo" class="header-logo">
                    </a>
                </div>
            </div>
        </aside>

    </div>

    <footer>
        <div class="container footer-content">
            <div class="footer-socials">
                <a href="https://instagram.com/fahlevithing" target="_blank" rel="noopener noreferrer"><i class="fab fa-instagram"></i></a>
                <a href="https://twitter.com/rezafahlevirff" target="_blank" rel="noopener noreferrer"><i class="fab fa-twitter"></i></a>
                <a href="mailto:fahlevithing@gmail.com" class="em-link"><i class="fas fa-envelope"></i></a>
            </div>
            <div class="copyright">
                &copy; 2025 <b>Reza Fahlevi</b>. All Rights Reserved.
            </div>
            <div class="footer-legal" style="margin-top: 10px; font-size: 0.8rem;">
                <a href="/privacy" style="color: #999; text-decoration: none; transition: 0.3s;">Privacy Policy</a>
            </div>
        </div>
    </footer>

    <script src="translations.js"></script>
    <script src="script.js"></script>
</body>
</html>
`;
}

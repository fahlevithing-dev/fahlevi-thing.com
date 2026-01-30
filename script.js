document.addEventListener('DOMContentLoaded', () => {
    
    // Toggle Menu Mobile
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            const searchBox = document.querySelector('.search-box');
            if (searchBox) searchBox.classList.toggle('active');
        });
    }
   // --- SEARCH FUNCTIONALITY ---
    const searchForms = document.querySelectorAll('.search-box form');
    searchForms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = form.querySelector('input');
            const query = input.value.trim();
            if (query) {
                window.location.href = `search.html?q=${encodeURIComponent(query.toLowerCase())}`;
            }
        });
    });
    // --- PORTFOLIO OVERLAY LOGIC ---
    // Inject Overlay HTML
    const overlayHTML = `
        <div id="portfolio-overlay" class="portfolio-overlay">
            <div class="close-overlay">&times;</div>
            <div class="overlay-content">
                <h2 class="overlay-title">Investment Portfolio</h2>
                <div class="portfolio-grid">
                    <a href="pwon-analysis.html" class="portfolio-card">
                        <span class="stock-code">PWON</span>
                        <span class="stock-name">Pakuwon Jati</span>
                        <span class="stock-cat">Property Developer</span>
                    </a>
                    <a href="dkft-analysis.html" class="portfolio-card">
                        <span class="stock-code">DKFT</span>
                        <span class="stock-name">Central Omega</span>
                        <span class="stock-cat">Nickel Mining</span>
                    </a>
                    <a href="sril-analysis.html" class="portfolio-card">
                        <span class="stock-code">SRIL</span>
                        <span class="stock-name">Sri Rejeki Isman</span>
                        <span class="stock-cat">Textile & Garment</span>
                    </a>
                    <a href="adro-admr-analysis.html" class="portfolio-card">
                        <span class="stock-code">ADRO & ADMR</span>
                        <span class="stock-name">Adaro Group</span>
                        <span class="stock-cat">Energy & Minerals</span>
                    </a>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', overlayHTML);

    const portfolioNav = document.getElementById('portfolio-nav');
    const overlay = document.getElementById('portfolio-overlay');
    const closeBtn = document.querySelector('.close-overlay');
    const overlayLinks = document.querySelectorAll('.overlay-content a');
 
    if (portfolioNav && overlay && closeBtn) {
        const openPortfolioOverlay = () => overlay.classList.add('active');
        const closePortfolioOverlay = () => {
            overlay.classList.remove('active');
            // Membersihkan hash dari URL setelah overlay ditutup untuk UX yang lebih baik
            if (window.location.hash === '#show-portfolio') {
                history.pushState("", document.title, window.location.pathname + window.location.search);
            }
        };
 
        // 1. Logika saat link navigasi portfolio diklik
        portfolioNav.addEventListener('click', (e) => {
            // Jika sudah di homepage, jangan navigasi, cukup buka overlay.
            const isHomePage = window.location.pathname.endsWith('/') || window.location.pathname.endsWith('index.html');
            if (isHomePage) {
                e.preventDefault();
                openPortfolioOverlay();
            }
            // Jika di halaman lain, biarkan link mengarahkan ke index.html#show-portfolio
        });
 
        // 2. Logika untuk menutup overlay
        closeBtn.addEventListener('click', closePortfolioOverlay);
        overlayLinks.forEach(link => {
            link.addEventListener('click', closePortfolioOverlay);
        });
 
        // 3. Cek URL saat halaman dimuat untuk membuka overlay jika ada hash
        if (window.location.hash === '#show-portfolio') {
            openPortfolioOverlay();
        }
    }

    // --- GOOGLE TRANSLATE WIDGET INJECTION ---
    const socialWidget = document.querySelector('.social-widget');
    if (socialWidget) {
        // Create container for translate widget
        const translateDiv = document.createElement('div');
        translateDiv.id = 'google_translate_element';
        translateDiv.className = 'translate-widget';
        
        // Insert after the social widget
        socialWidget.parentNode.insertBefore(translateDiv, socialWidget.nextSibling);

        // Define the callback function globally
        window.googleTranslateElementInit = function() {
            new google.translate.TranslateElement({
                pageLanguage: 'en',
                includedLanguages: 'id', // Only Indonesian
                layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
                autoDisplay: false
            }, 'google_translate_element');
        };

        // Inject the Google Translate script
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
        document.body.appendChild(script);
    }

    // --- RECENT POSTS LOGIC (SORTED & PAGINATED) ---
    const recentPostsContainer = document.getElementById('recent-posts-container');
    if (recentPostsContainer) {
        // Database of all posts
        const allPosts = [
            {
                title: "DKFT Analysis: Turnaround Story & Nickel Outlook",
                url: "dkft-analysis.html",
                date: "January 6, 2026",
                rawDate: "2026-01-06",
                category: "STOCK ANALYSIS",
                excerpt: "I started paying attention to DKFT shares when the price was still around IDR 180 per share. The company operates as a nickel ore miner and has begun a turnaround after years of persistent losses..."
            },
            {
                title: "The Rise and Fall of Sritex (SRIL): A Tale of Ignored Red Flags",
                url: "sril-analysis.html",
                date: "January 6, 2026",
                rawDate: "2026-01-06",
                category: "STOCK ANALYSIS",
                excerpt: "Sri Rejeki Isman Tbk (SRIL), widely known as Sritex, was once the largest integrated textile manufacturer in Southeast Asia. Its golden era began in 1994 when it secured prestigious contracts..."
            },
            {
                title: "ADRO & ADMR Analysis: Strategic Shift & Green Energy Transition",
                url: "adro-admr-analysis.html",
                date: "January 6, 2026",
                rawDate: "2026-01-06",
                category: "STOCK ANALYSIS",
                excerpt: "I have been observing Adaro Energy (ADRO) for a long time, as it is one of Indonesia’s coal mining companies with relatively stable financial performance despite the cyclical fluctuations in coal prices...",
                image: "images/alamtriminerals.jpg"
            },
            {
                title: "Why Pakuwon Jati (PWON) Remains a Top-Tier Resilient Property Stock",
                url: "pwon-analysis.html",
                date: "January 6, 2026",
                rawDate: "2026-01-06",
                category: "STOCK ANALYSIS",
                excerpt: "PT Pakuwon Jati Tbk (PWON) stands out as one of the most structurally defensive property developers in Indonesia. Its business model—emphasizing high recurring income..."
            },
            {
                title: "Understanding Today’s Sharp IHSG Decline: A Rational Guide for Investors",
                url: "ihsg-decline.html",
                date: "January 28, 2026",
                rawDate: "2026-01-28",
                category: "MARKET UPDATE",
                excerpt: "Today’s sharp decline in the IHSG may feel unsettling, especially for new investors still adapting to market fluctuations. Seeing a portfolio turn red simultaneously often raises concern..."
            },
            {
                title: "The Miracle of the \"Modest\" 20 Percent",
                url: "miracle-of-20-percent.html",
                date: "January 27, 2026",
                rawDate: "2026-01-27",
                category: "INVESTMENT",
                excerpt: "Historically (from 1965 to 2023), Berkshire Hathaway has achieved a Compound Annual Growth Rate (CAGR) of approximately 19.8%. While this figure may seem modest..."
            },
            {
                title: "Fahlevi's Investment Portfolio",
                url: "portfolio.html",
                date: "January 27, 2026",
                rawDate: "2026-01-27",
                category: "PORTFOLIO",
                excerpt: "In this post, I will share my current portfolio, which I will regularly update to reflect my latest work and progress. Below is the current composition of my personal stock portfolio..."
            },
            {
                title: "How China Could Win Against The US",
                url: "china-ai-race.html",
                date: "January 15, 2026",
                rawDate: "2026-01-15",
                category: "TECHNOLOGY",
                excerpt: "The global narrative on Artificial Intelligence is often hyper-focused on who has the smartest chatbot or the fastest chip. However, this perspective mistakes the frosting for the cake..."
            },
            {
                title: "Plaza Indonesia Realty & Pakuwon Jati",
                url: "property-analysis.html",
                date: "December 26, 2025",
                rawDate: "2025-12-26",
                category: "STOCK ANALYSIS",
                excerpt: "As of 31 December 2024, Plaza Indonesia Realty Tbk (PLIN) owns and manages three core property portfolios. Meanwhile, Pakuwon Jati Tbk (PWON) stands out...",
                image: "images/grand-hyatt-jakarta-p202-new-exterior.16x9.webp"
            },
            {
                title: "How I Got Into The World of Investing?",
                url: "investment-journey.html",
                date: "December 26, 2025",
                rawDate: "2025-12-26",
                category: "INVESTMENT",
                excerpt: "Me, Reza Fahlevi. I would like to begin my first post by sharing my personal introduction to the world of stock market investing. I was first exposed to investment concepts..."
            }
        ];

        // 1. Sort by Date (Newest First)
        allPosts.sort((a, b) => new Date(b.rawDate) - new Date(a.rawDate));

        // 2. Filter out current page
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        const filteredPosts = allPosts.filter(post => post.url !== currentPath);

        // 3. Pagination Logic
        const postsPerPage = 8;
        let currentPage = 1;

        function renderPosts(page) {
            recentPostsContainer.innerHTML = '';
            
            const start = (page - 1) * postsPerPage;
            const end = start + postsPerPage;
            const paginatedPosts = filteredPosts.slice(start, end);

            paginatedPosts.forEach(post => {
                const article = document.createElement('article');
                article.className = 'post-item';
                
                let imageHtml = '';
                if (post.image) {
                    imageHtml = `<div class="post-thumb"><img src="${post.image}" alt="${post.title}"></div>`;
                }

                article.innerHTML = `
                    ${imageHtml}
                    <div class="post-details">
                        <div class="meta-cat">${post.category} • ${post.date}</div>
                        <h2><a href="${post.url}">${post.title}</a></h2>
                        <div class="excerpt"><p>${post.excerpt}</p></div>
                        <a href="${post.url}" class="read-more">Read More</a>
                    </div>
                `;
                recentPostsContainer.appendChild(article);
            });

            // Render Pagination Controls
            if (filteredPosts.length > postsPerPage) {
                const paginationDiv = document.createElement('div');
                paginationDiv.className = 'pagination-controls';
                paginationDiv.style.marginTop = '40px';
                paginationDiv.style.textAlign = 'center';
                paginationDiv.style.display = 'flex';
                paginationDiv.style.justifyContent = 'center';
                paginationDiv.style.gap = '20px';

                if (page > 1) {
                    const prevBtn = document.createElement('button');
                    prevBtn.innerText = '← Previous Page';
                    prevBtn.className = 'read-more';
                    prevBtn.style.background = 'none';
                    prevBtn.style.border = 'none';
                    prevBtn.style.cursor = 'pointer';
                    prevBtn.onclick = () => {
                        currentPage--;
                        renderPosts(currentPage);
                        window.scrollTo({ top: recentPostsContainer.offsetTop - 100, behavior: 'smooth' });
                    };
                    paginationDiv.appendChild(prevBtn);
                }

                if (end < filteredPosts.length) {
                    const nextBtn = document.createElement('button');
                    nextBtn.innerText = 'Next Page →';
                    nextBtn.className = 'read-more';
                    nextBtn.style.background = 'none';
                    nextBtn.style.border = 'none';
                    nextBtn.style.cursor = 'pointer';
                    nextBtn.onclick = () => {
                        currentPage++;
                        renderPosts(currentPage);
                        window.scrollTo({ top: recentPostsContainer.offsetTop - 100, behavior: 'smooth' });
                    };
                    paginationDiv.appendChild(nextBtn);
                }

                recentPostsContainer.appendChild(paginationDiv);
            }
        }

        // Initial Render
        renderPosts(currentPage);
    }
});
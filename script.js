// Load EmailJS SDK for handling emails without backend
// SECURITY NOTE: Ensure you configure "Allowed Origins" in your EmailJS dashboard 
// to restrict usage of these keys to your specific domain (e.g., fahlevithing.com).
(function() {
    var script = document.createElement('script');
    script.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js";
    document.head.appendChild(script);
})();

document.addEventListener('DOMContentLoaded', () => {
    
    // --- SECURITY: FRAME BUSTING (Prevent Clickjacking) ---
    if (window.top !== window.self) {
        window.top.location = window.self.location;
    }
    
    // --- HEADER PRE-TITLE INJECTION ---
    const brandName = document.querySelector('.brand-name');
    if (brandName) {
        const preTitle = document.createElement('div');
        preTitle.className = 'pre-title';
        preTitle.textContent = 'you know nothing, Jon Snow?';
        brandName.parentNode.insertBefore(preTitle, brandName);

        // Hide pre-title on scroll
        window.addEventListener('scroll', () => {
            if (window.scrollY > 20) {
                preTitle.classList.add('hidden');
            } else {
                preTitle.classList.remove('hidden');
            }
        });
    }

    // --- DARK MODE TOGGLE ---
    const navWrapper = document.querySelector('.nav-wrapper');
    if (navWrapper) {
        // Create Toggle Button
        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'theme-toggle';
        toggleBtn.setAttribute('aria-label', 'Toggle Dark Mode');
        toggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
        
        // Insert before hamburger or search box
        const hamburger = document.querySelector('.hamburger');
        if (hamburger) {
            navWrapper.insertBefore(toggleBtn, hamburger);
        } else {
            navWrapper.appendChild(toggleBtn);
        }

        // Check LocalStorage or System Preference
        const currentTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (currentTheme === 'dark' || (!currentTheme && prefersDark)) {
            document.documentElement.setAttribute('data-theme', 'dark');
            toggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
        }

        // Toggle Logic
        toggleBtn.addEventListener('click', () => {
            document.documentElement.classList.add('theme-transition');
            
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            const newTheme = isDark ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            toggleBtn.innerHTML = isDark ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
            
            setTimeout(() => {
                document.documentElement.classList.remove('theme-transition');
            }, 500);
        });
    }

    // --- STICKY BRAND / SCROLLABLE NAV LOGIC ---
    // Separate navigation from header so only the brand remains sticky
    const mainHeader = document.querySelector('.main-header');
    // Re-select navWrapper to ensure we have the element (variable scope)
    const navWrapperEl = document.querySelector('.nav-wrapper');
    
    if (mainHeader && navWrapperEl) {
        // Create new container for nav to maintain layout
        const navContainer = document.createElement('div');
        navContainer.className = 'container';
        
        // Move navWrapper to new container
        navContainer.appendChild(navWrapperEl);
        
        // Insert new container after mainHeader
        mainHeader.parentNode.insertBefore(navContainer, mainHeader.nextSibling);
        
        // Adjust spacing
        mainHeader.style.paddingBottom = '10px';
        navWrapperEl.style.marginTop = '10px';
        
        const tagline = mainHeader.querySelector('.tagline');
        if (tagline) {
            tagline.style.marginBottom = '20px';
        }
    }

    // --- HEADER SCROLL EFFECT (RESIZE ON SCROLL) ---
    if (mainHeader) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                mainHeader.classList.add('scrolled');
            } else {
                mainHeader.classList.remove('scrolled');
            }
        });
    }

    // --- EMAILJS CONFIGURATION ---
    // Register at https://www.emailjs.com/ to get these keys.
    // Create a Service (e.g., Gmail) and two Templates (one for Contact, one for Subscription).
    const EMAIL_PUBLIC_KEY = "lfs3BUQP3cUUT5ir6"; 
    const EMAIL_SERVICE_ID = "service_ner42la"; 
    // Menggunakan template subscription yang sudah aktif karena template contact sebelumnya tidak ditemukan
    const EMAIL_TEMPLATE_CONTACT = "template_uvo492o"; 
    const EMAIL_TEMPLATE_SUB = "template_uvo492o"; 

    const sendEmail = (templateId, params, btnElement) => {
        if (!window.emailjs) {
            alert("Email service is loading. Please try again in a few seconds.");
            return Promise.reject("EmailJS not loaded");
        }
        const originalText = btnElement.innerText;
        btnElement.innerText = "Sending...";
        btnElement.disabled = true;

        // Explicitly initialize EmailJS to ensure Public Key is recognized
        emailjs.init(EMAIL_PUBLIC_KEY);
        return emailjs.send(EMAIL_SERVICE_ID, templateId, params)
            .finally(() => {
                btnElement.innerText = originalText;
                btnElement.disabled = false;
            });
    };

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
                    <a href="cita-analysis.html" class="portfolio-card">
                        <span class="stock-code">CITA</span>
                        <span class="stock-name">Cita Mineral</span>
                        <span class="stock-cat">Bauxite Mining</span>
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
    const socialIcons = document.querySelector('.social-icons');
    if (socialIcons) {
        const connectWrapper = socialIcons.closest('.connect-wrapper');

        // Create wrapper for alignment
        const wrapperDiv = document.createElement('div');
        wrapperDiv.className = 'translate-wrapper';
        
        if (connectWrapper) {
            // Inject AFTER the connect-wrapper to place it at the bottom
            connectWrapper.parentNode.insertBefore(wrapperDiv, connectWrapper.nextSibling);
        } else {
            // Fallback
            socialIcons.parentNode.insertBefore(wrapperDiv, socialIcons.nextSibling);
        }

        // Create container for translate widget
        const translateDiv = document.createElement('div');
        translateDiv.id = 'google_translate_element';
        translateDiv.className = 'translate-widget';
        wrapperDiv.appendChild(translateDiv);

        // Create text below translate widget
        const subTranslateText = document.createElement('a');
        subTranslateText.href = 'about.html';
        subTranslateText.className = 'sub-translate-text';
        subTranslateText.textContent = 'we know nothing';
        wrapperDiv.appendChild(subTranslateText);

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

    // --- DYNAMIC POSTS & PAGINATION LOGIC ---
    
    // 1. Centralized Post Data
    const allPosts = [
        {
            title: "The Glitch in the Archive",
            url: "glitch-in-the-archive.html",
            category: "POETRY",
            date: "February 10, 2026",
            excerpt: "The archive grows heavier by the hour. New lines of code, fresh paragraphs, Another article was pushed to the live server. The index page scrolls endlessly down— A monument of sudden, manic focus.",
            image: "" 
        },
         {
            title: "The Portfolio War – A Deep Dive into Hajj Fund Strategies (Malaysia vs. Indonesia)",
            url: "hajj-fund-portfolio-war.html",
            category: "POLITICAL ECONOMY",
            date: "February 8, 2026",
            excerpt: "While Part 1 explored institutional structures, Part 2 dissects balance sheets. Malaysia’s TH operates as a diversified multi-asset endowment, while Indonesia’s BPKH functions closer to a sovereign debt accumulator.",
            image: "" 
        },
        {
            title: "Pilgrimage and Political Economy: A Comparative Analysis of Hajj Fund Management in Malaysia and Indonesia",
            url: "hajj-fund-management.html",
            category: "POLITICAL ECONOMY",
            date: "February 8, 2026",
            excerpt: "First-Mover Advantage: Malaysia’s Tabung Haji (TH) has a 50-year head start, allowing it to build a vertically integrated ecosystem. Indonesia’s BPKH is currently shifting from a passive 'saver' strategy to an active 'investor' strategy.",
            image: "" 
        },
        {
            title: "Beyond Survival: Why IKN (Nusantara) is Not Just an Option, It is an Evolution",
            url: "nusantara-evolution.html",
            category: "MACRO-ECONOMICS",
            date: "February 7, 2026",
            excerpt: "Viewing the Capital City of Nusantara (IKN) solely as a political project is a missed analysis. From a macroeconomic perspective, this project represents a massive national 'Capital Expenditure' (CapEx) designed to lower the 'operational costs' of a Jakarta-centric economy.",
            image: ""
        },
        {
            title: "The Archipelago’s Black Gold: A Narrative of Character Over Quantity",
            url: "archipelago-black-gold.html",
            category: "INVESTMENT",
            date: "February 1, 2026",
            excerpt: "This is the story of the \"Black Gold\" from the Nusantara. A story proving that in the vast world of coffee, Indonesia does not chase quantity; it chases character.",
            image: "images/fore.jpeg" 
        },
        {
            title: "Gold as the Harbinger: A Century of Commodity Cycles (1928–2026)",
            url: "gold-harbinger.html",
            category: "INVESTMENT",
            date: "January 31, 2026",
            excerpt: "History reveals a persistent pattern in macro-finance: Gold is rarely just a shiny rock; it is the \"canary in the coal mine.\" Since 1928, major upward revaluations in Gold have almost invariably preceded a broader secular bull market in commodities.",
            image: "images/goldprice.jpeg"
        },
        {
            title: "Investment Insight: PT Cita Mineral Investindo Tbk (CITA) – Beyond Bauxite Mining",
            url: "cita-analysis.html",
            category: "STOCK ANALYSIS",
            date: "January 30, 2026",
            excerpt: "As global aluminum prices reached a 4-year high in January 2026, CITA is positioned as a unique play in the metals sector. While often categorized solely as an upstream bauxite miner, CITA’s true profitability is now driven by its downstream \"money machines\" through associate entities (WHW and KAI), rather than just raw ore sales.",
            image: "images/citathumbnail.jpeg"
        },
        {
            title: "Understanding Today’s Sharp IHSG Decline: A Rational Guide for Investors",
            url: "ihsg-decline.html",
            category: "MARKET UPDATE",
            date: "January 28, 2026",
            excerpt: "Today’s sharp decline in the IHSG may feel unsettling, especially for new investors still adapting to market fluctuations. Seeing a portfolio turn red simultaneously often raises concern. However, understanding the actual mechanics behind this drop is the first step toward becoming a confident and disciplined investor.",
            image: "images/ihsgthumbnail.jpeg"
        },
        {
            title: "The Miracle of the \"Modest\" 20 Percent",
            url: "miracle-of-20-percent.html",
            category: "INVESTMENT",
            date: "January 27, 2026",
            excerpt: "Historically (from 1965 to 2023), Berkshire Hathaway has achieved a Compound Annual Growth Rate (CAGR) of approximately 19.8%. While this figure may seem modest compared to the \"anomalies\" of short-term trading gains, it is extraordinary for the following three reasons...",
            image: "" 
        },
        {
            title: "How China Could Win Against The US",
            url: "china-ai-race.html",
            category: "TECHNOLOGY",
            date: "January 15, 2026",
            excerpt: "The global narrative on Artificial Intelligence is often hyper-focused on who has the smartest chatbot or the fastest chip. However, this perspective mistakes the frosting for the cake. For seasoned observers, AI is best understood as a five-layer industrial system consisting of: Energy, Chips, Infrastructure, Models, and Applications.",
            image: "images/howchina.jpeg"
        },
        {
            title: "DKFT Analysis: Turnaround Story & Nickel Outlook",
            url: "dkft-analysis.html",
            category: "STOCK ANALYSIS",
            date: "January 6, 2026",
            excerpt: "I started paying attention to DKFT shares when the price was still around IDR 180 per share. The company operates as a nickel ore miner and has begun a turnaround after years of persistent losses...",
            image: ""
        },
        {
            title: "The Rise and Fall of Sritex (SRIL): A Tale of Ignored Red Flags",
            url: "sril-analysis.html",
            category: "STOCK ANALYSIS",
            date: "January 6, 2026",
            excerpt: "Sri Rejeki Isman Tbk (SRIL), widely known as Sritex, was once the largest integrated textile manufacturer in Southeast Asia. Its golden era began in 1994 when it secured prestigious contracts...",
            image: ""
        },
        {
            title: "ADRO & ADMR Analysis: Strategic Shift & Green Energy Transition",
            url: "adro-admr-analysis.html",
            category: "STOCK ANALYSIS",
            date: "January 6, 2026",
            excerpt: "I have been observing Adaro Energy (ADRO) for a long time, as it is one of Indonesia’s coal mining companies with relatively stable financial performance despite the cyclical fluctuations in coal prices...",
            image: "images/alamtriminerals.jpg"
        },
        {
            title: "Why Pakuwon Jati (PWON) Remains a Top-Tier Resilient Property Stock",
            url: "pwon-analysis.html",
            category: "STOCK ANALYSIS",
            date: "January 6, 2026",
            excerpt: "PT Pakuwon Jati Tbk (PWON) stands out as one of the most structurally defensive property developers in Indonesia. Its business model—emphasizing high recurring income, conservative financial management...",
            image: "images/pwongedung.jpg"
        },
        {
            title: "Plaza Indonesia Realty & Pakuwon Jati",
            url: "property-analysis.html",
            category: "STOCK ANALYSIS",
            date: "December 26, 2025",
            excerpt: "As of 31 December 2024, Plaza Indonesia Realty Tbk (PLIN) owns and manages three core property portfolios. Meanwhile, Pakuwon Jati Tbk (PWON) stands out as one of the most structurally defensive property developers in Indonesia. A deep dive into their balance sheets and cash flow strategies...",
            image: "images/grand-hyatt-jakarta-p202-new-exterior.16x9.webp"
        },
        {
            title: "How I Got Into The World of Investing?",
            url: "investment-journey.html",
            category: "INVESTMENT",
            date: "December 26, 2025",
            excerpt: "Me, Reza Fahlevi. I would like to begin my first post by sharing my personal introduction to the world of stock market investing. I was first exposed to investment concepts during my university years, when I studied Economics with a major in Accounting at Syiah Kuala University in Banda Aceh...",
            image: ""
        }
    ];

    // 2. Pagination Function
    function renderPagination(posts, containerId, itemsPerPage) {
        const container = document.getElementById(containerId);
        if (!container) return;

        let currentPage = 1;

        function displayList(page) {
            container.innerHTML = "";
            const start = (page - 1) * itemsPerPage;

      const end = start + itemsPerPage;
            const paginatedItems = posts.slice(start, end);

            paginatedItems.forEach(item => {
                const thumbHTML = item.image ? `<div class="post-thumb"><img src="${item.image}" alt="${item.title}"></div>` : "";
                const articleHTML = `
                    <article class="post-item">
                        ${thumbHTML}
                        <div class="post-details">
                            <div class="meta-cat">${item.category} • ${item.date}</div>
                            <h2><a href="${item.url}">${item.title}</a></h2>
                            <div class="excerpt"><p>${item.excerpt}</p></div>
                            <a href="${item.url}" class="read-more">Read More</a>
                        </div>
                    </article>
                `;
                container.insertAdjacentHTML('beforeend', articleHTML);
            });

            // Pagination Controls Wrapper
            const paginationWrapper = document.createElement('div');
            paginationWrapper.style.textAlign = 'center';
            paginationWrapper.style.marginTop = '30px';
            paginationWrapper.style.display = 'flex';
            paginationWrapper.style.justifyContent = 'center';
            paginationWrapper.style.gap = '20px';

            // Previous Page Button
            if (page > 1) {
                const prevBtn = document.createElement('button');
                prevBtn.innerHTML = '&larr; Previous Page';
                prevBtn.className = 'read-more';
                prevBtn.style.background = 'none';
                prevBtn.style.border = 'none';
                prevBtn.style.cursor = 'pointer';
                prevBtn.style.fontSize = '1rem';
                prevBtn.addEventListener('click', () => {
                    currentPage--;
                    displayList(currentPage);
                    container.scrollIntoView({ behavior: 'smooth' });
                });
                paginationWrapper.appendChild(prevBtn);
            }

            // Next Page Button
            if (end < posts.length) {
                const nextBtn = document.createElement('button');
                nextBtn.innerHTML = 'Next Page &rarr;';
                nextBtn.className = 'read-more';
                nextBtn.style.background = 'none';
                nextBtn.style.border = 'none';
                nextBtn.style.cursor = 'pointer';
                nextBtn.style.fontSize = '1rem';
                nextBtn.addEventListener('click', () => {
                    currentPage++;
                    displayList(currentPage);
                    container.scrollIntoView({ behavior: 'smooth' });
                });
                paginationWrapper.appendChild(nextBtn);
            }

            if (paginationWrapper.hasChildNodes()) {
                container.appendChild(paginationWrapper);
            }
        }

        displayList(currentPage);
    }

    // 3. Initialize Pagination
    // For Home: Exclude featured posts (Miracle & Investment Journey) to avoid duplication
    const featuredUrls = ["miracle-of-20-percent.html", "investment-journey.html"];
    renderPagination(allPosts.filter(p => !featuredUrls.includes(p.url)), 'home-posts-container', 8);
    
    // For Insights: Exclude specific portfolio/personal posts
    const insightsExcludedUrls = [
        "pwon-analysis.html",
        "dkft-analysis.html",
        "sril-analysis.html",
        "adro-admr-analysis.html",
        "cita-analysis.html",
        "investment-journey.html",
        "glitch-in-the-archive.html"
    ];
    renderPagination(allPosts.filter(p => !insightsExcludedUrls.includes(p.url)), 'insights-posts-container', 8);

    // --- RELATED POSTS LOGIC ---
    const relatedContainer = document.getElementById('related-posts-container');
    if (relatedContainer) {
        // Get current filename
        const path = window.location.pathname;
        const currentFilename = path.substring(path.lastIndexOf('/') + 1) || 'index.html';
        
        // Filter: All posts that are on Home (not featured) AND not the current page
        const postsToShow = allPosts.filter(p => 
            !featuredUrls.includes(p.url) && 
            p.url !== currentFilename
        );

        // --- LOAD MORE LOGIC ---
        let visibleCount = 0;
        const itemsPerBatch = 4; // Show 4 posts at a time

        // Create "Load More" Button Wrapper
        const btnWrapper = document.createElement('div');
        btnWrapper.id = 'related-load-more-wrapper';
        btnWrapper.style.textAlign = 'center';
        btnWrapper.style.marginTop = '40px';
        btnWrapper.style.display = 'none'; // Hidden by default

        const loadMoreBtn = document.createElement('button');
        loadMoreBtn.innerText = 'Load More Articles';
        // Styling
        loadMoreBtn.style.padding = '12px 30px';
        loadMoreBtn.style.backgroundColor = 'transparent';
        loadMoreBtn.style.color = 'var(--text-heading)';
        loadMoreBtn.style.border = '1px solid var(--accent-blue)';
        loadMoreBtn.style.borderRadius = '50px';
        loadMoreBtn.style.cursor = 'pointer';
        loadMoreBtn.style.fontFamily = 'var(--font-heading)';
        loadMoreBtn.style.fontWeight = '700';
        loadMoreBtn.style.fontSize = '0.9rem';
        loadMoreBtn.style.transition = 'all 0.3s ease';
        loadMoreBtn.style.textTransform = 'uppercase';
        loadMoreBtn.style.letterSpacing = '1px';

        // Hover Effects
        loadMoreBtn.addEventListener('mouseenter', () => {
            loadMoreBtn.style.backgroundColor = 'var(--accent-blue)';
            loadMoreBtn.style.color = '#fff';
            loadMoreBtn.style.transform = 'translateY(-2px)';
            loadMoreBtn.style.boxShadow = '0 5px 15px rgba(37, 132, 161, 0.3)';
        });
        loadMoreBtn.addEventListener('mouseleave', () => {
            loadMoreBtn.style.backgroundColor = 'transparent';
            loadMoreBtn.style.color = 'var(--text-heading)';
            loadMoreBtn.style.transform = 'translateY(0)';
            loadMoreBtn.style.boxShadow = 'none';
        });

        btnWrapper.appendChild(loadMoreBtn);
        // Insert button after the grid container
        relatedContainer.parentNode.insertBefore(btnWrapper, relatedContainer.nextSibling);

        const renderBatch = () => {
            const nextBatch = postsToShow.slice(visibleCount, visibleCount + itemsPerBatch);
            
            nextBatch.forEach(item => {
                const thumbHTML = item.image ? `<div class="post-thumb"><img src="${item.image}" alt="${item.title}"></div>` : "";
                const articleHTML = `
                    <article class="post-item">
                        ${thumbHTML}
                        <div class="post-details">
                            <div class="meta-cat">${item.category} • ${item.date}</div>
                            <h2><a href="${item.url}">${item.title}</a></h2>
                            <div class="excerpt"><p>${item.excerpt}</p></div>
                            <a href="${item.url}" class="read-more">Read More</a>
                        </div>
                    </article>
                `;
                relatedContainer.insertAdjacentHTML('beforeend', articleHTML);
            });

            visibleCount += nextBatch.length;

            // Toggle Button Visibility
            if (visibleCount >= postsToShow.length) {
                btnWrapper.style.display = 'none';
            } else {
                btnWrapper.style.display = 'block';
            }
        };

        // Attach Click Event
        loadMoreBtn.addEventListener('click', renderBatch);

        // Initial Render
        renderBatch();
    }

    // --- COOKIE CONSENT LOGIC ---
    const cookieConsentKey = 'fahlevithing_cookie_consent';
    
    if (!localStorage.getItem(cookieConsentKey)) {
        const bannerHTML = `
            <div id="cookie-banner" class="cookie-banner">
                <div class="cookie-content">
                    <div class="cookie-text">
                        <p>We use cookies to improve your experience and analyze website traffic. By continuing to visit this site, you agree to our use of cookies. <br><span style="font-size: 0.9em; color: #666;">Kami menggunakan cookie untuk meningkatkan pengalaman Anda. Dengan melanjutkan, Anda menyetujui penggunaan cookie kami.</span> <a href="privacy.html">Learn more / Selengkapnya</a>.</p>
                    </div>
                    <button id="accept-cookies" class="cookie-btn">Accept / Setuju</button>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', bannerHTML);

        // Trigger animation after a small delay
        setTimeout(() => {
            const banner = document.getElementById('cookie-banner');
            if (banner) banner.classList.add('show');
        }, 100);

        // Handle Accept Click
        const acceptBtn = document.getElementById('accept-cookies');
        if (acceptBtn) {
            acceptBtn.addEventListener('click', () => {
                localStorage.setItem(cookieConsentKey, 'true');
                
                // Update Google Analytics Consent to 'Granted'
                if (typeof gtag === 'function') {
                    gtag('consent', 'update', {
                        'ad_storage': 'granted',
                        'analytics_storage': 'granted',
                        'ad_user_data': 'granted',
                        'ad_personalization': 'granted'
                    });
                }

                const banner = document.getElementById('cookie-banner');
                banner.classList.remove('show');
                // Remove from DOM after transition
                setTimeout(() => {
                    banner.remove();
                }, 500);
            });
        }
    }

    // --- CONTACT FORM HANDLER ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const name = contactForm.querySelector('input[name="name"]').value;
            const email = contactForm.querySelector('input[name="email"]').value;

            // Ensure contact info is not empty or just whitespace
            if (!email || email.trim() === "") {
                alert("Please enter your email, contact, or social media.");
                return;
            }

            const message = contactForm.querySelector('textarea[name="message"]').value;
            
            const params = {
                // Menyesuaikan data agar terbaca di template subscription
                subscriber_email: email, // Email pengirim
                message: `Pesan Baru dari Website:\n\nNama: ${name}\nEmail: ${email}\n\nPesan:\n${message}`,
                
                // Parameter standar
                to_email: "fahlevithing@gmail.com", 
                to_name: "Admin Fahlevi Thing",
                from_name: name,
                from_email: email,
                reply_to: email
            };

            sendEmail(EMAIL_TEMPLATE_CONTACT, params, submitBtn)
                .then(() => {
                    // Google Ads Conversion Event
                    if (typeof gtag === 'function') {
                        gtag('event', 'ads_conversion_Submit_lead_form_1', {});
                    }

                    alert("Message sent successfully! I will get back to you soon.");
                    contactForm.reset();
                })
                .catch((err) => {
                    console.error(err);
                    if (err.text && err.text.includes("recipients address is empty")) {
                        alert("PENGATURAN DASHBOARD DIPERLUKAN:\nKolom 'To Email' di Template Contact (template_92xf4ac) masih kosong.\n\nSilakan buka dashboard EmailJS, edit template tersebut, dan isi 'To Email' dengan: fahlevithing@gmail.com");
                    } else {
                        alert("Failed to send message: " + (err.text || JSON.stringify(err)));
                    }
                });
        });
    }

    // --- NEWSLETTER SUBSCRIPTION LOGIC ---
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            const submitBtn = newsletterForm.querySelector('button[type="submit"]');
            
            if (emailInput && emailInput.value) {
                const params = {
                    // Data Subscriber
                    subscriber_email: emailInput.value,
                    message: "User dengan email " + emailInput.value + " telah subscribe.",
                    
                    // Parameter Standar EmailJS (Penting untuk mencegah error 'recipient empty')
                    to_email: "fahlevithing@gmail.com", 
                    to_name: "Admin Fahlevi Thing",
                    from_name: "New Subscriber",
                    from_email: emailInput.value,
                    reply_to: emailInput.value
                };

                sendEmail(EMAIL_TEMPLATE_SUB, params, submitBtn)
                    .then(() => {
                        alert('Thank you for subscribing! You will be notified when new posts are published.');
                        
                        // Check if on homepage to open overlay directly
                        const isHomePage = window.location.pathname.endsWith('/') || window.location.pathname.endsWith('index.html');
                        const overlay = document.getElementById('portfolio-overlay');

                        if (isHomePage && overlay) {
                            overlay.classList.add('active');
                        } else {
                            window.location.href = 'index.html#show-portfolio';
                        }
                        
                        newsletterForm.reset();
                    })
                    .catch((err) => {
                        console.error(err);
                        if (err.text && err.text.includes("recipients address is empty")) {
                            alert("PENGATURAN DASHBOARD DIPERLUKAN:\nKolom 'To Email' di Template EmailJS (template_uvo492o) masih kosong.\n\nSilakan buka dashboard EmailJS, edit template tersebut, dan isi 'To Email' dengan: fahlevithing@gmail.com");
                        } else {
                            alert("Subscription failed. Details: " + (err.text || JSON.stringify(err)));
                        }
                    });
            }
        });
    }

    // --- SHARE BUTTONS LOGIC ---
    const shareContainer = document.querySelector('.share-container');
    if (shareContainer) {
        const url = window.location.href;
        const title = document.title;
        const encodedUrl = encodeURIComponent(url);
        const encodedTitle = encodeURIComponent(title);
        
        // Structure with Pop-out Menu
        shareContainer.innerHTML = `
            <div class="share-wrapper">
                <div id="share-popup" class="share-popup">
                    <a href="https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}" target="_blank" rel="noopener noreferrer" class="share-icon twitter" aria-label="Share on Twitter"><i class="fab fa-x-twitter"></i></a>
                    <a href="https://www.threads.net/intent/post?text=${encodedTitle}%20${encodedUrl}" target="_blank" rel="noopener noreferrer" class="share-icon threads" aria-label="Share on Threads"><i class="fab fa-threads"></i></a>
                    <a href="https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}" target="_blank" rel="noopener noreferrer" class="share-icon whatsapp" aria-label="Share on WhatsApp"><i class="fab fa-whatsapp"></i></a>
                    <a href="https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}" target="_blank" rel="noopener noreferrer" class="share-icon telegram" aria-label="Share on Telegram"><i class="fab fa-telegram"></i></a>
                    <a href="https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}" target="_blank" rel="noopener noreferrer" class="share-icon linkedin" aria-label="Share on LinkedIn"><i class="fab fa-linkedin-in"></i></a>
                    <button id="share-instagram-btn" class="share-icon instagram" aria-label="Share on Instagram"><i class="fab fa-instagram"></i></button>
                    <button id="copy-link-btn" class="share-icon copy" aria-label="Copy Link"><i class="fas fa-link"></i></button>
                </div>
                <button id="web-share-btn" class="simple-share-btn">
                    SHARE
                </button>
            </div>
        `;

        // Inject Toast HTML jika belum ada
        if (!document.getElementById('toast-notification')) {
            const toastHTML = `
                <div id="toast-notification" class="toast-notification">
                    <i class="fas fa-check-circle"></i> Link Copied to Clipboard
                </div>
            `;
            document.body.insertAdjacentHTML('beforeend', toastHTML);
        }

        const shareBtn = document.getElementById('web-share-btn');
        const sharePopup = document.getElementById('share-popup');
        const copyBtn = document.getElementById('copy-link-btn');
        const instaBtn = document.getElementById('share-instagram-btn');
        const toast = document.getElementById('toast-notification');

        if (shareBtn && sharePopup) {
            // Toggle Popup saat tombol SHARE diklik
            shareBtn.addEventListener('click', (e) => {
                e.stopPropagation(); // Mencegah event bubbling
                sharePopup.classList.toggle('active');
            });

            // Tutup popup jika klik di luar area
            document.addEventListener('click', (e) => {
                if (!shareContainer.contains(e.target)) {
                    sharePopup.classList.remove('active');
                }
            });
        }

        if (copyBtn) {
            copyBtn.addEventListener('click', () => {
                navigator.clipboard.writeText(url).then(() => {
                    toast.innerHTML = '<i class="fas fa-check-circle"></i> Link Copied to Clipboard';
                    // Tampilkan Toast
                    toast.classList.add('show');
                    
                    // Sembunyikan setelah 3 detik
                    setTimeout(() => {
                        toast.classList.remove('show');
                    }, 3000);
                    
                    // Tutup popup setelah copy
                    sharePopup.classList.remove('active');
                }).catch(err => console.error('Failed to copy:', err));
            });
        }

        if (instaBtn) {
            instaBtn.addEventListener('click', async () => {
                // 1. Copy Link Terlebih Dahulu (Agar user bisa paste di Stories)
                try {
                    await navigator.clipboard.writeText(url);
                    toast.innerHTML = '<i class="fas fa-check-circle"></i> Link Copied! Select Stories...';
                    toast.classList.add('show');
                    setTimeout(() => toast.classList.remove('show'), 3000);
                } catch (err) {
                    console.log('Clipboard failed:', err);
                }

                // 2. Cari Image Thumbnail (Prioritas: Data Post -> Meta Tag -> Default)
                let fileToShare = null;
                
                const path = window.location.pathname;
                const currentFilename = path.substring(path.lastIndexOf('/') + 1) || 'index.html';
                const currentPost = typeof allPosts !== 'undefined' ? allPosts.find(p => p.url === currentFilename) : null;
                
                let imageUrl = currentPost && currentPost.image ? currentPost.image : null;
                
                if (!imageUrl) {
                    const ogImage = document.querySelector('meta[property="og:image"]');
                    if (ogImage) imageUrl = ogImage.content;
                }

                if (imageUrl) {
                    try {
                        const response = await fetch(imageUrl);
                        const blob = await response.blob();
                        const type = blob.type || 'image/jpeg';
                        const ext = type.split('/')[1] || 'jpg';
                        fileToShare = new File([blob], `thumbnail.${ext}`, { type: type });
                    } catch (e) {
                        console.log('Failed to fetch image:', e);
                    }
                }

                // 3. Eksekusi Web Share API
                if (navigator.share) {
                    try {
                        let shareData = {};

                        // PENTING: Jika ada file, JANGAN sertakan text/url agar dianggap sebagai Image Share
                        // Image Share = Muncul opsi Stories & Feed
                        // Text/Link Share = Biasanya hanya muncul opsi DM (Direct Message)
                        if (fileToShare && navigator.canShare && navigator.canShare({ files: [fileToShare] })) {
                            shareData = {
                                files: [fileToShare],
                                title: title // Title opsional, tapi aman
                            };
                        } else {
                            // Fallback jika tidak ada gambar: Share Link biasa
                            shareData = {
                                title: title,
                                text: title,
                                url: url
                            };
                        }

                        await navigator.share(shareData);
                        sharePopup.classList.remove('active');
                        return;
                    } catch (err) {
                        if (err.name === 'AbortError') return;
                        console.log('Share API skipped:', err);
                    }
                }

                // Fallback Desktop (Jika Web Share API tidak ada)
                // Karena link sudah dicopy di langkah 1, kita tinggal buka Instagram
                sharePopup.classList.remove('active');
                setTimeout(() => window.open('https://www.instagram.com/', '_blank'), 500);
            });
        }

        // Animation on scroll (Fade-in)
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    shareContainer.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        observer.observe(shareContainer);
    }

    // --- PORTFOLIO UPDATE WIDGET ---
    // Injects a new widget below the existing Connect/Translate widget in the sidebar
    const sidebarArea = document.querySelector('.sidebar-area');
    if (sidebarArea) {
        const portfolioWidget = document.createElement('div');
        portfolioWidget.className = 'widget portfolio-update-widget';
        portfolioWidget.innerHTML = `
            <h3>Portfolio Update</h3>
            <ul class="portfolio-years">
                <li>
                    <div class="year-toggle">2026 <i class="fas fa-chevron-down"></i></div>
                    <ul class="quarters-list" style="display: none;">
                        <li><a href="portfolio-update-q1-2026.html">Q1 2026</a></li>
                        <li><a href="#">Q2 (Coming Soon)</a></li>
                        <li><a href="#">Q3 (Coming Soon)</a></li>
                        <li><a href="#">FY (Coming Soon)</a></li>
                    </ul>
                </li>
            </ul>
        `;
        sidebarArea.appendChild(portfolioWidget);

        const yearToggle = portfolioWidget.querySelector('.year-toggle');
        const quartersList = portfolioWidget.querySelector('.quarters-list');
        const icon = yearToggle.querySelector('i');

        yearToggle.addEventListener('click', () => {
            const isHidden = quartersList.style.display === 'none';
            quartersList.style.display = isHidden ? 'block' : 'none';
            icon.className = isHidden ? 'fas fa-chevron-up' : 'fas fa-chevron-down';
        });
    }

    // --- BACK TO TOP BUTTON ---
    const backToTopBtn = document.createElement('button');
    backToTopBtn.id = 'back-to-top';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopBtn.setAttribute('aria-label', 'Back to Top');
    document.body.appendChild(backToTopBtn);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
     // --- TABLE OF CONTENTS GENERATOR ---
    const articleContent = document.querySelector('.excerpt');
    if (articleContent) {
        const headings = articleContent.querySelectorAll('h3, h4');
        
        // Only generate TOC if there are at least 3 headings
        if (headings.length >= 3) {
            const tocContainer = document.createElement('div');
            tocContainer.className = 'toc-container';
            
            const tocTitle = document.createElement('div');
            tocTitle.className = 'toc-title';
            tocTitle.innerHTML = '<i class="fas fa-list-ul"></i> Table of Contents';
            tocContainer.appendChild(tocTitle);
            
            const tocList = document.createElement('ul');
            tocList.className = 'toc-list';
            
            headings.forEach((heading, index) => {
                // Generate ID if missing
                if (!heading.id) {
                    const slug = heading.textContent
                        .toLowerCase()
                        .replace(/[^a-z0-9]+/g, '-')
                        .replace(/(^-|-$)+/g, '');
                    heading.id = slug || `heading-${index}`;
                }
                
                const listItem = document.createElement('li');
                // Add class for indentation based on tag name
                if (heading.tagName.toLowerCase() === 'h4') {
                    listItem.className = 'toc-h4';
                }
                
                const link = document.createElement('a');
                link.href = `#${heading.id}`;
                link.textContent = heading.textContent;
                
                // Smooth scroll behavior with offset for sticky header
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const target = document.getElementById(heading.id);
                    const headerOffset = 100; // Adjust for sticky header height
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({ top: offsetPosition, behavior: "smooth" });
                    history.pushState(null, null, `#${heading.id}`);
                });
                
                listItem.appendChild(link);
                tocList.appendChild(listItem);
            });
            
            tocContainer.appendChild(tocList);
            
            // Insert TOC before the first heading
            if (headings.length > 0) {
                headings[0].parentNode.insertBefore(tocContainer, headings[0]);
            }
        }
    }

    // --- READING TIME ESTIMATOR ---
    const postDetails = document.querySelector('.post-details');
    if (postDetails) {
        const readMore = postDetails.querySelector('.read-more');
        const excerpt = postDetails.querySelector('.excerpt');
        const metaCat = postDetails.querySelector('.meta-cat');

        // Only calculate for single post pages (no read-more link, has excerpt content)
        if (!readMore && excerpt && metaCat) {
            const text = excerpt.innerText;
            const wpm = 200;
            const words = text.trim().length === 0 ? 0 : text.trim().split(/\s+/).length;
            const readingTime = Math.ceil(words / wpm);
            
            if (readingTime > 0) {
                metaCat.textContent += ` • ${readingTime} min read`;
            }
        }
    }

    // --- COPY CODE BUTTON FOR ARTICLES ---
    const codeBlocks = document.querySelectorAll('pre');
    codeBlocks.forEach(block => {
        // Wrap pre in a relative container
        const wrapper = document.createElement('div');
        wrapper.className = 'code-block-wrapper';
        block.parentNode.insertBefore(wrapper, block);
        wrapper.appendChild(block);

        // Create button
        const button = document.createElement('button');
        button.className = 'copy-code-btn';
        button.innerHTML = '<i class="fas fa-copy"></i> Copy';
        button.setAttribute('aria-label', 'Copy code');

        // Copy Logic
        button.addEventListener('click', () => {
            const code = block.querySelector('code') || block;
            const text = code.innerText;

            navigator.clipboard.writeText(text).then(() => {
                button.innerHTML = '<i class="fas fa-check"></i> Copied!';
                button.classList.add('copied');
                
                setTimeout(() => {
                    button.innerHTML = '<i class="fas fa-copy"></i> Copy';
                    button.classList.remove('copied');
                }, 2000);
            }).catch(err => console.error('Failed to copy:', err));
        });

        wrapper.appendChild(button);
    });
 // --- SCROLL PROGRESS BAR (ARTICLES ONLY) ---
    // Heuristic: Check if there is a direct article child in main (typical for single post pages)
    const isArticlePage = document.querySelector('main > article.post-item');
    
    if (isArticlePage) {
        const progressBarContainer = document.createElement('div');
        progressBarContainer.className = 'scroll-progress-container';
        
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress-bar';
        
        progressBarContainer.appendChild(progressBar);
        document.body.appendChild(progressBarContainer);

        window.addEventListener('scroll', () => {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (scrollTop / docHeight) * 100;
            progressBar.style.width = scrolled + '%';
        });
    }

    // --- READING MODE TOGGLE ---
    if (isArticlePage) {
        const readingBtn = document.createElement('button');
        readingBtn.className = 'reading-mode-btn';
        readingBtn.innerHTML = '<i class="fas fa-book-open"></i>';
        readingBtn.setAttribute('aria-label', 'Toggle Reading Mode');
        readingBtn.title = "Reading Mode";
        document.body.appendChild(readingBtn);

        readingBtn.addEventListener('click', () => {
            document.body.classList.toggle('reading-mode');
            const isReadingMode = document.body.classList.contains('reading-mode');
            
            readingBtn.innerHTML = isReadingMode ? '<i class="fas fa-times"></i>' : '<i class="fas fa-book-open"></i>';
            readingBtn.style.backgroundColor = isReadingMode ? 'var(--accent-blue)' : 'var(--text-main)';
            readingBtn.style.color = isReadingMode ? '#fff' : 'var(--bg-body)';
        });
    }

    // --- SIDEBAR STICKY EFFECT ---
    const stickySidebar = document.querySelector('.sidebar-area');
    if (stickySidebar) {
        window.addEventListener('scroll', () => {
            // Check if sidebar is in sticky state (approx 120px from top)
            if (stickySidebar.getBoundingClientRect().top <= 121) {
                stickySidebar.classList.add('is-sticky');
            } else {
                stickySidebar.classList.remove('is-sticky');
            }
        });
    }
});
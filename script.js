// Load EmailJS SDK for handling emails without backend
(function() {
    var script = document.createElement('script');
    script.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js";
    document.head.appendChild(script);
})();

document.addEventListener('DOMContentLoaded', () => {
    
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
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            const newTheme = isDark ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            toggleBtn.innerHTML = isDark ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
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

    // --- DYNAMIC POSTS & PAGINATION LOGIC ---
    
    // 1. Centralized Post Data
    const allPosts = [
        {
            title: "Gold as the Harbinger: A Century of Commodity Cycles (1928–2026)",
            url: "gold-harbinger.html",
            category: "INVESTMENT",
            date: "January 31, 2026",
            excerpt: "History reveals a persistent pattern in macro-finance: Gold is rarely just a shiny rock; it is the \"canary in the coal mine.\" Since 1928, major upward revaluations in Gold have almost invariably preceded a broader secular bull market in commodities.",
            image: "images/goldprice.jpg"
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
        "investment-journey.html"
    ];
    renderPagination(allPosts.filter(p => !insightsExcludedUrls.includes(p.url)), 'insights-posts-container', 8);

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
});
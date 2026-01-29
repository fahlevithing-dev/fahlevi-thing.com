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
});
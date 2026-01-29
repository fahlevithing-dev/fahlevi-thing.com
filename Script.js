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
                window.location.href = `search?q=${encodeURIComponent(query)}`;
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
        portfolioNav.addEventListener('click', (e) => {
            e.preventDefault();
            overlay.classList.add('active');
        });

        closeBtn.addEventListener('click', () => {
            overlay.classList.remove('active');
        });

        // Close overlay when clicking a link
        overlayLinks.forEach(link => {
            link.addEventListener('click', () => {
                overlay.classList.remove('active');
            });
        });
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
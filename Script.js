document.addEventListener('DOMContentLoaded', () => {
    
    // =========================================
    // 1. MOBILE MENU TOGGLE
    // =========================================
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            // Toggle search box visibility on mobile if needed
            const searchBox = document.querySelector('.search-box');
            if (searchBox) searchBox.classList.toggle('active');
        });
    }

    // =========================================
    // 2. SEARCH FUNCTIONALITY
    // =========================================
    const searchForms = document.querySelectorAll('.search-box form');
    searchForms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = form.querySelector('input');
            const query = input.value.trim();
            if (query) {
                // Redirect to search page (adjust URL as needed)
                window.location.href = `search?q=${encodeURIComponent(query)}`;
            }
        });
    });

    // =========================================
    // 3. PORTFOLIO MODAL LOGIC (UPDATED)
    // =========================================
    
    // Elemen-elemen Modal
    const modalOverlay = document.getElementById('portfolio-modal');
    const portfolioNav = document.getElementById('portfolio-nav'); // Link di Navbar
    const closeModalBtn = document.getElementById('close-modal');
    
    // Fungsi: Buka Modal
    const openPortfolioOverlay = () => {
        if (modalOverlay) {
            modalOverlay.classList.add('active');
            document.body.style.overflow = 'hidden'; // Matikan scroll background
        }
    };

    // Fungsi: Tutup Modal
    const closePortfolioOverlay = () => {
        if (modalOverlay) {
            modalOverlay.classList.remove('active');
            document.body.style.overflow = ''; // Hidupkan scroll background
            
            // Bersihkan hash URL agar bersih
            if (window.location.hash === '#show-portfolio') {
                history.pushState("", document.title, window.location.pathname + window.location.search);
            }
        }
    };

    // Event Listener: Klik Link Navbar "MY PORTFOLIO"
    if (portfolioNav) {
        portfolioNav.addEventListener('click', (e) => {
            // Cek apakah user ada di halaman index.html (Home)
            const isHomePage = window.location.pathname === '/' || window.location.pathname.endsWith('index.html');
            
            if (isHomePage) {
                e.preventDefault();
                openPortfolioOverlay();
            } else {
                // Jika di halaman lain (misal about.html), biarkan link bekerja
                // Link harus mengarah ke: href="index.html#show-portfolio"
            }
        });
    }

    // Event Listener: Tombol Close (X)
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closePortfolioOverlay);
    }

    // Event Listener: Klik Area Gelap (Backdrop) untuk menutup
    window.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closePortfolioOverlay();
        }
    });

    // Event Listener: Logic Smooth Scroll saat Kartu Saham diklik
    // (Menggunakan onclick="scrollToSection(...)" dari HTML sebelumnya)
    window.scrollToSection = (sectionId) => {
        closePortfolioOverlay(); // Tutup modal dulu
        
        const section = document.getElementById(sectionId);
        if (section) {
            // Beri sedikit delay agar animasi tutup modal selesai, baru scroll
            setTimeout(() => {
                section.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 300);
        }
    };

    // Auto-Open: Jika URL mengandung #show-portfolio (misal redirect dari halaman lain)
    if (window.location.hash === '#show-portfolio') {
        openPortfolioOverlay();
    }

    // =========================================
    // 4. GOOGLE TRANSLATE WIDGET
    // =========================================
    const socialWidget = document.querySelector('.social-widget');
    if (socialWidget) {
        // Create container
        const translateDiv = document.createElement('div');
        translateDiv.id = 'google_translate_element';
        translateDiv.className = 'translate-widget';
        translateDiv.style.marginTop = '15px'; // Sedikit spasi
        
        // Insert after social widget
        socialWidget.parentNode.insertBefore(translateDiv, socialWidget.nextSibling);

        // Global callback
        window.googleTranslateElementInit = function() {
            new google.translate.TranslateElement({
                pageLanguage: 'en',
                includedLanguages: 'id', // Hanya Indonesia
                layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
                autoDisplay: false
            }, 'google_translate_element');
        };

        // Inject script
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
        document.body.appendChild(script);
    }
});

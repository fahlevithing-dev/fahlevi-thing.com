// === EN/ID BILINGUAL SYSTEM ===

window.LANG = (function () {
    var stored = typeof localStorage !== 'undefined' ? localStorage.getItem('lang') : null;
    return {
        current: stored || 'en',
        ui: {
            en: {
                tagline: 'a Reza POV',
                preTitle: 'you know nothing, reza?',
                nav: { home: 'HOME', portfolio: 'MY PORTFOLIO', insights: 'INSIGHTS', about: 'ABOUT' },
                searchPlaceholder: 'Search...',
                featured: 'Featured',
                recentPosts: 'Recent Posts',
                relatedPosts: 'Related Posts',
                readMore: 'Read More',
                loadMore: 'Load More Articles',
                connect: 'Connect',
                copyright: 'All Rights Reserved.',
                privacyPolicy: 'Privacy Policy',
                prevPage: '← Previous Page',
                nextPage: 'Next Page →',
                insights: 'Insights',
                about: 'About',
                searchResults: 'Search Results',
                searchResultsFor: 'Showing results for:',
                noResults: 'No articles found matching your search.',
                pleaseSearch: 'Please enter a search term.',
                backToHome: 'Back to Home',
                pageNotFound: 'Page Not Found',
                pageNotFoundMsg: 'The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.',
                getInTouch: 'Get in Touch',
                namePlaceholder: 'Your Name',
                emailPlaceholder: 'Your Email, Contact or Social Media',
                messagePlaceholder: 'Your Message',
                sendMessage: 'Send Message',
                portfolioTitle: 'Investment Portfolio',
                portfolioUpdate: 'Portfolio Update',
                tableOfContents: 'Table of Contents',
                minRead: 'min read',
                lastUpdated: 'Last Updated:',
                linkCopied: 'Link Copied to Clipboard',
                copy: 'Copy',
                copied: 'Copied!',
                stockCats: {
                    'Property Developer': 'Property Developer',
                    'Nickel Mining': 'Nickel Mining',
                    'Textile & Garment': 'Textile & Garment',
                    'Energy & Minerals': 'Energy & Minerals',
                    'Bauxite Mining': 'Bauxite Mining'
                },
                categories: {
                    ALL: 'ALL',
                    INVESTMENT: 'INVESTMENT',
                    'STOCK ANALYSIS': 'STOCK ANALYSIS',
                    'MACRO-ECONOMICS': 'MACRO-ECONOMICS',
                    'POLITICAL ECONOMY': 'POLITICAL ECONOMY',
                    'URBAN HISTORY': 'URBAN HISTORY',
                    'MARKET UPDATE': 'MARKET UPDATE',
                    TECHNOLOGY: 'TECHNOLOGY',
                    'PORTFOLIO UPDATE': 'PORTFOLIO UPDATE',
                    POETRY: 'POETRY'
                }
            },
            id: {
                tagline: 'perspektif Reza',
                preTitle: 'kamu tidak tahu apa-apa, reza?',
                nav: { home: 'BERANDA', portfolio: 'PORTOFOLIO', insights: 'WAWASAN', about: 'TENTANG' },
                searchPlaceholder: 'Cari artikel...',
                featured: 'Pilihan Editor',
                recentPosts: 'Artikel Terbaru',
                relatedPosts: 'Artikel Terkait',
                readMore: 'Baca Selengkapnya',
                loadMore: 'Muat Lebih Banyak',
                connect: 'Terhubung',
                copyright: 'Hak Cipta Dilindungi.',
                privacyPolicy: 'Kebijakan Privasi',
                prevPage: '← Halaman Sebelumnya',
                nextPage: 'Halaman Berikutnya →',
                insights: 'Wawasan',
                about: 'Tentang',
                searchResults: 'Hasil Pencarian',
                searchResultsFor: 'Menampilkan hasil untuk:',
                noResults: 'Tidak ada artikel yang cocok dengan pencarian Anda.',
                pleaseSearch: 'Silakan masukkan kata kunci pencarian.',
                backToHome: 'Kembali ke Beranda',
                pageNotFound: 'Halaman Tidak Ditemukan',
                pageNotFoundMsg: 'Halaman yang Anda cari mungkin telah dihapus, berganti nama, atau untuk sementara tidak tersedia.',
                getInTouch: 'Hubungi Saya',
                namePlaceholder: 'Nama Anda',
                emailPlaceholder: 'Email, Kontak, atau Media Sosial Anda',
                messagePlaceholder: 'Pesan Anda',
                sendMessage: 'Kirim Pesan',
                portfolioTitle: 'Portofolio Investasi',
                portfolioUpdate: 'Update Portofolio',
                tableOfContents: 'Daftar Isi',
                minRead: 'mnt baca',
                lastUpdated: 'Terakhir Diperbarui:',
                linkCopied: 'Tautan Disalin ke Papan Klip',
                copy: 'Salin',
                copied: 'Disalin!',
                stockCats: {
                    'Property Developer': 'Pengembang Properti',
                    'Nickel Mining': 'Tambang Nikel',
                    'Textile & Garment': 'Tekstil & Garmen',
                    'Energy & Minerals': 'Energi & Mineral',
                    'Bauxite Mining': 'Tambang Bauksit'
                },
                categories: {
                    ALL: 'SEMUA',
                    INVESTMENT: 'INVESTASI',
                    'STOCK ANALYSIS': 'ANALISIS SAHAM',
                    'MACRO-ECONOMICS': 'MAKROEKONOMI',
                    'POLITICAL ECONOMY': 'EKONOMI POLITIK',
                    'URBAN HISTORY': 'SEJARAH URBAN',
                    'MARKET UPDATE': 'UPDATE PASAR',
                    TECHNOLOGY: 'TEKNOLOGI',
                    'PORTFOLIO UPDATE': 'UPDATE PORTOFOLIO',
                    POETRY: 'PUISI'
                }
            }
        },
        posts: {
            'how-gojek-got-big': {
                titleId: 'Bagaimana Gojek Tumbuh Besar dengan Menjual Putaran Berikutnya, Bukan Laba Berikutnya',
                excerptId: 'Gojek merugi hampir setiap tahun, namun valuasinya tumbuh dari $1,3 miliar menjadi $31 miliar saat IPO. Inilah bagaimana sebuah startup menjual putaran pendanaan berikutnya alih-alih keuntungan berikutnya — dan apa yang sesungguhnya diajarkan kisah Amazon kepada kita.'
            },
            'pension-fund-diy': {
                titleId: 'Mengapa Karyawan Butuh Dana Pensiun Jika Bisa Membangunnya Sendiri?',
                excerptId: 'Dari sisi imbal hasil investasi, karyawan yang disiplin sejak dini bisa mendekati hasil yang diberikan dana pensiun profesional — bahkan terkadang melampauinya. Namun menyamai kepastian dan perlindungannya adalah tantangan yang sesungguhnya.'
            },
            'echoes-beneath-the-thames': {
                titleId: 'Gema di Bawah Sungai Thames: Percobaan 5 km di London 1890 yang Membentuk Kota Modern',
                excerptId: 'Pada 4 November 1890, City & South London Railway menjadi jalur kereta bawah tanah listrik pertama di dunia. Dalam satu abad, lebih dari dua ratus kota di enam benua dibangun berdasarkan logika yang sama — dan hasilnya masih kita rasakan hari ini.'
            },
            'echoes-of-the-new-order': {
                titleId: 'Gema Orde Baru: Mengapa Badan Ekspor Baru Indonesia Membangkitkan Kecemasan Lama di Pasar Modal',
                excerptId: 'Pada 20 Mei 2026, Presiden Prabowo Subianto mengungkap peraturan baru tentang tata kelola ekspor sumber daya alam. Kebijakan ini memicu kecemasan kolektif para pelaku pasar — dan mengingatkan banyak pihak pada pola kontrol ekonomi era Orde Baru.'
            },
            'indonesia-macroeconomic-g20-2026': {
                titleId: 'Ringkasan Eksekutif: Posisi Makroekonomi Indonesia di G20 (Kuartal I 2026)',
                excerptId: 'Indonesia membuka 2026 dengan hasil kuartal pertama yang solid: pertumbuhan PDB 5,61% secara tahunan, inflasi terkendali, dan arus masuk investasi asing yang tetap kuat. Bagaimana posisi Indonesia di antara negara-negara G20 lainnya?'
            },
            'fcb-part-3': {
                titleId: 'Bagian 3 dari 3: Era Leverage — Bagaimana FC Barcelona Menggadaikan Masa Depannya',
                excerptId: 'Musim panas 2021, Joan Laporta kembali ke kursi presiden Barcelona dengan mandat yang hampir paradoks: menyelamatkan institusi demokratis milik anggota menggunakan instrumen keuangan ala Wall Street — leverage, sekuritisasi, dan taruhan jangka panjang.'
            },
            'fcb-part-2': {
                titleId: 'Bagian 2 dari 3: Dari Jersey Kosong ke Qatar Airways — Pivot Komersial Barcelona',
                excerptId: 'Musim semi 2009, Barcelona memainkan sepak bola yang sulit dijelaskan hanya dalam bahasa olahraga. Di balik tiki-taka yang memukau, benih transformasi komersial besar-besaran mulai ditanam secara diam-diam.'
            },
            'fcb-part-1': {
                titleId: 'Bagian 1 dari 3: "Lebih dari Sekadar Klub" — Bagaimana FC Barcelona Dibangun sebagai Institusi Demokratis',
                excerptId: 'Ada frasa dalam bahasa Katalonia — Més que un club — yang dibawa FC Barcelona selama lebih dari setengah abad. Artinya: "Lebih dari sekadar klub." Namun apa sesungguhnya makna di balik kata-kata itu dalam sejarah panjang Katalonia?'
            },
            'wifi-chronicles': {
                titleId: 'Kronik WIFI: Perjalanan Keyakinan, Kehati-hatian, dan Timing Pasar',
                excerptId: 'Perjalanan saya dengan saham WIFI (PT Solusi Sinergi Digital Tbk.) berawal dari seleksi kuantitatif sederhana di Stockbit. Saya mencari permata yang undervalued, dan WIFI menarik perhatian dengan PBV dan PE-nya yang rendah — lalu segalanya berubah.'
            },
            'mbg-part-5': {
                titleId: 'MBG Bagian 5: Visi Besar dan Dampak Jangka Panjang Program Makan Bergizi Gratis',
                excerptId: 'Jika Indonesia berhasil melewati hambatan implementasi dan mencapai kondisi "nol kesalahan", program MBG berpotensi menjadi mesin powerful untuk restrukturisasi modal manusia dan ketahanan pangan nasional.'
            },
            'mbg-part-4': {
                titleId: 'MBG Bagian 4: Keamanan Pangan, Standar Kualitas, dan Mandat "Nol Kesalahan"',
                excerptId: 'Saat Indonesia bergerak menuju target melayani lebih dari 82,9 juta penerima manfaat pada 2029, Badan Gizi Nasional harus menghadapi realita kegagalan sistemik yang nyata di lapangan — mulai dari rantai pasok hingga pengawasan mutu.'
            },
            'mbg-part-3': {
                titleId: 'MBG Bagian 3: Menavigasi Ranjau Implementasi Program Makan Bergizi Gratis',
                excerptId: 'Meski visi program makan bergizi gratis secara teori sangat kuat, transisi dari dokumen kebijakan ke piring makan anak dipenuhi hambatan sistemik yang berlapis — logistik, sumber daya manusia, hingga koordinasi lintas kementerian.'
            },
            'mbg-part-2': {
                titleId: 'MBG Bagian 2: Kesenjangan Gizi dan Konsumsi Per Kapita Indonesia',
                excerptId: 'Untuk memahami mengapa program makan bergizi di sekolah disebut intervensi "jenius", kita perlu memeriksa data empiris tentang apa yang sesungguhnya tersaji di piring warga Indonesia setiap harinya — dan angkanya cukup mengejutkan.'
            },
            'mbg-genius-initiative': {
                titleId: 'Program Makan Bergizi Gratis (MBG): Inisiatif "Jenius" yang Menghadapi Tantangan Implementasi',
                excerptId: 'Kebijakan gizi sekolah telah berkembang dari intervensi kesehatan masyarakat sederhana menjadi pilar strategis pembangunan modal manusia dan stabilitas geopolitik. Indonesia kini memilih jalurnya sendiri — ambisius, mahal, dan penuh risiko eksekusi.'
            },
            'glitch-in-the-archive': {
                titleId: 'Gangguan dalam Arsip',
                excerptId: 'Arsip semakin berat dari jam ke jam. Baris kode baru, paragraf segar, satu artikel lagi dikirim ke server. Halaman indeks menggulir tanpa henti ke bawah — sebuah monumen dari fokus yang tiba-tiba menjadi intens.'
            },
            'hajj-fund-portfolio-war': {
                titleId: 'Perang Portofolio Dana Haji — Bedah Mendalam Strategi Investasi Malaysia vs. Indonesia',
                excerptId: 'TH Malaysia beroperasi sebagai endowmen multi-aset, sementara BPKH Indonesia berfungsi lebih mendekati akumulator surat utang negara. Bedah neraca keuangan keduanya mengungkap kesenjangan strategi yang sangat signifikan.'
            },
            'hajj-fund-management': {
                titleId: 'Ibadah Haji dan Ekonomi Politik: Analisis Komparatif Pengelolaan Dana Haji Malaysia dan Indonesia',
                excerptId: 'Tabung Haji Malaysia unggul lebih dari 50 tahun, membangun ekosistem investasi yang terintegrasi secara vertikal. BPKH Indonesia kini beralih dari strategi "penabung" pasif ke strategi "investor" aktif — sebuah transformasi yang tidak mudah.'
            },
            'nusantara-evolution': {
                titleId: 'Melampaui Sekadar Bertahan: Mengapa IKN Nusantara Bukan Sekadar Pilihan, Melainkan Sebuah Evolusi',
                excerptId: 'Memandang IKN semata sebagai proyek politik adalah analisis yang terlalu dangkal. Secara makroekonomi, ini adalah "belanja modal" nasional yang dirancang untuk menurunkan biaya operasional ekonomi Indonesia yang selama ini terlalu terpusat di Jakarta.'
            },
            'archipelago-black-gold': {
                titleId: '"Emas Hitam" Nusantara: Narasi Karakter di Atas Kuantitas',
                excerptId: 'Kisah "Emas Hitam" dari Nusantara. Sebuah narasi yang membuktikan bahwa dalam dunia kopi yang semakin kompetitif, Indonesia tidak mengejar kuantitas — Indonesia mengejar karakter, kompleksitas rasa, dan keunikan terroir.'
            },
            'gold-harbinger': {
                titleId: 'Emas sebagai Pertanda: Satu Abad Siklus Komoditas (1928–2026)',
                excerptId: 'Sejarah mengungkap pola yang persisten dalam keuangan makro: emas jarang sekadar batu berkilau. Sejak 1928, revaluasi emas ke atas hampir selalu mendahului bull market sekuler yang lebih luas di seluruh kelas aset komoditas.'
            },
            'cita-analysis': {
                titleId: 'Analisis Investasi: PT Cita Mineral Investindo Tbk (CITA) — Lebih dari Sekadar Penambang Bauksit',
                excerptId: 'Saat harga aluminium global mencapai level tertinggi empat tahun pada Januari 2026, CITA tampil sebagai instrumen unik di sektor logam. Profitabilitas sejatinya kini digerakkan oleh "mesin uang" hilir melalui entitas asosiasi WHW dan KAI.'
            },
            'ihsg-decline': {
                titleId: 'Memahami Penurunan Tajam IHSG Hari Ini: Panduan Rasional bagi Investor',
                excerptId: 'Penurunan tajam IHSG mungkin terasa menggelisahkan, terutama bagi investor baru. Melihat portofolio merah serentak sering menimbulkan kepanikan. Namun memahami mekanika di balik penurunan ini adalah langkah pertama menjadi investor yang lebih tenang dan percaya diri.'
            },
            'miracle-of-20-percent': {
                titleId: 'Keajaiban 20 Persen yang "Sederhana"',
                excerptId: 'Dari 1965 hingga 2023, Berkshire Hathaway mencapai CAGR sekitar 19,8%. Angka ini tampak sederhana dibanding "anomali" trading jangka pendek, namun luar biasa karena tiga alasan mendasar yang sering diabaikan oleh kebanyakan investor.'
            },
            'china-ai-race': {
                titleId: 'Bagaimana China Bisa Mengalahkan Amerika Serikat',
                excerptId: 'Narasi global tentang Kecerdasan Buatan sering terfokus pada chatbot paling pintar atau chip tercepat. Namun perspektif itu melihat lapisan permukaan. AI paling tepat dipahami sebagai sistem industri berlapis: Energi, Chip, Infrastruktur, Model, dan Aplikasi.'
            },
            'dkft-analysis': {
                titleId: 'Analisis DKFT: Kisah Turnaround dan Prospek Nikel Indonesia',
                excerptId: 'Saya mulai memperhatikan saham DKFT saat harganya masih sekitar Rp180 per lembar. Perusahaan beroperasi sebagai penambang bijih nikel dan tengah menjalani turnaround setelah bertahun-tahun mengalami kerugian yang konsisten.'
            },
            'sril-analysis': {
                titleId: 'Naik dan Turunnya Sritex (SRIL): Kisah Panjang Bendera Merah yang Diabaikan',
                excerptId: 'Sri Rejeki Isman Tbk (SRIL), dikenal luas sebagai Sritex, pernah menjadi produsen tekstil terintegrasi terbesar di Asia Tenggara. Era keemasannya dimulai saat mengamankan kontrak bergengsi pada 1994 — dan berakhir dengan cara yang seharusnya bisa diprediksi.'
            },
            'adro-admr-analysis': {
                titleId: 'Analisis ADRO & ADMR: Pergeseran Strategis dan Transisi Menuju Energi Hijau',
                excerptId: 'Saya mengamati Adaro Energy (ADRO) sejak lama sebagai salah satu perusahaan tambang batu bara Indonesia dengan kinerja keuangan yang relatif stabil di tengah fluktuasi harga batu bara yang sangat siklikal.'
            },
            'pwon-analysis': {
                titleId: 'Mengapa Pakuwon Jati (PWON) Tetap Menjadi Saham Properti Defensif Kelas Atas',
                excerptId: 'PT Pakuwon Jati Tbk (PWON) menonjol sebagai salah satu pengembang properti paling defensif secara struktural di Indonesia, dengan model bisnis yang menekankan pendapatan berulang tinggi dan manajemen keuangan yang sangat konservatif.'
            },
            'property-analysis': {
                titleId: 'Plaza Indonesia Realty & Pakuwon Jati: Bedah Neraca dan Strategi Arus Kas',
                excerptId: 'Per 31 Desember 2024, Plaza Indonesia Realty Tbk (PLIN) mengelola tiga portofolio properti inti di Jakarta. Sementara Pakuwon Jati Tbk (PWON) tetap berdiri sebagai benchmark pengembang properti defensif di Indonesia.'
            },
            'investment-journey': {
                titleId: 'Bagaimana Saya Memasuki Dunia Investasi?',
                excerptId: 'Saya, Reza Fahlevi. Tulisan pertama ini adalah kisah pribadi bagaimana saya memasuki dunia investasi saham — dimulai saat kuliah Ekonomi jurusan Akuntansi di Universitas Syiah Kuala, Banda Aceh, hingga porto pertama yang saya bangun sendiri.'
            }
        }
    };
}());

document.addEventListener('DOMContentLoaded', function () {

    function applyLanguage(lang) {
        if (lang !== 'en' && lang !== 'id') return;
        window.LANG.current = lang;
        localStorage.setItem('lang', lang);

        var T = window.LANG.ui[lang];

        // HTML lang attribute
        document.documentElement.lang = lang;

        // Tagline
        var tagline = document.querySelector('.tagline');
        if (tagline) tagline.textContent = T.tagline;

        // Pre-title (if injected by script.js)
        var preTitle = document.querySelector('.pre-title');
        if (preTitle) preTitle.textContent = T.preTitle;

        // Nav links (main nav + scrolled panel nav)
        var navHrefMap = {
            '/': 'home',
            '/#show-portfolio': 'portfolio',
            '/insights': 'insights',
            '/about': 'about'
        };
        document.querySelectorAll('.nav-links li a, .panel-nav-links li a').forEach(function (a) {
            var key = navHrefMap[a.getAttribute('href')];
            if (key && T.nav[key]) a.textContent = T.nav[key];
        });

        // Search placeholder (nav search + scrolled panel search)
        document.querySelectorAll('.search-box input[type="text"], .panel-search input[type="text"]').forEach(function (inp) {
            inp.placeholder = T.searchPlaceholder;
        });

        // Connect title
        var connectTitle = document.querySelector('.connect-title');
        if (connectTitle) connectTitle.textContent = T.connect;

        // Footer copyright
        var copyright = document.querySelector('.copyright');
        if (copyright) {
            var b = copyright.querySelector('b');
            var name = b ? b.textContent : 'Reza Fahlevi';
            copyright.innerHTML = '&copy; 2025 <b>' + name + '</b>. ' + T.copyright;
        }

        // Footer privacy link
        var privacyLink = document.querySelector('.footer-legal a');
        if (privacyLink) privacyLink.textContent = T.privacyPolicy;

        // Section headings (h3 + featured-label)
        var headingMap = {
            'Featured': 'featured', 'Pilihan Editor': 'featured',
            'Recent Posts': 'recentPosts', 'Artikel Terbaru': 'recentPosts',
            'Related Posts': 'relatedPosts', 'Artikel Terkait': 'relatedPosts'
        };
        document.querySelectorAll('.featured-label, h2.featured-label, h3.featured-label, h3').forEach(function (el) {
            var txt = el.textContent.trim();
            var key = headingMap[txt];
            if (key) el.textContent = T[key];
        });

        // Page-level h1/h2 headings (Insights, About, Search Results, 404)
        var pageHeadingMap = {
            'Insights': 'insights', 'Wawasan': 'insights',
            'About': 'about', 'Tentang': 'about',
            'Search Results': 'searchResults', 'Hasil Pencarian': 'searchResults',
            'Page Not Found': 'pageNotFound', 'Halaman Tidak Ditemukan': 'pageNotFound'
        };
        document.querySelectorAll('h1, h2').forEach(function (el) {
            var txt = el.textContent.trim();
            var key = pageHeadingMap[txt];
            if (key && T[key]) el.textContent = T[key];
        });

        // Category filter buttons (insights page)
        document.querySelectorAll('.cat-btn[data-cat]').forEach(function (btn) {
            var cat = (btn.getAttribute('data-cat') || '').toUpperCase();
            var tr = T.categories[cat];
            if (tr) btn.textContent = tr;
        });

        // Load More button (related posts)
        var loadMoreBtn = document.querySelector('#related-load-more-wrapper button');
        if (loadMoreBtn) loadMoreBtn.textContent = T.loadMore;

        // Translate static post items
        translateStaticItems(lang, T);

        // Re-render dynamic containers (pagination, related posts)
        var map = window._rerenderMap || {};
        Object.keys(map).forEach(function (k) { map[k](); });

        // 404 page content
        var notFoundMsg = document.getElementById('not-found-msg');
        if (notFoundMsg) notFoundMsg.textContent = T.pageNotFoundMsg;
        var notFoundLink = document.getElementById('not-found-link');
        if (notFoundLink) notFoundLink.textContent = T.backToHome;

        // Search page
        var searchDisplay = document.getElementById('search-query-display');
        if (searchDisplay) {
            var _q = new URLSearchParams(window.location.search).get('q');
            searchDisplay.textContent = _q ? (T.searchResultsFor + ' "' + _q + '"') : T.pleaseSearch;
        }
        var noResultsP = document.querySelector('#no-results p');
        if (noResultsP) noResultsP.textContent = T.noResults;
        var noResultsA = document.querySelector('#no-results a[href="/"]');
        if (noResultsA) noResultsA.textContent = T.backToHome;

        // Contact form (about page)
        var contactH3 = document.querySelector('.contact-section h3');
        if (contactH3) contactH3.textContent = T.getInTouch;
        var nameInput = document.querySelector('input#name');
        if (nameInput) nameInput.placeholder = T.namePlaceholder;
        var emailInput = document.querySelector('input#email');
        if (emailInput) emailInput.placeholder = T.emailPlaceholder;
        var msgTextarea = document.querySelector('textarea#message');
        if (msgTextarea) msgTextarea.placeholder = T.messagePlaceholder;
        var submitBtn = document.querySelector('.submit-btn');
        if (submitBtn && !submitBtn.disabled) submitBtn.textContent = T.sendMessage;

        // Portfolio overlay
        var overlayTitle = document.querySelector('.overlay-title');
        if (overlayTitle) overlayTitle.textContent = T.portfolioTitle;
        document.querySelectorAll('.stock-cat').forEach(function (el) {
            var enCat = el.getAttribute('data-cat-en') || el.textContent.trim();
            if (!el.getAttribute('data-cat-en')) el.setAttribute('data-cat-en', enCat);
            if (T.stockCats && T.stockCats[enCat]) el.textContent = T.stockCats[enCat];
        });

        // Portfolio sidebar widget
        var portWidgetH3 = document.querySelector('.portfolio-update-widget h3');
        if (portWidgetH3) portWidgetH3.textContent = T.portfolioUpdate;

        // Table of Contents
        var tocTitleEl = document.querySelector('.toc-title');
        if (tocTitleEl) tocTitleEl.innerHTML = '<i class="fas fa-list-ul"></i> ' + T.tableOfContents;

        // Reading time label (appended by script.js)
        document.querySelectorAll('.min-read-label').forEach(function (el) { el.textContent = T.minRead; });

        // Last Updated label (appended by script.js)
        document.querySelectorAll('.last-updated-label').forEach(function (el) { el.textContent = T.lastUpdated; });

        // Toast notification (not visible when translating)
        var toastEl = document.getElementById('toast-notification');
        if (toastEl && !toastEl.classList.contains('show')) {
            toastEl.innerHTML = '<i class="fas fa-check-circle"></i> ' + T.linkCopied;
        }

        // Copy code buttons (not in copied state)
        document.querySelectorAll('.copy-code-btn:not(.copied)').forEach(function (btn) {
            btn.innerHTML = '<i class="fas fa-copy"></i> ' + T.copy;
        });

        // Update sidebar widget label
        var sidebarLangLabel = document.querySelector('.lang-switch-label');
        if (sidebarLangLabel) {
            sidebarLangLabel.textContent = lang === 'id' ? 'BACA DALAM BAHASA LAIN' : 'READ IN ANOTHER LANGUAGE';
        }

        // Update all lang toggle buttons (sidebar + nav fallback)
        document.querySelectorAll('.lang-btn, .sidebar-lang-btn').forEach(function (btn) {
            btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
        });
    }

    function translateStaticItems(lang, T) {
        var postsMap = {};
        (window.allPosts || []).forEach(function (p) { postsMap[p.url] = p; });

        document.querySelectorAll('.post-item').forEach(function (article) {
            // Skip items inside JS-managed containers (they re-render via _rerenderMap)
            if (article.closest('#home-posts-container') ||
                article.closest('#insights-posts-container') ||
                article.closest('#related-posts-container')) return;

            // Translate meta-cat (works for both listing cards and single article pages)
            var metaCat = article.querySelector('.meta-cat');
            if (metaCat) {
                if (!metaCat.getAttribute('data-cat-en')) {
                    var tn0 = metaCat.childNodes[0];
                    if (tn0 && tn0.nodeType === Node.TEXT_NODE) {
                        var raw = tn0.textContent;
                        var sep0 = raw.indexOf(' • ');
                        metaCat.setAttribute('data-cat-en', (sep0 > -1 ? raw.substring(0, sep0) : raw).trim().toUpperCase());
                    }
                }
                var catEn = metaCat.getAttribute('data-cat-en') || '';
                var tn = metaCat.childNodes[0];
                if (tn && tn.nodeType === Node.TEXT_NODE) {
                    var sep = tn.textContent.indexOf(' • ');
                    var suffix = sep > -1 ? tn.textContent.substring(sep) : '';
                    tn.textContent = (T.categories[catEn] || catEn) + suffix;
                }
            }

            // Translate listing card title / excerpt (h2 a)
            var h2link = article.querySelector('h2 a[href]');
            if (h2link) {
                var url = h2link.getAttribute('href').replace(/^\//, '');
                var post = postsMap[url];
                if (post) {
                    var postTr = window.LANG.posts && window.LANG.posts[url];
                    h2link.textContent = lang === 'id' && postTr && postTr.titleId ? postTr.titleId : post.title;

                    var excerptP = article.querySelector('.excerpt p');
                    if (excerptP) {
                        excerptP.textContent = lang === 'id' && postTr && postTr.excerptId ? postTr.excerptId : post.excerpt;
                    }

                    var rmLink = article.querySelector('a.read-more');
                    if (rmLink) rmLink.textContent = T.readMore;
                }
            }
        });
    }

    function injectLangToggle() {
        var connectWrapper = document.querySelector('.sidebar-area .connect-wrapper');

        if (connectWrapper) {
            // Primary: inject in sidebar after .connect-wrapper (same position as old DeepL widget)
            var wrapper = document.createElement('div');
            wrapper.className = 'translate-wrapper lang-switch-widget';

            var label = document.createElement('p');
            label.className = 'translate-label lang-switch-label';
            label.textContent = window.LANG.current === 'id' ? 'BACA DALAM BAHASA LAIN' : 'READ IN ANOTHER LANGUAGE';
            wrapper.appendChild(label);

            var btnRow = document.createElement('div');
            btnRow.className = 'translate-btn-row';
            wrapper.appendChild(btnRow);

            ['en', 'id'].forEach(function (lang) {
                var btn = document.createElement('button');
                btn.className = 'sidebar-lang-btn' + (lang === window.LANG.current ? ' active' : '');
                btn.setAttribute('data-lang', lang);
                btn.textContent = lang === 'en' ? 'English' : 'Indonesia';
                btn.setAttribute('aria-label', lang === 'en' ? 'Switch to English' : 'Ganti ke Bahasa Indonesia');
                btn.addEventListener('click', function () { applyLanguage(lang); });
                btnRow.appendChild(btn);
            });

            connectWrapper.parentNode.insertBefore(wrapper, connectWrapper.nextSibling);
            return;
        }

        // Fallback: pages without sidebar (privacy.html) — inject in header nav
        var navWrapper = document.querySelector('.nav-wrapper');
        if (!navWrapper) return;

        var langWrapper = document.createElement('div');
        langWrapper.className = 'lang-toggle';

        ['en', 'id'].forEach(function (lang) {
            var btn = document.createElement('button');
            btn.className = 'lang-btn' + (lang === window.LANG.current ? ' active' : '');
            btn.setAttribute('data-lang', lang);
            btn.textContent = lang.toUpperCase();
            btn.setAttribute('aria-label', lang === 'en' ? 'Switch to English' : 'Ganti ke Bahasa Indonesia');
            btn.addEventListener('click', function () { applyLanguage(lang); });
            langWrapper.appendChild(btn);
        });

        var themeToggle = navWrapper.querySelector('.theme-toggle');
        if (themeToggle) {
            navWrapper.insertBefore(langWrapper, themeToggle);
        } else {
            var hamburger = navWrapper.querySelector('.hamburger');
            if (hamburger) {
                navWrapper.insertBefore(langWrapper, hamburger);
            } else {
                navWrapper.appendChild(langWrapper);
            }
        }
    }

    window.applyLanguage = applyLanguage;

    injectLangToggle();

    if (window.LANG.current === 'id') {
        applyLanguage('id');
    }
});

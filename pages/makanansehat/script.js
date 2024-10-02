$(document).ready(function () {
    const apiKey = 'd3fbbfb21d09467d88ec99f38715d4ab';
    const url = `https://newsapi.org/v2/top-headlines?country=us&category=health&apiKey=${apiKey}`;
    let allArticles = [];

    // Fungsi untuk render berita
    function renderNews(articles) {
        let newsContent = '';
        
        if (articles.length > 0) {
            articles.forEach(function (article) {
                newsContent += `
                <div class="news-item">
                    <a href="${article.url}" target="_blank">
                        <img src="${article.urlToImage}" alt="News Image" class="news-image">
                        <div class="news-info">
                            <h2 class="news-title">${article.title}</h2>
                            <p class="news-description">${article.description || 'No description available'}</p>
                        </div>
                    </a>
                </div>`;
            });
        } else {
            newsContent = '<p>No news available.</p>';
        }

        // Masukkan hasil ke container
        $('#news-container').html(newsContent);
    }

    // Mendapatkan data dari API
    $.getJSON(url, function (data) {
        allArticles = data.articles;
        renderNews(allArticles); // Render berita saat pertama kali dimuat
    }).fail(function () {
        $('#news-container').html('<p>Gagal mengambil berita. Silakan coba lagi nanti.</p>');
    });

    // Fungsi pencarian artikel
    function searchArticles() {
        const searchTerm = $('#search-input').val().toLowerCase();
        const filteredArticles = allArticles.filter(article =>
            article.title.toLowerCase().includes(searchTerm)
        );
        renderNews(filteredArticles);

        // Scroll ke bagian berita terkait setelah pencarian
        $('html, body').animate({
            scrollTop: $("#news-container").offset().top
        }, 800);
    }

    // Event listener untuk search icon
    $('#search-icon').click(function () {
        $('.search-container').toggleClass('active'); // Tampilkan atau sembunyikan input dan tombol
        $('#search-input').focus(); // Fokus ke input
    });

    // Event listener untuk tombol search
    $('#search-button').click(function () {
        searchArticles();
    });

    // Event listener untuk enter di input search
    $('#search-input').keypress(function (e) {
        if (e.which === 13) { // Tekan Enter
            searchArticles();
        }
    });
});


$(document).ready(function() {
  
    let adDisplayCount = sessionStorage.getItem('adDisplayCount') || 0;

   
    function showAd() {
        if (adDisplayCount < 4) {
            setTimeout(function() {
                $('#ads-container').css('bottom', '0'); 
                adDisplayCount++;
                sessionStorage.setItem('adDisplayCount', adDisplayCount); 
            }, 3000);
        }
    }

   
    showAd();

    
    $('#close-ads').on('click', function() {
        $('#ads-container').css('bottom', '-100%');
    });

    if (!sessionStorage.getItem('pageVisited')) {
        sessionStorage.setItem('pageVisited', 'true');
        sessionStorage.setItem('adDisplayCount', 0); 
    }
});

const hamburger = document.getElementById('hamburger-menu');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});
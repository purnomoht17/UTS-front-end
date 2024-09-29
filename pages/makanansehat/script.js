$(document).ready(function () {
    const apiKey = 'd3fbbfb21d09467d88ec99f38715d4ab';
    const url = `https://newsapi.org/v2/top-headlines?country=us&category=health&apiKey=${apiKey}`;

    // Mendapatkan data dari API NewsAPI
    $.getJSON(url, function (data) {
        let articles = data.articles;
        let newsContent = '';

        if (articles.length > 0) {
            // Looping untuk setiap artikel yang didapatkan
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

        // Memasukkan konten berita ke dalam container
        $('#news-container').html(newsContent);
    }).fail(function () {
        $('#news-container').html('<p>Gagal mengambil berita. Silakan coba lagi nanti.</p>');
    });
});

$(document).ready(function() {
    // Ambil jumlah tampilan iklan dari sessionStorage
    let adDisplayCount = sessionStorage.getItem('adDisplayCount') || 0;

    // Fungsi untuk menampilkan iklan jika belum lebih dari 2 kali
    function showAd() {
        if (adDisplayCount < 6) {
            setTimeout(function() {
                $('#ads-container').css('bottom', '0'); // Naikkan iklan
                adDisplayCount++;
                sessionStorage.setItem('adDisplayCount', adDisplayCount); // Simpan jumlah tampilan di sessionStorage
            }, 3000);
        }
    }

    // Panggil fungsi untuk menampilkan iklan
    showAd();

    // Fungsi untuk menutup iklan
    $('#close-ads').on('click', function() {
        $('#ads-container').css('bottom', '-100%'); // Turunkan iklan
    });

    // Reset adDisplayCount hanya jika halaman baru dibuka (sesi baru dimulai)
    if (!sessionStorage.getItem('pageVisited')) {
        sessionStorage.setItem('pageVisited', 'true');
        sessionStorage.setItem('adDisplayCount', 0); // Reset tampilan iklan di halaman baru
    }
});

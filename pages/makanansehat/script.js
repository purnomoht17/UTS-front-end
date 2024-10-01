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
});

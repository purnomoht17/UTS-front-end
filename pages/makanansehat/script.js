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

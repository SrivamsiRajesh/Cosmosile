const API_KEY = '4b48cd7e763f3bdaebd072f57e455fbb'; // Replace with your actual API key
const TOPIC = 'space OR aerospace OR NASA';
const API_URL = `https://gnews.io/api/v4/search?q=${TOPIC}&token=${API_KEY}&lang=en&max=10`;

async function fetchNews() {
  try {
    const response = await axios.get(API_URL);
    const articles = response.data.articles;
    
    // Update featured article
    const featuredArticle = articles[0];
    document.querySelector('.featured-article img').src = featuredArticle.image || 'https://via.placeholder.com/800x400';
    document.querySelector('.featured-content h2').textContent = featuredArticle.title;
    document.querySelector('.featured-content .article-meta span:first-child').textContent = `by ${featuredArticle.source.name}`;
    document.querySelector('.featured-content .article-meta span:nth-child(2)').textContent = new Date(featuredArticle.publishedAt).toLocaleDateString();
    document.querySelector('.featured-content p').textContent = featuredArticle.description;

    // Update editor's picks
    const editorPicks = articles.slice(1, 4);
    const editorArticles = document.querySelectorAll('.editor-article');
    editorPicks.forEach((article, index) => {
      const editorArticle = editorArticles[index];
      editorArticle.querySelector('img').src = article.image || 'https://via.placeholder.com/400x200';
      editorArticle.querySelector('h3').textContent = article.title;
    });
  } catch (error) {
    console.error('Error fetching news:', error);
  }
}

// Call the function when the page loads
window.onload = fetchNews;
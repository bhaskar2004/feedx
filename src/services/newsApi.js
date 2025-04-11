import axios from 'axios';

const API_KEY = process.env.REACT_APP_NEWS_API_KEY;
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

if (!API_KEY) {
  console.error('NewsAPI key is not set! Please add REACT_APP_NEWS_API_KEY to your .env file');
}

const newsApi = axios.create({
  baseURL: API_URL,
  headers: {
    'X-Api-Key': API_KEY,
  },
});

export const getTopHeadlines = async (category = 'technology', country = 'us') => {
  try {
    const response = await fetch(`${API_URL}/api/news?category=${category}&country=${country}`);
    if (!response.ok) {
      throw new Error('Failed to fetch articles');
    }
    const data = await response.json();
    return data.articles;
  } catch (error) {
    console.error('Error fetching articles:', error);
    throw error;
  }
};

export const searchNews = async (query, page = 1) => {
  try {
    console.log('Searching news with query:', query);
    const response = await newsApi.get('/everything', {
      params: {
        q: query,
        language: 'en',
        sortBy: 'relevancy',
        pageSize: 20,
        page,
        searchIn: 'title,description',
        domains: 'techcrunch.com,engadget.com,theverge.com,wired.com,arstechnica.com,cnbc.com,reuters.com,bloomberg.com',
      },
    });
    console.log('Search response:', response.data);
    return response.data.articles;
  } catch (error) {
    console.error('Error searching news:', error.response?.data || error.message);
    throw new Error('Failed to search news: ' + (error.response?.data?.message || error.message));
  }
};

export const getNewsByCategory = async (category, page = 1) => {
  try {
    console.log('Fetching category news with API key:', API_KEY ? 'Set' : 'Not set');
    const response = await newsApi.get('/top-headlines', {
      params: {
        category,
        country: 'us',
        language: 'en',
        pageSize: 10,
        page,
      },
    });
    console.log('Category news response:', response.data);
    return response.data.articles;
  } catch (error) {
    console.error('Error fetching category news:', error.response?.data || error.message);
    throw new Error('Failed to fetch category news: ' + (error.response?.data?.message || error.message));
  }
}; 
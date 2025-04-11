import axios from 'axios';

const API_KEY = process.env.REACT_APP_NEWS_API_KEY;
const BASE_URL = 'https://newsapi.org/v2';

if (!API_KEY) {
  console.error('NewsAPI key is not set! Please add REACT_APP_NEWS_API_KEY to your .env file');
}

const newsApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    'X-Api-Key': API_KEY,
  },
});

export const getTopHeadlines = async (category = 'technology', country = 'us') => {
  try {
    console.log('Fetching headlines with API key:', API_KEY ? 'Set' : 'Not set');
    const response = await newsApi.get('/top-headlines', {
      params: {
        category,
        country,
        pageSize: 10,
      },
    });
    console.log('Headlines response:', response.data);
    return response.data.articles;
  } catch (error) {
    console.error('Error fetching headlines:', error.response?.data || error.message);
    throw new Error('Failed to fetch headlines: ' + (error.response?.data?.message || error.message));
  }
};

export const searchNews = async (query, page = 1) => {
  try {
    const response = await newsApi.get('/everything', {
      params: {
        q: query,
        language: 'en',
        sortBy: 'publishedAt',
        pageSize: 10,
        page,
      },
    });
    return response.data.articles;
  } catch (error) {
    console.error('Error searching news:', error.response?.data || error.message);
    throw new Error('Failed to search news: ' + (error.response?.data?.message || error.message));
  }
};

export const getNewsByCategory = async (category, page = 1) => {
  try {
    const response = await newsApi.get('/top-headlines', {
      params: {
        category,
        language: 'en',
        pageSize: 10,
        page,
      },
    });
    return response.data.articles;
  } catch (error) {
    console.error('Error fetching category news:', error.response?.data || error.message);
    throw new Error('Failed to fetch category news: ' + (error.response?.data?.message || error.message));
  }
}; 
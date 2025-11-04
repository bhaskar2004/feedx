import axios from 'axios';

// Remove the /api suffix since your routes already include it
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5002';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  withCredentials: true
});

const newsApi = {
  async getTopHeadlines(params = {}) {
    try {
      // console.log('Fetching top headlines with params:', params);
      const response = await api.get('/api/news', { params });
      // console.log('Top headlines response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching top headlines:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      throw new Error(error.response?.data?.error || 'Failed to fetch top headlines');
    }
  },

  async searchNews(query) {
    try {
      // console.log('Searching news for query:', query);
      const response = await api.get('/api/news', {
        params: {
          q: query,
          sortBy: 'publishedAt',
          language: 'en'
        }
      });
      // console.log('Search response:', response.data);
      if (!response.data.articles) {
        throw new Error('No articles found');
      }
      return response.data;
    } catch (error) {
      console.error('Error searching news:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      throw new Error(error.response?.data?.error || 'Failed to search news');
    }
  },

  async getNewsByCategory(category) {
    try {
      // console.log('Fetching news for category:', category);
      const response = await api.get('/api/news', {
        params: {
          category
        }
      });
      // console.log('Category response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching category news:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      throw new Error(error.response?.data?.error || 'Failed to fetch category news');
    }
  }
};

export default newsApi;
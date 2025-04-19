import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Box,
  Button,
  Chip,
  CircularProgress,
  Alert,
} from '@mui/material';
import newsApi from '../services/newsApi';
import { formatDate } from '../utils/dateUtils';

const Search = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search).get('q');
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query) {
        setLoading(false);
        navigate('/');
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const data = await newsApi.searchNews(query);
        console.log('Search results:', data);
        if (data.articles && data.articles.length > 0) {
          setArticles(data.articles);
        } else {
          setError(`No articles found for "${query}". Try different keywords.`);
          setArticles([]);
        }
      } catch (err) {
        console.error('Search error:', err);
        setError(err.message || 'Failed to search news');
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query, navigate]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
        <Button variant="contained" onClick={() => navigate('/')}>
          Back to Home
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Search Results for "{query}"
      </Typography>
      {articles.length === 0 ? (
        <Typography variant="body1" color="text.secondary">
          No articles found. Try a different search term.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {articles.map((article, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={article.urlToImage || 'https://via.placeholder.com/300x200'}
                  alt={article.title}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Chip
                    label={article.source.name}
                    color="primary"
                    size="small"
                    sx={{ mb: 1 }}
                  />
                  <Typography gutterBottom variant="h6" component="h2">
                    {article.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {article.description}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                    <Typography variant="caption" color="text.secondary">
                      {formatDate(article.publishedAt)}
                    </Typography>
                    <Button
                      component="a"
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      color="primary"
                      size="small"
                    >
                      Read More
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Search; 
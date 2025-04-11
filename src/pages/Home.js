import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  Button,
  CircularProgress,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { getTopHeadlines } from '../services/newsApi';

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const data = await getTopHeadlines();
        if (data.length === 0) {
          setError('No articles found. Please try again later.');
        } else {
          setArticles(data);
          setError(null);
        }
      } catch (err) {
        setError(err.message || 'Failed to fetch articles. Please check your API key and try again later.');
        console.error('Error in Home component:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
    // Refresh articles every 5 minutes
    const interval = setInterval(fetchArticles, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const trendingTopics = [
    'Technology',
    'Business',
    'Science',
    'Health',
    'Entertainment',
    'Sports',
  ];

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container>
        <Typography color="error" align="center">
          {error}
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Featured Articles */}
      <Typography variant="h4" component="h1" gutterBottom>
        Featured Articles
      </Typography>
      <Grid container spacing={4} sx={{ mb: 6 }}>
        {articles.slice(0, 2).map((article) => (
          <Grid item xs={12} md={6} key={article.url}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                height="240"
                image={article.urlToImage || 'https://via.placeholder.com/800x400'}
                alt={article.title}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Chip
                  label={article.source.name}
                  color="primary"
                  size="small"
                  sx={{ mb: 1 }}
                />
                <Typography gutterBottom variant="h5" component="h2">
                  {article.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {article.description}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {new Date(article.publishedAt).toLocaleDateString()}
                </Typography>
                <Button
                  component="a"
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  color="primary"
                  sx={{ mt: 2 }}
                >
                  Read More
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Latest News */}
      <Typography variant="h4" component="h2" gutterBottom>
        Latest News
      </Typography>
      <Grid container spacing={3} sx={{ mb: 6 }}>
        {articles.slice(2).map((article) => (
          <Grid item xs={12} sm={6} md={4} key={article.url}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                height="140"
                image={article.urlToImage || 'https://via.placeholder.com/400x200'}
                alt={article.title}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Chip
                  label={article.source.name}
                  color="primary"
                  size="small"
                  sx={{ mb: 1 }}
                />
                <Typography gutterBottom variant="h6" component="h3">
                  {article.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {article.description}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {new Date(article.publishedAt).toLocaleDateString()}
                </Typography>
                <Button
                  component="a"
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  color="primary"
                  size="small"
                  sx={{ mt: 1 }}
                >
                  Read More
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Trending Topics */}
      <Typography variant="h4" component="h2" gutterBottom>
        Trending Topics
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 4 }}>
        {trendingTopics.map((topic) => (
          <Chip
            key={topic}
            label={topic}
            component={Link}
            to={`/search?q=${encodeURIComponent(topic)}`}
            clickable
            sx={{ m: 0.5 }}
          />
        ))}
      </Box>

      {/* Newsletter Signup */}
      <Box
        sx={{
          bgcolor: 'background.paper',
          p: 4,
          borderRadius: 1,
          textAlign: 'center',
        }}
      >
        <Typography variant="h5" gutterBottom>
          Stay Updated with TechNews
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Subscribe to our newsletter for the latest tech news and updates.
        </Typography>
        <Button variant="contained" color="primary" size="large">
          Subscribe Now
        </Button>
      </Box>
    </Container>
  );
};

export default Home; 
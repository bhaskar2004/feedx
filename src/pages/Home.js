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
  Paper,
  useTheme,
} from '@mui/material';
import { Link } from 'react-router-dom';
import newsApi from '../services/newsApi';
import { formatDate } from '../utils/dateUtils';
import Loading from '../components/Loading';

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const theme = useTheme();

  useEffect(() => {
    const fetchTopHeadlines = async () => {
      try {
        setLoading(true);
        const data = await newsApi.getTopHeadlines({ category: 'technology', country: 'us' });
        setArticles(data.articles || []);
        setError(null);
      } catch (err) {
        setError(err.message);
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTopHeadlines();
  }, []);

  const trendingTopics = [
    'Technology',
    'Business',
    'Science',
    'Health',
    'Entertainment',
    'Sports',
  ];

  if (loading) return <Loading />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Hero Section */}
      <Paper
        elevation={0}
        sx={{
          p: 4,
          mb: 4,
          borderRadius: 2,
          background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
          color: 'white',
        }}
      >
        <Typography variant="h3" component="h1" gutterBottom>
          Welcome to TechNews
        </Typography>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Your source for the latest technology news and updates
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          component={Link}
          to="/category/technology"
        >
          Explore Latest Tech
        </Button>
      </Paper>

      {/* Featured Articles */}
      <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 3 }}>
        Featured Articles
      </Typography>
      <Grid container spacing={4} sx={{ mb: 6 }}>
        {articles.slice(0, 2).map((article) => (
          <Grid item xs={12} md={6} key={article.url}>
            <Card 
              sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: theme.shadows[8],
                }
              }}
            >
              <CardMedia
                component="img"
                height="240"
                image={article.urlToImage || 'https://via.placeholder.com/800x400'}
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
                <Typography gutterBottom variant="h5" component="h2" sx={{ 
                  fontWeight: 'bold',
                  '&:hover': {
                    color: theme.palette.primary.main,
                  }
                }}>
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
                    variant="contained"
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

      {/* Latest News */}
      <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 3 }}>
        Latest News
      </Typography>
      <Grid container spacing={3} sx={{ mb: 6 }}>
        {articles.slice(2).map((article) => (
          <Grid item xs={12} sm={6} md={4} key={article.url}>
            <Card 
              sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: theme.shadows[8],
                }
              }}
            >
              <CardMedia
                component="img"
                height="140"
                image={article.urlToImage || 'https://via.placeholder.com/400x200'}
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
                <Typography gutterBottom variant="h6" component="h3" sx={{
                  fontWeight: 'bold',
                  '&:hover': {
                    color: theme.palette.primary.main,
                  }
                }}>
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
                    variant="contained"
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

      {/* Trending Topics */}
      <Paper elevation={0} sx={{ p: 3, mb: 4, borderRadius: 2, bgcolor: 'background.paper' }}>
        <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 3 }}>
          Trending Topics
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {trendingTopics.map((topic) => (
            <Chip
              key={topic}
              label={topic}
              component={Link}
              to={`/search?q=${encodeURIComponent(topic)}`}
              clickable
              sx={{ 
                m: 0.5,
                transition: 'all 0.2s',
                '&:hover': {
                  transform: 'scale(1.05)',
                  bgcolor: theme.palette.primary.main,
                  color: 'white',
                }
              }}
            />
          ))}
        </Box>
      </Paper>
    </Container>
  );
};

export default Home; 
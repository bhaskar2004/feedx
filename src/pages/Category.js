import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Grid, Card, CardContent, CardMedia, Box } from '@mui/material';
import newsApi from '../services/newsApi';
import Loading from '../components/Loading';

const Category = () => {
  const { category } = useParams();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategoryNews = async () => {
      try {
        setLoading(true);
        const data = await newsApi.getNewsByCategory(category);
        setArticles(data.articles || []);
        setError(null);
      } catch (err) {
        setError(err.message);
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryNews();
  }, [category]);

  if (loading) return <Loading />;
  if (error) return <Typography color="error" sx={{ color: '#ffffff' }}>{error}</Typography>;

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #0a0a0a 100%)',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.03), transparent 50%), radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.05), transparent 50%)',
          pointerEvents: 'none',
          zIndex: 0,
        }
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          maxWidth: '100%',
          px: { xs: 2, sm: 3, md: 4, lg: 6 },
          py: 4,
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom sx={{ color: '#ffffff' }}>
          {category.charAt(0).toUpperCase() + category.slice(1)} News
        </Typography>
      <Grid container spacing={3}>
        {articles.map((article, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ background: 'rgba(255, 255, 255, 0.03)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <CardMedia
                component="img"
                height="200"
                image={article.urlToImage || 'https://via.placeholder.com/300x200'}
                alt={article.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="h2" sx={{ color: '#ffffff' }}>
                  {article.title}
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  {article.description}
                </Typography>
                <Box mt={2}>
                  <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                    Source: {article.source.name}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      </Container>
    </Box>
  );
};

export default Category; 
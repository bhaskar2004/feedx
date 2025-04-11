import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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
import { getNewsByCategory } from '../services/newsApi';

const Category = () => {
  const { category } = useParams();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log(`Fetching articles for category: ${category}`);
        const data = await getNewsByCategory(category);
        console.log(`Received ${data.length} articles for category: ${category}`);
        if (data.length === 0) {
          setError(`No articles found in the ${category} category. Please try a different category.`);
        } else {
          setArticles(data);
        }
      } catch (err) {
        console.error(`Error fetching ${category} articles:`, err);
        setError(err.message || `Failed to fetch ${category} articles. Please check your internet connection and try again.`);
      } finally {
        setLoading(false);
      }
    };

    if (category) {
      fetchArticles();
    }
  }, [category]);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        {category.charAt(0).toUpperCase() + category.slice(1)} News
      </Typography>

      {loading && (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Typography color="error" align="center" sx={{ mb: 4 }}>
          {error}
        </Typography>
      )}

      {!loading && !error && articles.length > 0 && (
        <Grid container spacing={3}>
          {articles.map((article) => (
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
      )}

      {!loading && !error && articles.length === 0 && (
        <Typography align="center" color="text.secondary">
          No articles found in this category.
        </Typography>
      )}
    </Container>
  );
};

export default Category; 
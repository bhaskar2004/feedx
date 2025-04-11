import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
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
  TextField,
  InputAdornment,
  IconButton,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { searchNews } from '../services/newsApi';

const Search = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get('q');
    if (query) {
      setSearchQuery(query);
      handleSearch(query);
    }
  }, [location]);

  const handleSearch = async (query) => {
    if (!query.trim()) return;

    try {
      setLoading(true);
      setError(null);
      const data = await searchNews(query);
      if (data.length === 0) {
        setError('No articles found for your search. Try different keywords.');
      } else {
        setArticles(data);
      }
    } catch (err) {
      setError(err.message || 'Failed to search articles. Please try again later.');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(searchQuery);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search for news..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton type="submit" edge="end">
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>

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
        <>
          <Typography variant="h5" gutterBottom>
            Search Results for "{searchQuery}"
          </Typography>
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
        </>
      )}

      {!loading && !error && articles.length === 0 && searchQuery && (
        <Typography align="center" color="text.secondary">
          No articles found. Try a different search term.
        </Typography>
      )}
    </Container>
  );
};

export default Search; 
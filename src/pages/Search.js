import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [debouncedQuery, setDebouncedQuery] = useState('');

  // Handle initial URL query
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get('q');
    if (query) {
      setSearchQuery(query);
      setDebouncedQuery(query);
    }
  }, [location]);

  // Debounce the search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 1000);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Handle the actual search
  const handleSearch = useCallback(async (query) => {
    if (!query.trim() || query.length < 3) {
      setError('Please enter at least 3 characters to search');
      setArticles([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      console.log(`Searching for: ${query}`);
      const data = await searchNews(query);
      console.log(`Received ${data.length} search results for: ${query}`);
      
      if (data.length === 0) {
        setError(`No articles found for "${query}". Try different keywords or check your spelling.`);
        setArticles([]);
      } else {
        setArticles(data);
        navigate(`/search?q=${encodeURIComponent(query)}`, { replace: true });
      }
    } catch (err) {
      console.error(`Error searching for "${query}":`, err);
      setError(err.message || 'Failed to search articles. Please check your internet connection and try again.');
      setArticles([]);
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  // Trigger search when debounced query changes
  useEffect(() => {
    if (debouncedQuery) {
      handleSearch(debouncedQuery);
    }
  }, [debouncedQuery, handleSearch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setDebouncedQuery(searchQuery);
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
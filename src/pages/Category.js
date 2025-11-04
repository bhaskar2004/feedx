import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Container, Typography, Grid, Card, CardContent, CardMedia, Box, Button, Chip } from '@mui/material';
import { Business, SportsBasketball, Public, BusinessCenter, Science, Movie } from '@mui/icons-material';
import newsApi from '../services/newsApi';
import Loading from '../components/Loading';

const Category = () => {
  const { category } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(searchParams.get('subcategory') || 'all');

  const indianSubcategories = useMemo(() => [
    {
      key: 'all',
      label: 'All Indian News',
      icon: <Public />,
      query: 'India OR Indian OR "New Delhi" OR Mumbai OR Bangalore'
    },
    {
      key: 'share-market',
      label: 'Share Market',
      icon: <Business />,
      query: 'Sensex OR Nifty OR NSE OR BSE OR "stock market India"'
    },
    {
      key: 'sports',
      label: 'Sports',
      icon: <SportsBasketball />,
      query: 'cricket OR IPL OR "Indian Premier League" OR "T20" OR "Test match" OR hockey OR badminton OR kabaddi OR "World Cup"'
    },
    {
      key: 'business',
      label: 'Business & Economy',
      icon: <BusinessCenter />,
      query: 'India economy OR GDP OR RBI OR "Indian business" OR "trade India"'
    },
    {
      key: 'science',
      label: 'Science & Research',
      icon: <Science />,
      query: 'ISRO OR "India space" OR "Indian research" OR "science India"'
    },
    {
      key: 'entertainment',
      label: 'Entertainment',
      icon: <Movie />,
      query: 'Bollywood OR "Indian cinema" OR "India entertainment" OR "Hindi film"'
    },
  ], []);

  // Handle image loading errors
  const handleImageError = useCallback((e) => {
    e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 300 200"%3E%3Crect fill="%23333" width="300" height="200"/%3E%3Ctext fill="%23999" font-family="sans-serif" font-size="14" dy="10.5" font-weight="400" x="50%25" y="50%25" text-anchor="middle"%3ENo Image Available%3C/text%3E%3C/svg%3E';
  }, []);

  // Filter articles for relevance
  const filterRelevantArticles = useCallback((articles, subcategoryKey) => {
    if (!articles || articles.length === 0) return [];

    return articles.filter(article => {
      if (!article.title && !article.description) return false;
      
      const text = `${article.title || ''} ${article.description || ''}`.toLowerCase();
      
      // Remove articles with irrelevant patterns
      const irrelevantPatterns = [
        /\b(pakistan(?!i)|bangladesh|sri lanka)\b/i,
        /\b(horoscope|astrology|zodiac sign)\b/i,
        /\b(accident|crash|tragedy|murder|death|killed)\b/i, // Remove tragic news
        /\b(appointment|appoint|elevate|promote|joins as)\b/i // Remove job appointments unless stock-related
      ];

      const hasIrrelevantContent = irrelevantPatterns.some(pattern => 
        pattern.test(text)
      );

      if (hasIrrelevantContent) return false;

      // For share market, require strict stock market keywords
      if (subcategoryKey === 'share-market') {
        const strictMarketKeywords = ['sensex', 'nifty', 'nse', 'bse', 'stock', 'share', 'equity', 'ipo', 'trading', 'market index', 'rally', 'trading session'];
        const hasStrictKeyword = strictMarketKeywords.some(keyword => 
          text.includes(keyword.toLowerCase())
        );
        if (!hasStrictKeyword) return false;
      }

      // Must contain India-related content for most categories
      if (subcategoryKey !== 'share-market') {
        const hasIndiaContent = /\b(india|indian|bharat|delhi|mumbai|bangalore|chennai)\b/i.test(text);
        if (!hasIndiaContent) return false;
      }

      // Additional filtering based on subcategory
      if (subcategoryKey && subcategoryKey !== 'all') {
        const relevantKeywords = getRelevantKeywords(subcategoryKey);
        const hasRelevantKeyword = relevantKeywords.some(keyword => 
          text.includes(keyword.toLowerCase())
        );
        return hasRelevantKeyword;
      }

      return true;
    });
  }, []);

  // Get relevant keywords for each subcategory
  const getRelevantKeywords = (subcategoryKey) => {
    const keywordMap = {
      'share-market': ['stock', 'sensex', 'nifty', 'nse', 'bse', 'share', 'trading', 'equity', 'ipo', 'mutual fund', 'market index', 'rally', 'rally', 'trading session', 'market cap'],
      'sports': ['cricket', 'ipl', 'football', 'hockey', 'badminton', 'kabaddi', 'olympic', 'sport', 'match', 'tournament'],
      'business': ['business', 'economy', 'gdp', 'rbi', 'trade', 'corporate', 'industry', 'manufacturing', 'export', 'inflation'],
      'science': ['isro', 'space', 'research', 'science', 'satellite', 'mission', 'innovation', 'drdo', 'launch', 'rover'],
      'entertainment': ['bollywood', 'movie', 'film', 'actor', 'actress', 'ott', 'web series', 'cinema', 'entertainment', 'celebrity']
    };
    return keywordMap[subcategoryKey] || [];
  };

  useEffect(() => {
    const fetchCategoryNews = async () => {
      try {
        setLoading(true);
        let data;

        if (category === 'indian') {
          const subcategory = indianSubcategories.find(sub => sub.key === selectedSubcategory);
          if (subcategory) {
            // Pass only the query string, not an object
            // console.log('Searching for:', subcategory.query);
            data = await newsApi.searchNews(subcategory.query);
            
            // Filter for relevant articles
            if (data && data.articles) {
              const filteredArticles = filterRelevantArticles(data.articles, subcategory.key);
              // Remove duplicates based on URL
              const uniqueArticles = filteredArticles.filter((article, index, self) =>
                index === self.findIndex(a => a.url === article.url)
              );
              data.articles = uniqueArticles.slice(0, 30);
            }
          } else {
            data = await newsApi.getNewsByCategory(category);
          }
        } else {
          data = await newsApi.getNewsByCategory(category);
        }

        // Remove duplicates based on URL
        if (data?.articles) {
          data.articles = data.articles.filter((article, index, self) =>
            article.url && index === self.findIndex(a => a.url === article.url)
          );
        }
        setArticles(data?.articles || []);
        setError(null);
      } catch (err) {
        console.error('Error fetching news:', err);
        setError(err.message || 'Failed to fetch news');
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryNews();
  }, [category, selectedSubcategory, indianSubcategories, filterRelevantArticles]);

  const handleSubcategoryChange = (subcategoryKey) => {
    setSelectedSubcategory(subcategoryKey);
    setSearchParams({ subcategory: subcategoryKey });
  };

  if (loading) return <Loading />;
  
  if (error) {
    return (
      <Container sx={{ py: 4 }}>
        <Typography color="error" sx={{ color: '#ff6b6b', textAlign: 'center' }}>
          {error}
        </Typography>
      </Container>
    );
  }

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
        <Typography variant="h4" component="h1" gutterBottom sx={{ color: '#ffffff', mb: 3 }}>
          {category.charAt(0).toUpperCase() + category.slice(1)} News
        </Typography>

        {category === 'indian' && (
          <Box sx={{ mb: 4, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {indianSubcategories.map((subcategory) => (
              <Chip
                key={subcategory.key}
                icon={subcategory.icon}
                label={subcategory.label}
                onClick={() => handleSubcategoryChange(subcategory.key)}
                variant={selectedSubcategory === subcategory.key ? 'filled' : 'outlined'}
                sx={{
                  color: selectedSubcategory === subcategory.key ? '#ffffff' : 'rgba(255, 255, 255, 0.7)',
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                  backgroundColor: selectedSubcategory === subcategory.key ? 'rgba(37, 99, 235, 0.8)' : 'transparent',
                  '&:hover': {
                    backgroundColor: selectedSubcategory === subcategory.key ? 'rgba(37, 99, 235, 0.9)' : 'rgba(255, 255, 255, 0.1)',
                  },
                  '& .MuiChip-icon': {
                    color: selectedSubcategory === subcategory.key ? '#ffffff' : 'rgba(255, 255, 255, 0.7)',
                  },
                }}
              />
            ))}
          </Box>
        )}

        {articles.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              No articles found for this category
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.5)', mt: 1 }}>
              Try selecting a different subcategory
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {articles.map((article, index) => (
              <Grid item xs={12} sm={6} md={4} key={`${article.url}-${index}`}>
                <Card sx={{ 
                  background: 'rgba(255, 255, 255, 0.03)', 
                  backdropFilter: 'blur(20px)', 
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
                  }
                }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={article.urlToImage || ''}
                    alt={article.title}
                    onError={handleImageError}
                    sx={{ 
                      objectFit: 'cover',
                      backgroundColor: '#333'
                    }}
                  />
                  <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <Typography 
                      gutterBottom 
                      variant="h6" 
                      component="h2" 
                      sx={{ 
                        color: '#ffffff', 
                        mb: 2,
                        fontSize: { xs: '1rem', md: '1.1rem' },
                        lineHeight: 1.4,
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}
                    >
                      {article.title}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: 'rgba(255, 255, 255, 0.7)', 
                        mb: 2, 
                        flexGrow: 1,
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}
                    >
                      {article.description || 'No description available'}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 'auto' }}>
                      <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                        {article.source?.name || 'Unknown Source'}
                      </Typography>
                      <Button
                        component="a"
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="contained"
                        size="small"
                        sx={{
                          background: 'rgba(37, 99, 235, 0.8)',
                          '&:hover': {
                            background: 'rgba(37, 99, 235, 1)',
                          }
                        }}
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
    </Box>
  );
};

export default Category;
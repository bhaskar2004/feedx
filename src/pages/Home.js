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
  Paper,
} from '@mui/material';
import { Link } from 'react-router-dom';
import newsApi from '../services/newsApi';
import { formatDate } from '../utils/dateUtils';
import Loading from '../components/Loading';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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



  if (loading) return <Loading />;
  if (error) return <Typography color="error">{error}</Typography>;

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
        {/* Hero Section - Full Width Glassmorphism */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 5 },
            mb: 5,
            borderRadius: 3,
            background: 'rgba(255, 255, 255, 0.03)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <Typography
              variant="h2"
              component="h1"
              gutterBottom
              sx={{
                fontWeight: 700,
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                letterSpacing: '-0.02em',
                color: '#ffffff',
                mb: 2,
              }}
            >
              TechNews
            </Typography>
            <Typography
              variant="h6"
              sx={{
                mb: 4,
                color: 'rgba(255, 255, 255, 0.7)',
                fontWeight: 400,
                fontSize: { xs: '1rem', md: '1.2rem' },
                lineHeight: 1.6,
                maxWidth: '700px',
              }}
            >
              Discover the latest in technology from around the world
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                size="medium"
                component={Link}
                to="/category/technology"
                endIcon={<ArrowForwardIcon />}
                sx={{
                  borderRadius: 2,
                  px: 3,
                  py: 1.2,
                  fontWeight: 600,
                  textTransform: 'none',
                  fontSize: '1rem',
                  background: 'rgba(255, 255, 255, 0.15)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
                  '&:hover': {
                    background: 'rgba(255, 255, 255, 0.25)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.4)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                Explore Now
              </Button>
            </Box>
          </Box>
        </Paper>

        {/* Featured Articles - Full Width Cards */}
        <Box sx={{ mb: 6 }}>
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={{
              mb: 4,
              fontWeight: 700,
              fontSize: { xs: '1.8rem', md: '2.2rem' },
              color: '#ffffff',
              position: 'relative',
              display: 'inline-block',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -8,
                left: 0,
                width: '60px',
                height: '3px',
                background: 'rgba(255, 255, 255, 0.5)',
                borderRadius: '2px',
              }
            }}
          >
            Featured Stories
          </Typography>
          <Grid container spacing={4} sx={{ mt: 2 }}>
            {articles.slice(0, 2).map((article, index) => (
              <Grid item xs={12} key={article.url}>
                <Card
                  sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: index === 0 ? 'row' : 'row-reverse' },
                    borderRadius: 3,
                    overflow: 'hidden',
                    background: 'rgba(255, 255, 255, 0.03)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    position: 'relative',
                    minHeight: { md: '350px' },
                    '&:hover': {
                      transform: 'translateY(-6px)',
                      boxShadow: '0 12px 35px rgba(0, 0, 0, 0.6)',
                      background: 'rgba(255, 255, 255, 0.05)',
                      '& .featured-media': {
                        transform: 'scale(1.05)',
                      }
                    }
                  }}
                >
                  <Box 
                    sx={{ 
                      width: { xs: '100%', md: '50%' },
                      overflow: 'hidden',
                      position: 'relative',
                    }}
                  >
                    <CardMedia
                      className="featured-media"
                      component="img"
                      image={article.urlToImage || 'https://picsum.photos/1200/600'}
                      alt={article.title}
                      sx={{
                        width: '100%',
                        height: { xs: '300px', md: '100%' },
                        objectFit: 'cover',
                        transition: 'transform 0.5s ease',
                      }}
                    />
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 20,
                        left: 20,
                      }}
                    >
                      <Chip
                        label={article.source.name}
                        sx={{
                          bgcolor: 'rgba(255, 255, 255, 0.9)',
                          backdropFilter: 'blur(10px)',
                          fontWeight: 700,
                          fontSize: '0.9rem',
                          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
                        }}
                      />
                    </Box>
                  </Box>
                  <CardContent 
                    sx={{ 
                      flexGrow: 1, 
                      p: { xs: 3, md: 4 },
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      width: { xs: '100%', md: '50%' },
                    }}
                  >
                    <Typography
                      variant="h5"
                      component="h2"
                      sx={{
                        fontWeight: 700,
                        mb: 2,
                        fontSize: { xs: '1.3rem', md: '1.6rem' },
                        lineHeight: 1.3,
                        color: 'white',
                      }}
                    >
                      {article.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        mb: 3,
                        lineHeight: 1.7,
                        fontSize: '1rem',
                        color: 'rgba(255, 255, 255, 0.7)',
                      }}
                    >
                      {article.description}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 'auto' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <AccessTimeIcon sx={{ fontSize: 18, color: 'rgba(255, 255, 255, 0.7)' }} />
                        <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', fontWeight: 500 }}>
                          {formatDate(article.publishedAt)}
                        </Typography>
                      </Box>
                      <Button
                        component="a"
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        endIcon={<ArrowForwardIcon />}
                        sx={{
                          borderRadius: 2,
                          textTransform: 'none',
                          fontWeight: 700,
                          px: 3,
                          py: 1.5,
                          fontSize: '1rem',
                          background: 'rgba(255, 255, 255, 0.2)',
                          backdropFilter: 'blur(10px)',
                          border: '1px solid rgba(255, 255, 255, 0.3)',
                          color: 'white',
                          '&:hover': {
                            background: 'rgba(255, 255, 255, 0.3)',
                          }
                        }}
                      >
                        Read Full Story
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Latest News - Grid Layout */}
        <Box sx={{ mb: 6 }}>
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={{
              mb: 4,
              fontWeight: 700,
              fontSize: { xs: '1.8rem', md: '2.2rem' },
              color: '#ffffff',
              position: 'relative',
              display: 'inline-block',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -8,
                left: 0,
                width: '60px',
                height: '3px',
                background: 'rgba(255, 255, 255, 0.5)',
                borderRadius: '2px',
              }
            }}
          >
            Latest Updates
          </Typography>
          <Grid container spacing={3} sx={{ mt: 2 }}>
            {articles.slice(2).map((article) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={article.url}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: 3,
                    overflow: 'hidden',
                    background: 'rgba(255, 255, 255, 0.03)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 12px 35px rgba(0, 0, 0, 0.6)',
                      background: 'rgba(255, 255, 255, 0.05)',
                      '& .card-media': {
                        transform: 'scale(1.08)',
                      }
                    }
                  }}
                >
                  <Box sx={{ overflow: 'hidden', position: 'relative' }}>
                    <CardMedia
                      className="card-media"
                      component="img"
                      height="200"
                      image={article.urlToImage || 'https://picsum.photos/400/300'}
                      alt={article.title}
                      sx={{
                        objectFit: 'cover',
                        transition: 'transform 0.5s ease',
                      }}
                    />
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 12,
                        left: 12,
                      }}
                    >
                      <Chip
                        label={article.source.name}
                        size="small"
                        sx={{
                          bgcolor: 'rgba(255, 255, 255, 0.9)',
                          backdropFilter: 'blur(10px)',
                          fontWeight: 600,
                          fontSize: '0.75rem',
                          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
                        }}
                      />
                    </Box>
                  </Box>
                  <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    <Typography
                      variant="h6"
                      component="h3"
                      sx={{
                        fontWeight: 700,
                        mb: 2,
                        fontSize: '1.1rem',
                        lineHeight: 1.4,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        color: 'white',
                        textShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
                      }}
                    >
                      {article.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        lineHeight: 1.6,
                        mb: 2,
                        color: 'rgba(255, 255, 255, 0.8)',
                      }}
                    >
                      {article.description}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 'auto' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <AccessTimeIcon sx={{ fontSize: 14, color: 'rgba(255, 255, 255, 0.6)' }} />
                        <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.6)', fontWeight: 500 }}>
                          {formatDate(article.publishedAt)}
                        </Typography>
                      </Box>
                      <Button
                        component="a"
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        size="small"
                        sx={{
                          borderRadius: 2,
                          textTransform: 'none',
                          fontWeight: 600,
                          px: 2,
                          py: 0.5,
                          fontSize: '0.85rem',
                          background: 'rgba(255, 255, 255, 0.2)',
                          backdropFilter: 'blur(5px)',
                          border: '1px solid rgba(255, 255, 255, 0.3)',
                          color: 'white',
                          '&:hover': {
                            background: 'rgba(255, 255, 255, 0.3)',
                          }
                        }}
                      >
                        Read
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>


      </Container>
    </Box>
  );
};

export default Home;
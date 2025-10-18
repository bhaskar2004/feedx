import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Avatar,
  Box,
  Chip,
  Button,
  CircularProgress,
} from '@mui/material';

import newsApi from '../services/newsApi';

const Author = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchAuthorArticles = async () => {
      try {
        setLoading(true);
        const data = await newsApi.getTopHeadlines();
        setArticles(data.articles || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAuthorArticles();
  }, []);

  if (loading) {
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
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <CircularProgress />
        </Container>
      </Box>
    );
  }

  if (error) {
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
          <Typography color="error" sx={{ color: '#ffffff' }}>{error}</Typography>
        </Container>
      </Box>
    );
  }

  // Mock author data since NewsAPI doesn't provide author details
  const author = {
    name: 'Tech News Author',
    avatar: 'https://via.placeholder.com/150',
    bio: 'Tech journalist covering the latest in technology and innovation.',
    social: {
      twitter: '#',
      linkedin: '#',
      website: '#',
    },
  };

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
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Card sx={{ background: 'rgba(255, 255, 255, 0.03)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
            <CardContent>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
                <Avatar
                  src={author.avatar}
                  alt={author.name}
                  sx={{ width: 120, height: 120, mb: 2 }}
                />
                <Typography variant="h5" component="h1" gutterBottom sx={{ color: '#ffffff' }}>
                  {author.name}
                </Typography>
                <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.7)' }} align="center">
                  {author.bio}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                <Button
                  variant="outlined"
                  component="a"
                  href={author.social.twitter}
                  target="_blank"
                >
                  Twitter
                </Button>
                <Button
                  variant="outlined"
                  component="a"
                  href={author.social.linkedin}
                  target="_blank"
                >
                  LinkedIn
                </Button>
                <Button
                  variant="outlined"
                  component="a"
                  href={author.social.website}
                  target="_blank"
                >
                  Website
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ color: '#ffffff' }}>
            Recent Articles
          </Typography>
          <Grid container spacing={3}>
            {articles.slice(0, 5).map((article, index) => (
              <Grid item xs={12} key={index}>
                <Card sx={{ display: 'flex', background: 'rgba(255, 255, 255, 0.03)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                  <CardMedia
                    component="img"
                    sx={{ width: 200, display: { xs: 'none', sm: 'block' } }}
                    image={article.urlToImage || 'https://via.placeholder.com/400x200'}
                    alt={article.title}
                  />
                  <CardContent sx={{ flex: 1 }}>
                    <Chip
                      label={article.source.name}
                      sx={{ mb: 1, color: '#ffffff', borderColor: 'rgba(255, 255, 255, 0.3)' }}
                      size="small"
                    />
                    <Typography variant="h6" component="h3" gutterBottom sx={{ color: '#ffffff' }}>
                      {article.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }} paragraph>
                      {article.description}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.5)' }}>
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
        </Grid>
      </Grid>
      </Container>
    </Box>
  );
};

export default Author; 
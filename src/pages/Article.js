import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Avatar,
  Chip,
  Button,
  Divider,
  CircularProgress,
} from '@mui/material';
import {
  Share as ShareIcon,
} from '@mui/icons-material';
import { formatDate } from '../utils/dateUtils';
import newsApi from '../services/newsApi';

const Article = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        const data = await newsApi.getTopHeadlines();
        const foundArticle = data.articles ? data.articles[parseInt(id)] : null;
        if (foundArticle) {
          setArticle(foundArticle);
        } else {
          setError('Article not found');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchArticle();
    }
  }, [id]);

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error || !article) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography color="error">{error || 'Article not found'}</Typography>
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
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Typography variant="h3" component="h1" gutterBottom sx={{ color: '#ffffff' }}>
              {article.title}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Avatar
                src={article.urlToImage || 'https://via.placeholder.com/150'}
                alt={article.source.name}
                sx={{ mr: 2 }}
              />
              <Box>
                <Typography variant="subtitle1" sx={{ color: '#ffffff' }}>
                  {article.source.name}
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  {formatDate(article.publishedAt)} • {article.source.name}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Chip
                label={article.source.name}
                sx={{ mr: 1, mb: 1, color: '#ffffff', borderColor: 'rgba(255, 255, 255, 0.3)' }}
              />
            </Box>

            <Typography variant="body1" paragraph sx={{ mb: 3, color: 'rgba(255, 255, 255, 0.8)' }}>
              {article.description}
            </Typography>

          <Box sx={{ mb: 3 }}>
            <Button
              component="a"
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              variant="contained"
              color="primary"
            >
              Read Full Article
            </Button>
          </Box>

          <Divider sx={{ my: 4 }} />

          <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
            <Button
              variant="outlined"
              startIcon={<ShareIcon />}
            >
              Share
            </Button>
          </Box>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ mb: 4, background: 'rgba(255, 255, 255, 0.03)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ color: '#ffffff' }}>
                About the Author
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar
                  src={article.author.avatar}
                  alt={article.author.name}
                  sx={{ width: 56, height: 56, mr: 2 }}
                />
                <Box>
                  <Typography variant="subtitle1" sx={{ color: '#ffffff' }}>
                    {article.author.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    {article.author.bio}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>

          <Card sx={{ background: 'rgba(255, 255, 255, 0.03)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ color: '#ffffff' }}>
                Related Articles
              </Typography>
              {/* Add related articles here */}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      </Container>
    </Box>
  );
};

export default Article; 
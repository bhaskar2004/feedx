import React from 'react';
import { useParams } from 'react-router-dom';
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
} from '@mui/material';
import { Link } from 'react-router-dom';

// Mock data - In a real app, this would come from an API
const mockAuthor = {
  id: 1,
  name: 'John Doe',
  avatar: 'https://i.pravatar.cc/150?img=1',
  bio: 'Tech journalist with 10 years of experience covering AI and emerging technologies. Specializes in artificial intelligence, machine learning, and future tech trends.',
  articles: [
    {
      id: 1,
      title: 'The Future of AI: What to Expect in 2024',
      excerpt: 'Exploring the latest developments in artificial intelligence and their potential impact on various industries.',
      image: 'https://source.unsplash.com/random/800x400?ai',
      category: 'Analysis',
      date: '2024-01-15',
    },
    {
      id: 2,
      title: 'Understanding Neural Networks: A Beginner\'s Guide',
      excerpt: 'A comprehensive introduction to neural networks and their applications in modern technology.',
      image: 'https://source.unsplash.com/random/800x400?neural',
      category: 'Analysis',
      date: '2024-01-10',
    },
  ],
  social: {
    twitter: 'https://twitter.com/johndoe',
    linkedin: 'https://linkedin.com/in/johndoe',
    website: 'https://johndoe.com',
  },
};

const Author = () => {
  const { id } = useParams();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
                <Avatar
                  src={mockAuthor.avatar}
                  alt={mockAuthor.name}
                  sx={{ width: 120, height: 120, mb: 2 }}
                />
                <Typography variant="h5" component="h1" gutterBottom>
                  {mockAuthor.name}
                </Typography>
                <Typography variant="body1" color="text.secondary" align="center">
                  {mockAuthor.bio}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                <Button
                  variant="outlined"
                  component="a"
                  href={mockAuthor.social.twitter}
                  target="_blank"
                >
                  Twitter
                </Button>
                <Button
                  variant="outlined"
                  component="a"
                  href={mockAuthor.social.linkedin}
                  target="_blank"
                >
                  LinkedIn
                </Button>
                <Button
                  variant="outlined"
                  component="a"
                  href={mockAuthor.social.website}
                  target="_blank"
                >
                  Website
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Typography variant="h5" component="h2" gutterBottom>
            Recent Articles
          </Typography>
          <Grid container spacing={3}>
            {mockAuthor.articles.map((article) => (
              <Grid item xs={12} key={article.id}>
                <Card sx={{ display: 'flex' }}>
                  <CardMedia
                    component="img"
                    sx={{ width: 200, display: { xs: 'none', sm: 'block' } }}
                    image={article.image}
                    alt={article.title}
                  />
                  <CardContent sx={{ flex: 1 }}>
                    <Chip
                      label={article.category}
                      color="primary"
                      size="small"
                      sx={{ mb: 1 }}
                    />
                    <Typography variant="h6" component="h3" gutterBottom>
                      {article.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {article.excerpt}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {new Date(article.date).toLocaleDateString()}
                    </Typography>
                    <Button
                      component={Link}
                      to={`/article/${article.id}`}
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
  );
};

export default Author; 
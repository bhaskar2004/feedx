import React from 'react';
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
} from '@mui/material';
import {
  Share as ShareIcon,
  Favorite as FavoriteIcon,
  Comment as CommentIcon,
} from '@mui/icons-material';
import { formatDate } from '../utils/dateUtils';

// Mock data - In a real app, this would come from an API
const mockArticle = {
  id: 1,
  title: 'The Future of AI: What to Expect in 2024',
  content: `
    <p>Artificial Intelligence continues to evolve at a rapid pace, with 2024 promising groundbreaking developments across various sectors. From healthcare to transportation, AI is set to revolutionize how we live and work.</p>
    
    <h2>Key Trends to Watch</h2>
    <p>1. Generative AI: The next generation of AI models will be more sophisticated, capable of creating highly realistic content while maintaining ethical boundaries.</p>
    <p>2. AI in Healthcare: Advanced diagnostic tools and personalized treatment plans will become more accessible, improving patient outcomes.</p>
    <p>3. Autonomous Systems: Self-driving vehicles and smart cities will become more prevalent, powered by AI-driven decision-making systems.</p>
    
    <h2>Ethical Considerations</h2>
    <p>As AI becomes more integrated into our daily lives, ethical considerations around privacy, bias, and accountability will become increasingly important.</p>
  `,
  author: {
    name: 'John Doe',
    avatar: 'https://i.pravatar.cc/150?img=1',
    bio: 'Tech journalist with 10 years of experience covering AI and emerging technologies.',
  },
  date: '2024-01-15',
  category: 'Analysis',
  tags: ['AI', 'Machine Learning', 'Technology', 'Future'],
  likes: 245,
  comments: 32,
};

const Article = () => {
  const { id } = useParams();
  
  // In a real app, you would fetch the article using the id
  // For now, we'll just use mock data
  const article = mockArticle; // In production: await fetchArticle(id);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Typography variant="h3" component="h1" gutterBottom>
            {article.title}
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Avatar
              src={article.author.avatar}
              alt={article.author.name}
              sx={{ mr: 2 }}
            />
            <Box>
              <Typography variant="subtitle1">
                {article.author.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {formatDate(article.date)} • {article.category}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ mb: 3 }}>
            {article.tags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                sx={{ mr: 1, mb: 1 }}
              />
            ))}
          </Box>

          <Box
            sx={{
              '& h2': { mt: 4, mb: 2 },
              '& p': { mb: 2 },
              '& img': { maxWidth: '100%', height: 'auto', mb: 3 },
            }}
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          <Divider sx={{ my: 4 }} />

          <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
            <Button
              variant="outlined"
              startIcon={<FavoriteIcon />}
            >
              {article.likes} Likes
            </Button>
            <Button
              variant="outlined"
              startIcon={<CommentIcon />}
            >
              {article.comments} Comments
            </Button>
            <Button
              variant="outlined"
              startIcon={<ShareIcon />}
            >
              Share
            </Button>
          </Box>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ mb: 4 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                About the Author
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar
                  src={article.author.avatar}
                  alt={article.author.name}
                  sx={{ width: 56, height: 56, mr: 2 }}
                />
                <Box>
                  <Typography variant="subtitle1">
                    {article.author.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {article.author.bio}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Related Articles
              </Typography>
              {/* Add related articles here */}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Article; 
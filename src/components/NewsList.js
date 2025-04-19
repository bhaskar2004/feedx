import React from 'react';
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
} from '@mui/material';
import { formatDate } from '../utils/dateUtils';

const NewsList = ({ news }) => {
  if (!news || news.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography align="center" color="text.secondary">
          No articles found.
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={3}>
        {news.map((article) => (
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
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                  <Typography variant="caption" color="text.secondary">
                    {formatDate(article.publishedAt)}
                  </Typography>
                  <Button
                    component="a"
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    color="primary"
                    size="small"
                  >
                    Read More
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default NewsList; 
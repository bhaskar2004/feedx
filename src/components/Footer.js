import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link as MuiLink,
  IconButton,
} from '@mui/material';
import {
  Facebook,
  Twitter,
  LinkedIn,
  Instagram,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { label: 'About Us', path: '/about' },
    { label: 'Contact', path: '/contact' },
    { label: 'Privacy Policy', path: '/privacy' },
    { label: 'Terms of Service', path: '/terms' },
    { label: 'Advertise', path: '/advertise' },
    { label: 'Careers', path: '/careers' },
  ];

  const categories = [
    { label: 'News', path: '/category/news' },
    { label: 'Reviews', path: '/category/reviews' },
    { label: 'Analysis', path: '/category/analysis' },
    { label: 'Opinion', path: '/category/opinion' },
    { label: 'Interviews', path: '/category/interviews' },
    { label: 'Startups', path: '/category/startups' },
  ];

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'background.paper',
        py: 6,
        borderTop: 1,
        borderColor: 'divider',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              TechNews
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Your source for the latest in technology news, reviews, and analysis.
            </Typography>
            <Box sx={{ mt: 2 }}>
              <IconButton color="inherit" component="a" href="https://facebook.com">
                <Facebook />
              </IconButton>
              <IconButton color="inherit" component="a" href="https://twitter.com">
                <Twitter />
              </IconButton>
              <IconButton color="inherit" component="a" href="https://linkedin.com">
                <LinkedIn />
              </IconButton>
              <IconButton color="inherit" component="a" href="https://instagram.com">
                <Instagram />
              </IconButton>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Quick Links
            </Typography>
            <Box component="ul" sx={{ m: 0, p: 0, listStyle: 'none' }}>
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <MuiLink
                    component={Link}
                    to={link.path}
                    color="text.secondary"
                    sx={{ display: 'block', mb: 1 }}
                  >
                    {link.label}
                  </MuiLink>
                </li>
              ))}
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Categories
            </Typography>
            <Box component="ul" sx={{ m: 0, p: 0, listStyle: 'none' }}>
              {categories.map((category) => (
                <li key={category.label}>
                  <MuiLink
                    component={Link}
                    to={category.path}
                    color="text.secondary"
                    sx={{ display: 'block', mb: 1 }}
                  >
                    {category.label}
                  </MuiLink>
                </li>
              ))}
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Newsletter
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Subscribe to our newsletter for the latest tech news and updates.
            </Typography>
            <MuiLink
              component={Link}
              to="/newsletter"
              color="primary"
              variant="body2"
            >
              Subscribe Now
            </MuiLink>
          </Grid>
        </Grid>

        <Box sx={{ mt: 4, pt: 2, borderTop: 1, borderColor: 'divider' }}>
          <Typography variant="body2" color="text.secondary" align="center">
            © {currentYear} TechNews. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer; 
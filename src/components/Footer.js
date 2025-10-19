import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link as MuiLink,
} from '@mui/material';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { label: 'About Us', path: '/about' }
  ];

  const categories = [
    { label: 'Technology', path: '/category/technology' },
    { label: 'Business', path: '/category/business' },
    { label: 'Science', path: '/category/science' },
    { label: 'Health', path: '/category/health' },
    { label: 'Entertainment', path: '/category/entertainment' },
    { label: 'Sports', path: '/category/sports' },
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
              Connect
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <MuiLink
                href="https://github.com/bhaskar2004"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: 'text.secondary',
                  '&:hover': { color: 'primary.main' },
                  display: 'inline-block',
                  p: 1,
                }}
                aria-label="GitHub"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
              </MuiLink>
              <MuiLink
                href="https://www.linkedin.com/in/bhaskart2004/"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: 'text.secondary',
                  '&:hover': { color: 'primary.main' },
                  display: 'inline-block',
                  p: 1,
                }}
                aria-label="LinkedIn"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </MuiLink>
              <MuiLink
                href="mailto:bhaskarbhaskar4794@gmail.com"
                sx={{
                  color: 'text.secondary',
                  '&:hover': { color: 'primary.main' },
                  display: 'inline-block',
                  p: 1,
                }}
                aria-label="Email"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </MuiLink>
            </Box>
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
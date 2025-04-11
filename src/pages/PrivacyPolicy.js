import React from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  useTheme,
  Divider,
} from '@mui/material';

const PrivacyPolicy = () => {
  const theme = useTheme();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Hero Section */}
      <Paper
        elevation={0}
        sx={{
          p: 4,
          mb: 6,
          borderRadius: 2,
          background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
          color: 'white',
        }}
      >
        <Typography variant="h3" component="h1" gutterBottom>
          Privacy Policy
        </Typography>
        <Typography variant="h6">
          Last updated: {new Date().toLocaleDateString()}
        </Typography>
      </Paper>

      <Box sx={{ mb: 6 }}>
        <Typography variant="body1" paragraph>
          At TechNews, we take your privacy seriously. This Privacy Policy explains how we collect, use, 
          disclose, and safeguard your information when you visit our website.
        </Typography>

        <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
          Information We Collect
        </Typography>
        <Typography variant="body1" paragraph>
          We collect information that you voluntarily provide to us when you:
        </Typography>
        <ul>
          <li>
            <Typography variant="body1" paragraph>
              Register for an account
            </Typography>
          </li>
          <li>
            <Typography variant="body1" paragraph>
              Sign up for our newsletter
            </Typography>
          </li>
          <li>
            <Typography variant="body1" paragraph>
              Contact us through our contact form
            </Typography>
          </li>
          <li>
            <Typography variant="body1" paragraph>
              Leave comments on our articles
            </Typography>
          </li>
        </ul>

        <Divider sx={{ my: 4 }} />

        <Typography variant="h5" gutterBottom>
          How We Use Your Information
        </Typography>
        <Typography variant="body1" paragraph>
          We use the information we collect to:
        </Typography>
        <ul>
          <li>
            <Typography variant="body1" paragraph>
              Provide, maintain, and improve our services
            </Typography>
          </li>
          <li>
            <Typography variant="body1" paragraph>
              Send you technical notices, updates, and support messages
            </Typography>
          </li>
          <li>
            <Typography variant="body1" paragraph>
              Respond to your comments and questions
            </Typography>
          </li>
          <li>
            <Typography variant="body1" paragraph>
              Send you newsletters and marketing communications
            </Typography>
          </li>
        </ul>

        <Divider sx={{ my: 4 }} />

        <Typography variant="h5" gutterBottom>
          Information Security
        </Typography>
        <Typography variant="body1" paragraph>
          We implement appropriate technical and organizational security measures to protect your 
          personal information against unauthorized access, alteration, disclosure, or destruction.
        </Typography>

        <Divider sx={{ my: 4 }} />

        <Typography variant="h5" gutterBottom>
          Cookies and Tracking Technologies
        </Typography>
        <Typography variant="body1" paragraph>
          We use cookies and similar tracking technologies to track activity on our website and 
          hold certain information. You can instruct your browser to refuse all cookies or to 
          indicate when a cookie is being sent.
        </Typography>

        <Divider sx={{ my: 4 }} />

        <Typography variant="h5" gutterBottom>
          Third-Party Services
        </Typography>
        <Typography variant="body1" paragraph>
          We may employ third-party companies and individuals to facilitate our service, provide 
          service on our behalf, perform service-related services, or assist us in analyzing how 
          our service is used.
        </Typography>

        <Divider sx={{ my: 4 }} />

        <Typography variant="h5" gutterBottom>
          Your Rights
        </Typography>
        <Typography variant="body1" paragraph>
          You have the right to:
        </Typography>
        <ul>
          <li>
            <Typography variant="body1" paragraph>
              Access your personal information
            </Typography>
          </li>
          <li>
            <Typography variant="body1" paragraph>
              Correct inaccurate or incomplete information
            </Typography>
          </li>
          <li>
            <Typography variant="body1" paragraph>
              Request deletion of your personal information
            </Typography>
          </li>
          <li>
            <Typography variant="body1" paragraph>
              Object to our processing of your information
            </Typography>
          </li>
        </ul>

        <Divider sx={{ my: 4 }} />

        <Typography variant="h5" gutterBottom>
          Changes to This Privacy Policy
        </Typography>
        <Typography variant="body1" paragraph>
          We may update our Privacy Policy from time to time. We will notify you of any changes by 
          posting the new Privacy Policy on this page and updating the "Last updated" date.
        </Typography>

        <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
          Contact Us
        </Typography>
        <Typography variant="body1" paragraph>
          If you have any questions about this Privacy Policy, please contact us at:
        </Typography>
        <Typography variant="body1" paragraph>
          Email: bhaskar7676798351@gmail.com
        </Typography>
      </Box>
    </Container>
  );
};

export default PrivacyPolicy; 
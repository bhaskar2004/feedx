import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  useTheme,
  Snackbar,
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  Send as SendIcon,
} from '@mui/icons-material';
import '../styles/global.css';

const Contact = () => {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.email.trim()) errors.email = 'Email is required';
    if (!formData.subject.trim()) errors.subject = 'Subject is required';
    if (!formData.message.trim()) errors.message = 'Message is required';
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    
    if (Object.keys(errors).length > 0) {
      setSnackbar({
        open: true,
        message: 'Please fill in all required fields',
        severity: 'error',
      });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setSnackbar({
        open: true,
        message: 'Message sent successfully!',
        severity: 'success',
      });

      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    } catch (err) {
      setSnackbar({
        open: true,
        message: err.message || 'Failed to send message',
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  const contactInfo = [
    {
      icon: <EmailIcon sx={{ fontSize: 40 }} />,
      title: 'Email',
      content: 'bhaskar7676798351@gmail.com',
    },
    {
      icon: <PhoneIcon sx={{ fontSize: 40 }} />,
      title: 'Phone',
      content: '+91 7676798351',
    },
    {
      icon: <LocationIcon sx={{ fontSize: 40 }} />,
      title: 'Location',
      content: 'Bengaluru, Karnataka',
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box className="fade-in">
        <Typography variant="h2" component="h1" gutterBottom className="gradient-text">
          Contact Us
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          Get in touch with us. We'd love to hear from you.
        </Typography>
      </Box>

      <Grid container spacing={6} sx={{ mt: 2 }}>
        <Grid item xs={12} md={4}>
          <Box className="slide-in">
            <Typography variant="h4" component="h2" gutterBottom>
              Contact Information
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              Have questions? We're here to help. Send us a message and we'll respond as soon as possible.
            </Typography>
            
            <Grid container spacing={3}>
              {contactInfo.map((info, index) => (
                <Grid item xs={12} key={index}>
                  <Card className="card-hover" sx={{ height: '100%' }}>
                    <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Box sx={{ color: 'primary.main' }}>
                        {info.icon}
                      </Box>
                      <Box>
                        <Typography variant="h6" gutterBottom>
                          {info.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {info.content}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card className="scale-in" sx={{ p: 4 }}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    error={!!validateForm().name}
                    helperText={validateForm().name}
                    disabled={loading}
                    className="input-focus"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={!!validateForm().email}
                    helperText={validateForm().email}
                    disabled={loading}
                    className="input-focus"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    error={!!validateForm().subject}
                    helperText={validateForm().subject}
                    disabled={loading}
                    className="input-focus"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    multiline
                    rows={4}
                    label="Message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    error={!!validateForm().message}
                    helperText={validateForm().message}
                    disabled={loading}
                    className="input-focus"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    className="button-hover"
                    endIcon={loading ? <CircularProgress size={20} className="loading-spinner" /> : <SendIcon />}
                    disabled={loading}
                    sx={{ 
                      px: 4,
                      py: 1.5,
                    }}
                  >
                    {loading ? 'Sending...' : 'Send Message'}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Card>
        </Grid>
      </Grid>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        className="fade-in"
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Contact; 
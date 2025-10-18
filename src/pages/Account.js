import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  Divider,
  Snackbar,
  Alert,
} from '@mui/material';
import { Settings as SettingsIcon } from '@mui/icons-material';
import axios from 'axios';

const Account = () => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    isFirstLogin: true
  });

  const [errors, setErrors] = useState({});

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.isFirstLogin && !formData.currentPassword) {
      newErrors.currentPassword = 'Current password is required';
    }
    
    if (!formData.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters long';
    }
    
    if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await axios.put('http://localhost:5000/api/account', {
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
        isFirstLogin: formData.isFirstLogin
      });

      setSnackbar({
        open: true,
        message: 'Password updated successfully',
        severity: 'success'
      });
      
      if (formData.isFirstLogin) {
        setFormData(prev => ({
          ...prev,
          isFirstLogin: false,
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        }));
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.response?.data?.message || 'Failed to update password',
        severity: 'error'
      });
    }
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
        <Paper elevation={3} sx={{ p: 4, background: 'rgba(255, 255, 255, 0.03)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <SettingsIcon sx={{ fontSize: 30, mr: 2, color: '#ffffff' }} />
          <Typography variant="h4" component="h1" sx={{ color: '#ffffff' }}>
            Account Settings
          </Typography>
        </Box>

        <Typography variant="subtitle1" sx={{ color: 'rgba(255, 255, 255, 0.7)' }} gutterBottom>
          {formData.isFirstLogin ? 'Set your password for the first time' : 'Change your password'}
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          {!formData.isFirstLogin && (
            <TextField
              fullWidth
              label="Current Password"
              name="currentPassword"
              type="password"
              value={formData.currentPassword}
              onChange={handleChange}
              error={!!errors.currentPassword}
              helperText={errors.currentPassword}
              margin="normal"
            />
          )}
          
          <TextField
            fullWidth
            label="New Password"
            name="newPassword"
            type="password"
            value={formData.newPassword}
            onChange={handleChange}
            error={!!errors.newPassword}
            helperText={errors.newPassword}
            margin="normal"
          />
          
          <TextField
            fullWidth
            label="Confirm New Password"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
            margin="normal"
          />
          
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            sx={{ mt: 3 }}
          >
            {formData.isFirstLogin ? 'Set Password' : 'Update Password'}
          </Button>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom sx={{ color: '#ffffff' }}>
              Notification Preferences
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body1" sx={{ mb: 2, color: 'rgba(255, 255, 255, 0.8)' }}>
                Choose how you want to receive notifications:
              </Typography>
              <Button
                variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
              >
                Email Notifications
              </Button>
              <Button
                variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
              >
                Push Notifications
              </Button>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        <Box>
          <Typography variant="h6" gutterBottom sx={{ color: '#ffffff' }}>
            Account Deletion
          </Typography>
          <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }} paragraph>
            Once you delete your account, there is no going back. Please be certain.
          </Typography>
          <Button
            variant="outlined"
            color="error"
          >
            Delete Account
          </Button>
        </Box>
      </Paper>
      
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
      >
        <Alert
          onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
      </Container>
    </Box>
  );
};

export default Account; 
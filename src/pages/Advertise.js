import React from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Button,
  Paper,
  useTheme,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  Group as GroupIcon,
  Timeline as TimelineIcon,
  CheckCircle as CheckCircleIcon,
  Campaign as CampaignIcon,
  DevicesOther as DevicesIcon,
  AdsClick as AdsClickIcon,
} from '@mui/icons-material';

const Advertise = () => {
  const theme = useTheme();

  const adPackages = [
    {
      title: "Starter Package",
      price: "$500/month",
      features: [
        "Banner ad placement",
        "1 sponsored article",
        "Social media promotion",
        "Monthly performance report",
      ],
    },
    {
      title: "Professional Package",
      price: "$1,000/month",
      features: [
        "Premium banner placement",
        "2 sponsored articles",
        "Social media campaign",
        "Newsletter feature",
        "Detailed analytics",
      ],
    },
    {
      title: "Enterprise Package",
      price: "Custom pricing",
      features: [
        "Custom ad placements",
        "Unlimited sponsored content",
        "Dedicated campaign manager",
        "Priority support",
        "Advanced analytics",
        "Custom solutions",
      ],
    },
  ];

  const benefits = [
    {
      icon: <GroupIcon />,
      title: "Engaged Audience",
      description: "Reach tech-savvy professionals and enthusiasts",
    },
    {
      icon: <TrendingUpIcon />,
      title: "Growing Platform",
      description: "Access our rapidly expanding user base",
    },
    {
      icon: <TimelineIcon />,
      title: "Measurable Results",
      description: "Track your campaign performance with detailed analytics",
    },
  ];

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
          Advertise With Us
        </Typography>
        <Typography variant="h6">
          Reach your target audience effectively
        </Typography>
      </Paper>

      {/* Why Advertise */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Why Advertise on TechNews?
        </Typography>
        <Typography variant="body1" paragraph>
          Connect with a highly engaged audience of tech professionals, developers, and enthusiasts. 
          Our platform offers targeted advertising solutions to help you reach the right people.
        </Typography>
        
        <Grid container spacing={3} sx={{ mt: 2 }}>
          {benefits.map((benefit, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card 
                sx={{ 
                  height: '100%',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: theme.shadows[4],
                  }
                }}
              >
                <CardContent sx={{ textAlign: 'center' }}>
                  <Box sx={{ color: theme.palette.primary.main, mb: 2 }}>
                    {React.cloneElement(benefit.icon, { sx: { fontSize: 40 } })}
                  </Box>
                  <Typography variant="h6" gutterBottom>
                    {benefit.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {benefit.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Advertising Packages */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Advertising Packages
        </Typography>
        <Grid container spacing={3}>
          {adPackages.map((pkg, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card 
                sx={{ 
                  height: '100%',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: theme.shadows[4],
                  }
                }}
              >
                <CardContent>
                  <Typography variant="h5" gutterBottom align="center">
                    {pkg.title}
                  </Typography>
                  <Typography 
                    variant="h4" 
                    color="primary" 
                    align="center" 
                    sx={{ mb: 3 }}
                  >
                    {pkg.price}
                  </Typography>
                  <List>
                    {pkg.features.map((feature, i) => (
                      <ListItem key={i} sx={{ p: 0, mb: 1 }}>
                        <ListItemIcon sx={{ minWidth: 36 }}>
                          <CheckCircleIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText primary={feature} />
                      </ListItem>
                    ))}
                  </List>
                  <Box sx={{ textAlign: 'center', mt: 3 }}>
                    <Button 
                      variant="contained" 
                      color="primary"
                      sx={{ 
                        px: 4,
                        py: 1,
                        transition: 'transform 0.2s',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                        }
                      }}
                    >
                      Get Started
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Ad Formats */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Advertising Formats
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Box sx={{ color: theme.palette.primary.main, mb: 2, textAlign: 'center' }}>
                  <CampaignIcon sx={{ fontSize: 40 }} />
                </Box>
                <Typography variant="h6" gutterBottom align="center">
                  Display Ads
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Premium banner placements across our website in various sizes
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Box sx={{ color: theme.palette.primary.main, mb: 2, textAlign: 'center' }}>
                  <DevicesIcon sx={{ fontSize: 40 }} />
                </Box>
                <Typography variant="h6" gutterBottom align="center">
                  Sponsored Content
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Native articles and reviews that engage our audience
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Box sx={{ color: theme.palette.primary.main, mb: 2, textAlign: 'center' }}>
                  <AdsClickIcon sx={{ fontSize: 40 }} />
                </Box>
                <Typography variant="h6" gutterBottom align="center">
                  Newsletter Ads
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Reach our subscribers directly in their inbox
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Contact */}
      <Box>
        <Typography variant="h4" component="h2" gutterBottom>
          Get Started
        </Typography>
        <Typography variant="body1" paragraph>
          Ready to start advertising with us? Contact our advertising team to discuss your needs:
        </Typography>
        <Typography variant="body1" paragraph>
          Email: bhaskar7676798351@gmail.com
        </Typography>
        <Typography variant="body1">
          We'll get back to you within 24 hours to discuss your advertising goals and create a 
          custom solution that works for you.
        </Typography>
      </Box>
    </Container>
  );
};

export default Advertise; 
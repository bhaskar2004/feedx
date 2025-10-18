import React from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  useTheme,
  Paper,
  alpha,
} from '@mui/material';
import {
  Code as CodeIcon,
  Rocket as RocketIcon,
  People as PeopleIcon,
  EmojiObjects as IdeaIcon,
  TrendingUp as GrowthIcon,
  Favorite as PassionIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
} from '@mui/icons-material';

const About = () => {
  const theme = useTheme();

  const values = [
    {
      icon: <CodeIcon sx={{ fontSize: 32 }} />,
      title: "Quality Code",
      description: "Writing clean, maintainable, and efficient code that stands the test of time"
    },
    {
      icon: <IdeaIcon sx={{ fontSize: 32 }} />,
      title: "Innovation",
      description: "Embracing new technologies and creative solutions to solve complex problems"
    },
    {
      icon: <PeopleIcon sx={{ fontSize: 32 }} />,
      title: "Collaboration",
      description: "Working together with teams to achieve greater results and shared success"
    },
    {
      icon: <GrowthIcon sx={{ fontSize: 32 }} />,
      title: "Continuous Learning",
      description: "Always growing, adapting, and staying current with industry best practices"
    },
    {
      icon: <RocketIcon sx={{ fontSize: 32 }} />,
      title: "Performance",
      description: "Building fast, responsive applications that deliver exceptional user experiences"
    },
    {
      icon: <PassionIcon sx={{ fontSize: 32 }} />,
      title: "User-Centric",
      description: "Putting users first in every design and development decision"
    }
  ];

  const expertise = [
    {
      category: "Frontend Development",
      items: ["React", "JavaScript", "HTML5", "CSS3", "Responsive Design", "UI/UX Implementation"]
    },
    {
      category: "Backend & Database",
      items: ["Node.js", "RESTful APIs", "MySQL", "Database Design", "Authentication"]
    },
    {
      category: "Tools & Workflow",
      items: ["Git", "VS Code", "Chrome DevTools", "NPM", "Agile Methodology"]
    }
  ];

  const achievements = [
    {
      title: "Hackathon Participation",
      description: "Active participant in multiple hackathons including NextGen 2.0, Code Sprint 2.0, and Aventus 2.0",
      icon: <RocketIcon sx={{ fontSize: 32, color: theme.palette.primary.main }} />
    },
    {
      title: "Project Portfolio",
      description: "Developed diverse projects ranging from management systems to accessibility solutions",
      icon: <CodeIcon sx={{ fontSize: 32, color: theme.palette.secondary.main }} />
    },
    {
      title: "Technical Growth",
      description: "Continuously expanding skillset through hands-on projects and modern development practices",
      icon: <GrowthIcon sx={{ fontSize: 32, color: theme.palette.success.main }} />
    }
  ];

  const contactInfo = [
    {
      icon: <EmailIcon sx={{ fontSize: 24 }} />,
      title: 'Email',
      content: 'bhaskar7676798351@gmail.com',
    },
    {
      icon: <PhoneIcon sx={{ fontSize: 24 }} />,
      title: 'Phone',
      content: '+91 7676798351',
    },
    {
      icon: <LocationIcon sx={{ fontSize: 24 }} />,
      title: 'Location',
      content: 'Bengaluru, Karnataka',
    },
  ];

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
        maxWidth="lg"
        sx={{
          px: { xs: 2, sm: 3, md: 4 },
          py: { xs: 4, md: 6 },
          position: 'relative',
          zIndex: 1,
        }}
      >
      {/* Hero Section */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 4, md: 6 },
          mb: { xs: 6, md: 8 },
          borderRadius: 4,
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            right: 0,
            width: '300px',
            height: '300px',
            background: `radial-gradient(circle, ${alpha(theme.palette.secondary.main, 0.2)} 0%, transparent 70%)`,
            borderRadius: '50%',
            transform: 'translate(30%, -30%)',
          },
        }}
      >
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 700,
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
              letterSpacing: '-0.02em',
              color: '#ffffff',
              mb: 2,
            }}
          >
            About TechNews
          </Typography>
          <Typography
            variant="h6"
            sx={{
              opacity: 0.95,
              fontWeight: 400,
              lineHeight: 1.8,
              maxWidth: '800px',
              color: 'rgba(255, 255, 255, 0.9)',
              fontSize: { xs: '1rem', md: '1.25rem' },
            }}
          >
            Your trusted source for the latest technology news, innovations, and insights.
            We're passionate about bringing you quality content that keeps you informed and inspired.
          </Typography>
        </Box>
      </Paper>

      {/* Mission Statement */}
      <Box sx={{ mb: { xs: 6, md: 8 } }}>
        <Typography
          variant="h4"
          component="h2"
          gutterBottom
          sx={{
            fontWeight: 700,
            mb: 3,
            position: 'relative',
            display: 'inline-block',
            color: '#ffffff',
            fontSize: { xs: '1.75rem', md: '2.125rem' },
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: -12,
              left: 0,
              width: '80px',
              height: '4px',
              background: theme.palette.primary.main,
              borderRadius: '2px',
            }
          }}
        >
          Our Mission
        </Typography>
        <Typography
          variant="body1"
          paragraph
          sx={{
            fontSize: { xs: '1rem', md: '1.125rem' },
            lineHeight: 1.9,
            color: 'rgba(255, 255, 255, 0.85)',
            maxWidth: '900px',
            mt: 4,
          }}
        >
          We strive to deliver comprehensive, accurate, and engaging technology news that empowers our readers
          to stay ahead in the fast-paced digital world. Through careful curation and thoughtful presentation,
          we make complex tech topics accessible and interesting for everyone.
        </Typography>
      </Box>

      {/* Core Values */}
      <Box sx={{ mb: { xs: 6, md: 8 } }}>
        <Typography
          variant="h4"
          component="h2"
          gutterBottom
          sx={{
            fontWeight: 700,
            mb: 3,
            position: 'relative',
            display: 'inline-block',
            color: '#ffffff',
            fontSize: { xs: '1.75rem', md: '2.125rem' },
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: -12,
              left: 0,
              width: '80px',
              height: '4px',
              background: theme.palette.primary.main,
              borderRadius: '2px',
            }
          }}
        >
          What We Value
        </Typography>
        <Grid container spacing={3} sx={{ mt: 2 }}>
          {values.map((value, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card 
                sx={{ 
                  height: '100%',
                  borderRadius: 3,
                  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                  background: 'rgba(30, 30, 30, 0.6)',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: `0 12px 24px ${alpha(theme.palette.common.black, 0.15)}`,
                    background: 'rgba(40, 40, 40, 0.7)',
                    '& .icon-box': {
                      transform: 'scale(1.1) rotate(5deg)',
                    }
                  }
                }}
              >
                <CardContent sx={{ p: 3.5, textAlign: 'center' }}>
                  <Box 
                    className="icon-box"
                    sx={{ 
                      color: theme.palette.primary.main, 
                      mb: 2.5,
                      transition: 'transform 0.3s ease',
                    }}
                  >
                    {value.icon}
                  </Box>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ fontWeight: 600, color: '#ffffff', mb: 1.5, fontSize: '1.125rem' }}
                  >
                    {value.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ lineHeight: 1.8, color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.95rem' }}
                  >
                    {value.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Technical Expertise */}
      <Box sx={{ mb: { xs: 6, md: 8 } }}>
        <Typography
          variant="h4"
          component="h2"
          gutterBottom
          sx={{
            fontWeight: 700,
            mb: 3,
            position: 'relative',
            display: 'inline-block',
            color: '#ffffff',
            fontSize: { xs: '1.75rem', md: '2.125rem' },
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: -12,
              left: 0,
              width: '80px',
              height: '4px',
              background: theme.palette.primary.main,
              borderRadius: '2px',
            }
          }}
        >
          Technical Foundation
        </Typography>
        <Grid container spacing={3} sx={{ mt: 2 }}>
          {expertise.map((expertiseGroup, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card 
                sx={{ 
                  height: '100%',
                  borderRadius: 3,
                  background: 'rgba(30, 30, 30, 0.5)',
                  backdropFilter: 'blur(10px)',
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                }}
              >
                <CardContent sx={{ p: 3.5 }}>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{
                      fontWeight: 600,
                      color: 'rgba(255, 255, 255, 0.95)',
                      mb: 3,
                      fontSize: '1.125rem',
                    }}
                  >
                    {expertiseGroup.category}
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                    {expertiseGroup.items.map((skill, i) => (
                      <Box 
                        key={i}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1.5,
                        }}
                      >
                        <Box
                          sx={{
                            width: 6,
                            height: 6,
                            borderRadius: '50%',
                            bgcolor: theme.palette.primary.main,
                            flexShrink: 0,
                          }}
                        />
                        <Typography variant="body2" sx={{ fontWeight: 500, color: 'rgba(255, 255, 255, 0.85)', fontSize: '0.95rem' }}>
                          {skill}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Achievements */}
      <Box sx={{ mb: { xs: 6, md: 8 } }}>
        <Typography
          variant="h4"
          component="h2"
          gutterBottom
          sx={{
            fontWeight: 700,
            mb: 3,
            position: 'relative',
            display: 'inline-block',
            color: '#ffffff',
            fontSize: { xs: '1.75rem', md: '2.125rem' },
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: -12,
              left: 0,
              width: '80px',
              height: '4px',
              background: theme.palette.primary.main,
              borderRadius: '2px',
            }
          }}
        >
          Highlights
        </Typography>
        <Grid container spacing={3} sx={{ mt: 2 }}>
          {achievements.map((achievement, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card 
                sx={{ 
                  height: '100%',
                  borderRadius: 3,
                  background: 'rgba(30, 30, 30, 0.6)',
                  backdropFilter: 'blur(10px)',
                  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    transform: 'translateY(-6px)',
                    boxShadow: `0 12px 24px ${alpha(theme.palette.common.black, 0.15)}`,
                    background: 'rgba(40, 40, 40, 0.7)',
                  }
                }}
              >
                <CardContent sx={{ p: 3.5 }}>
                  <Box sx={{ mb: 2.5 }}>
                    {achievement.icon}
                  </Box>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ fontWeight: 600, color: '#ffffff', mb: 1.5, fontSize: '1.125rem' }}
                  >
                    {achievement.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ lineHeight: 1.8, color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.95rem' }}
                  >
                    {achievement.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Contact Information */}
      <Box sx={{ mb: { xs: 6, md: 8 } }}>
        <Typography
          variant="h4"
          component="h2"
          gutterBottom
          sx={{
            fontWeight: 700,
            mb: 2,
            position: 'relative',
            display: 'inline-block',
            color: '#ffffff',
            fontSize: { xs: '1.75rem', md: '2.125rem' },
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: -12,
              left: 0,
              width: '80px',
              height: '4px',
              background: theme.palette.primary.main,
              borderRadius: '2px',
            }
          }}
        >
          Contact Information
        </Typography>
        <Typography 
          variant="body1" 
          sx={{ color: 'rgba(255, 255, 255, 0.75)', mb: 4, mt: 4, fontSize: '1rem' }} 
          paragraph
        >
          Have questions? We're here to help. Get in touch with us.
        </Typography>

        <Grid container spacing={3}>
          {contactInfo.map((info, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <Card sx={{ 
                height: '100%',
                borderRadius: 3,
                background: 'rgba(30, 30, 30, 0.6)',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: `0 8px 16px ${alpha(theme.palette.common.black, 0.15)}`,
                  background: 'rgba(40, 40, 40, 0.7)',
                }
              }}>
                <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2, textAlign: 'center', flexDirection: 'column', p: 3.5 }}>
                  <Box sx={{ color: 'primary.main' }}>
                    {info.icon}
                  </Box>
                  <Box>
                    <Typography variant="h6" gutterBottom sx={{ color: '#ffffff', fontSize: '1.125rem', fontWeight: 600 }}>
                      {info.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.95rem' }}>
                      {info.content}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Closing Statement */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 4, md: 5 },
          borderRadius: 4,
          background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.secondary.main, 0.05)} 100%)`,
          border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
          textAlign: 'center',
        }}
      >
        <Typography
          variant="h5"
          gutterBottom
          sx={{ fontWeight: 600, mb: 2.5, color: '#ffffff', fontSize: { xs: '1.5rem', md: '1.75rem' } }}
        >
          Join Our Community
        </Typography>
        <Typography
          variant="body1"
          sx={{
            maxWidth: '700px',
            mx: 'auto',
            lineHeight: 1.9,
            color: 'rgba(255, 255, 255, 0.75)',
            fontSize: { xs: '1rem', md: '1.125rem' },
          }}
        >
          Stay connected with the latest in technology. Whether you're a tech enthusiast, developer,
          or just curious about the digital world, TechNews is here to keep you informed and inspired.
        </Typography>
      </Paper>
      </Container>
    </Box>
  );
};

export default About;
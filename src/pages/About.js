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
  Link,
  Chip,
} from '@mui/material';
import {
  GitHub as GitHubIcon,
  LinkedIn as LinkedInIcon,
  LocationOn as LocationIcon,
  Email as EmailIcon,
  Phone as PhoneIcon
} from '@mui/icons-material';

const About = () => {
  const theme = useTheme();

  const skills = [
    {
      category: "Technical Skills",
      items: ["HTML", "CSS", "JavaScript", "MySQL"]
    },
    {
      category: "Creative Skills",
      items: ["Photography", "Editing"]
    },
    {
      category: "Languages",
      items: ["English", "Kannada", "Telugu", "Hindi"]
    }
  ];

  const projects = [
    {
      title: "Vehicle Registration Management System",
      link: "vehicle-registration-management-system",
      description: "A comprehensive system for managing vehicle registrations"
    },
    {
      title: "Smart Navigation System for the Blind",
      link: "innovative-smart-navigation-systems-for-Empowering-the-Blind",
      description: "Innovative solution to assist visually impaired individuals"
    },
    {
      title: "Weather Bot",
      link: "weather-bot",
      description: "Automated weather information system"
    },
    {
      title: "Memory Keeper",
      link: "memory-keeper",
      description: "Application for preserving and organizing memories"
    }
  ];

  const hackathons = [
    "NextGen 2.0(PES)",
    "Akimi",
    "Code Sprint 2.0(NMIT)",
    "Aventus 2.0(DSCE)"
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Hero Section */}
      <Paper
        elevation={0}
        sx={{
          p: 4,
          mb: 4,
          borderRadius: 2,
          background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
          color: 'white',
        }}
      >
        <Typography variant="h3" component="h1" gutterBottom>
          Bhaskar T
        </Typography>
        <Typography variant="h5" gutterBottom>
          Web Developer
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mt: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <LocationIcon />
            <Typography>2FHX+FM Bengaluru, Karnataka</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <EmailIcon />
            <Typography>bhaskar7676798351@gmail.com</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <PhoneIcon />
            <Typography>7676798351</Typography>
          </Box>
        </Box>
      </Paper>

      {/* Summary */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Summary
        </Typography>
        <Typography variant="body1" paragraph>
          Web developer passionate about creating dynamic, user-friendly applications. Proficient in HTML, CSS, and 
          JavaScript. Skilled in leveraging AI tools like ChatGPT and Claude.ai to enhance web development efficiency and 
          problem-solving. Always eager to learn, take on new challenges, and grow my skills in web development. I enjoy 
          working in teams.
        </Typography>
      </Box>

      {/* Education */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Education
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  B.tech (CSE)
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  SJCIT • 2022-2026
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Pre-University
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  BGS PU College, GowribiDanur
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Schooling & High School
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  BGS Public School, GowribiBanur
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Skills */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Skills
        </Typography>
        <Grid container spacing={3}>
          {skills.map((skillGroup, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {skillGroup.category}
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {skillGroup.items.map((skill, i) => (
                      <Chip 
                        key={i} 
                        label={skill} 
                        color="primary" 
                        variant="outlined"
                        sx={{ '&:hover': { backgroundColor: theme.palette.primary.main, color: 'white' } }}
                      />
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Projects */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Projects
        </Typography>
        <Grid container spacing={3}>
          {projects.map((project, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card 
                sx={{ 
                  height: '100%',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: theme.shadows[8],
                  }
                }}
              >
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {project.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {project.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Hackathons */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Hackathons
        </Typography>
        <Grid container spacing={2}>
          {hackathons.map((hackathon, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Chip 
                label={hackathon}
                color="primary"
                sx={{ 
                  width: '100%',
                  height: 'auto',
                  padding: '16px 8px',
                  '& .MuiChip-label': {
                    whiteSpace: 'normal',
                    textAlign: 'center'
                  }
                }}
              />
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Connect */}
      <Box>
        <Typography variant="h4" component="h2" gutterBottom>
          Connect With Me
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Link 
              href="https://www.linkedin.com/in/bhaskar-t-783aa3331/"
              target="_blank"
              rel="noopener noreferrer"
              underline="none"
            >
              <Card 
                sx={{ 
                  display: 'flex',
                  alignItems: 'center',
                  p: 2,
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: theme.shadows[8],
                  }
                }}
              >
                <LinkedInIcon sx={{ fontSize: 40, color: theme.palette.primary.main, mr: 2 }} />
                <Typography variant="h6">LinkedIn</Typography>
              </Card>
            </Link>
          </Grid>
          <Grid item xs={12} md={6}>
            <Link 
              href="https://github.com/bhaskar2004"
              target="_blank"
              rel="noopener noreferrer"
              underline="none"
            >
              <Card 
                sx={{ 
                  display: 'flex',
                  alignItems: 'center',
                  p: 2,
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: theme.shadows[8],
                  }
                }}
              >
                <GitHubIcon sx={{ fontSize: 40, color: theme.palette.primary.main, mr: 2 }} />
                <Typography variant="h6">GitHub</Typography>
              </Card>
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default About; 
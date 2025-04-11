import React from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Box,
  Divider,
} from '@mui/material';

const teamMembers = [
  {
    name: 'John Doe',
    role: 'Editor-in-Chief',
    bio: 'With over 15 years of experience in tech journalism, John leads our editorial team and ensures the highest quality of content.',
    avatar: 'https://i.pravatar.cc/150?img=1',
  },
  {
    name: 'Jane Smith',
    role: 'Senior Tech Writer',
    bio: 'Specializing in AI and emerging technologies, Jane brings deep technical expertise to our coverage.',
    avatar: 'https://i.pravatar.cc/150?img=2',
  },
  {
    name: 'Mike Johnson',
    role: 'Product Reviewer',
    bio: 'Mike has been reviewing tech products for over a decade, providing honest and detailed analysis.',
    avatar: 'https://i.pravatar.cc/150?img=3',
  },
];

const About = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        About TechNews
      </Typography>

      <Typography variant="body1" paragraph>
        TechNews is your premier destination for the latest in technology news, reviews, and analysis. 
        Founded in 2024, we are committed to providing accurate, insightful, and engaging content about 
        the ever-evolving world of technology.
      </Typography>

      <Typography variant="body1" paragraph>
        Our mission is to keep you informed about the latest developments in technology, from groundbreaking 
        innovations to practical product reviews. We cover a wide range of topics including artificial 
        intelligence, consumer electronics, software development, and emerging tech trends.
      </Typography>

      <Divider sx={{ my: 4 }} />

      <Typography variant="h4" component="h2" gutterBottom>
        Our Team
      </Typography>

      <Grid container spacing={4} sx={{ mt: 2 }}>
        {teamMembers.map((member) => (
          <Grid item xs={12} sm={6} md={4} key={member.name}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
                  <Avatar
                    src={member.avatar}
                    alt={member.name}
                    sx={{ width: 120, height: 120, mb: 2 }}
                  />
                  <Typography variant="h6" component="h3">
                    {member.name}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    {member.role}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {member.bio}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ my: 4 }} />

      <Typography variant="h4" component="h2" gutterBottom>
        Our Values
      </Typography>

      <Grid container spacing={4} sx={{ mt: 2 }}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Accuracy
              </Typography>
              <Typography variant="body2" color="text.secondary">
                We are committed to providing accurate and well-researched information, ensuring our readers 
                can trust our content.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Innovation
              </Typography>
              <Typography variant="body2" color="text.secondary">
                We stay at the forefront of technology, constantly exploring new ways to deliver content 
                and engage with our audience.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Community
              </Typography>
              <Typography variant="body2" color="text.secondary">
                We believe in building a strong community of tech enthusiasts, fostering discussions and 
                sharing knowledge.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default About; 
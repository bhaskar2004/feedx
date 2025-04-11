import React from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  useTheme,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Gavel as GavelIcon,
  Security as SecurityIcon,
  Copyright as CopyrightIcon,
  Policy as PolicyIcon,
  Block as BlockIcon,
  Warning as WarningIcon,
} from '@mui/icons-material';

const TermsOfService = () => {
  const theme = useTheme();

  const sections = [
    {
      icon: <GavelIcon />,
      title: "1. Terms",
      content: `By accessing TechNews, you agree to be bound by these Terms of Service and all applicable laws and regulations. 
      If you do not agree with any of these terms, you are prohibited from using or accessing this site. The materials contained 
      in this website are protected by applicable copyright and trademark law.`
    },
    {
      icon: <SecurityIcon />,
      title: "2. User Accounts",
      content: `When you create an account with us, you must provide accurate and complete information. You are responsible for 
      maintaining the security of your account, and you are fully responsible for all activities that occur under the account. 
      You must notify us immediately of any unauthorized use of your account or any other security breaches.`
    },
    {
      icon: <CopyrightIcon />,
      title: "3. Intellectual Property",
      content: `The Service and its original content (excluding content provided by users), features, and functionality are and will 
      remain the exclusive property of TechNews and its licensors. Our trademarks and trade dress may not be used in connection 
      with any product or service without the prior written consent of TechNews.`
    },
    {
      icon: <PolicyIcon />,
      title: "4. User Content",
      content: `Users may post content as long as it isn't illegal, obscene, threatening, defamatory, invasive of privacy, infringing 
      of intellectual property rights, or otherwise injurious to third parties. We reserve the right to remove content that violates 
      any of these conditions.`
    },
    {
      icon: <BlockIcon />,
      title: "5. Prohibited Activities",
      content: [
        "Violating laws or regulations",
        "Impersonating others or providing false information",
        "Interfering with the proper functioning of the website",
        "Engaging in unauthorized data collection",
        "Uploading malicious software",
        "Spamming or sending unsolicited messages"
      ]
    },
    {
      icon: <WarningIcon />,
      title: "6. Disclaimer",
      content: `The materials on TechNews's website are provided on an 'as is' basis. TechNews makes no warranties, expressed or implied, 
      and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of 
      merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.`
    }
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
          Terms of Service
        </Typography>
        <Typography variant="h6">
          Last updated: {new Date().toLocaleDateString()}
        </Typography>
      </Paper>

      {/* Introduction */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="body1" paragraph>
          Welcome to TechNews. These Terms of Service ("Terms") govern your access to and use of TechNews's website, 
          services, and applications. Please read these Terms carefully before using our services.
        </Typography>
      </Box>

      {/* Terms Sections */}
      {sections.map((section, index) => (
        <Box key={index} sx={{ mb: 6 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Box sx={{ color: theme.palette.primary.main }}>
              {React.cloneElement(section.icon, { sx: { fontSize: 32 } })}
            </Box>
            <Typography variant="h5" component="h2">
              {section.title}
            </Typography>
          </Box>
          
          {Array.isArray(section.content) ? (
            <List>
              {section.content.map((item, i) => (
                <ListItem key={i} sx={{ pl: 0 }}>
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    <BlockIcon color="error" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary={item} />
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography variant="body1" paragraph>
              {section.content}
            </Typography>
          )}
          
          {index < sections.length - 1 && <Divider sx={{ mt: 4 }} />}
        </Box>
      ))}

      {/* Contact Section */}
      <Box sx={{ mt: 8 }}>
        <Typography variant="h5" gutterBottom>
          Contact Us
        </Typography>
        <Typography variant="body1" paragraph>
          If you have any questions about these Terms of Service, please contact us:
        </Typography>
        <Typography variant="body1" paragraph>
          Email: bhaskar7676798351@gmail.com
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 4 }}>
          By using TechNews, you acknowledge that you have read and understood these Terms of Service 
          and agree to be bound by them.
        </Typography>
      </Box>
    </Container>
  );
};

export default TermsOfService; 
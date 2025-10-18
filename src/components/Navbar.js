import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme,
  Box,
  useScrollTrigger,
  Slide,
  Avatar,
  Divider,
} from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import {
  Menu as MenuIcon,
  TrendingUp,
  Category,
} from '@mui/icons-material';
import { styled, alpha } from '@mui/material/styles';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)', // Safari support
  borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)',
    animation: 'liquidFlow 3s ease-in-out infinite',
  },
}));

// Add keyframes for liquid flow animation
const liquidFlowKeyframes = `
  @keyframes liquidFlow {
    0%, 100% {
      left: -100%;
    }
    50% {
      left: 100%;
    }
  }
`;

// Inject keyframes into the document head
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = liquidFlowKeyframes;
  document.head.appendChild(style);
}

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();

  const trigger = useScrollTrigger({
    threshold: 100,
  });

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const navItems = [
    { text: 'Home', path: '/', icon: <TrendingUp /> },
    { text: 'Technology', path: '/category/technology', icon: <Category /> },
    { text: 'Business', path: '/category/business', icon: <Category /> },
    { text: 'Science', path: '/category/science', icon: <Category /> },
    { text: 'Health', path: '/category/health', icon: <Category /> },
    { text: 'Entertainment', path: '/category/entertainment', icon: <Category /> },
    { text: 'Sports', path: '/category/sports', icon: <Category /> },
  ];

  const drawer = (
    <Box sx={{ width: 250 }}>
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
        <Avatar sx={{ bgcolor: theme.palette.primary.main }}>TN</Avatar>
        <Typography variant="h6">Tech News</Typography>
      </Box>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem
            button
            key={item.text}
            component={Link}
            to={item.path}
            onClick={handleDrawerToggle}
            selected={location.pathname === item.path}
            sx={{
              '&.Mui-selected': {
                backgroundColor: alpha(theme.palette.primary.main, 0.1),
              },
            }}
          >
            {item.icon}
            <ListItemText primary={item.text} sx={{ ml: 2 }} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      <StyledAppBar position="sticky">
        <Toolbar>
          {isMobile && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              flexGrow: isMobile ? 0 : 1,
              textDecoration: 'none',
              color: 'rgba(0, 0, 0, 0.8)',
              mr: 2,
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              fontWeight: 700,
              textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
            }}
          >
            <TrendingUp sx={{ color: '#2563eb' }} />
            Tech News
          </Typography>

          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
                <Button
                  component={Link}
                  to="/"
                  sx={{
                    mx: 1,
                    color: 'rgba(0, 0, 0, 0.7)',
                    fontWeight: 500,
                    '&:hover': {
                      color: '#2563eb',
                      backgroundColor: 'rgba(37, 99, 235, 0.1)',
                    },
                    '&.active': {
                      color: '#2563eb',
                      fontWeight: 'bold',
                    },
                  }}
                >
                  Home
                </Button>

                <Button
                  component={Link}
                  to="/about"
                  sx={{
                    mx: 1,
                    color: 'rgba(0, 0, 0, 0.7)',
                    fontWeight: 500,
                    '&:hover': {
                      color: '#2563eb',
                      backgroundColor: 'rgba(37, 99, 235, 0.1)',
                    },
                    '&.active': {
                      color: '#2563eb',
                      fontWeight: 'bold',
                    },
                  }}
                >
                  About
                </Button>

                {navItems.slice(1).map((item) => (
                  <Button
                    key={item.text}
                    component={Link}
                    to={item.path}
                    sx={{
                      mx: 1,
                      color: 'rgba(0, 0, 0, 0.7)',
                      fontWeight: 500,
                      '&:hover': {
                        color: '#2563eb',
                        backgroundColor: 'rgba(37, 99, 235, 0.1)',
                      },
                      '&.active': {
                        color: '#2563eb',
                        fontWeight: 'bold',
                      },
                    }}
                  >
                    {item.text}
                  </Button>
                ))}
              </Box>
            </Box>
          )}

          <Drawer
            anchor="left"
            open={drawerOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
          >
            {drawer}
          </Drawer>
        </Toolbar>
      </StyledAppBar>
    </Slide>
  );
};

export default Navbar; 
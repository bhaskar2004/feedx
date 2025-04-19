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
  background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
  boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
}));

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
              color: 'inherit',
              mr: 2,
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <TrendingUp />
            Tech News
          </Typography>

          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
                <Button
                  component={Link}
                  to="/"
                  color="inherit"
                  sx={{
                    mx: 1,
                    '&.active': {
                      color: 'primary.main',
                      fontWeight: 'bold',
                    },
                  }}
                >
                  Home
                </Button>
                <Button
                  component={Link}
                  to="/search"
                  color="inherit"
                  sx={{
                    mx: 1,
                    '&.active': {
                      color: 'primary.main',
                      fontWeight: 'bold',
                    },
                  }}
                >
                  Search
                </Button>
                <Button
                  component={Link}
                  to="/about"
                  color="inherit"
                  sx={{
                    mx: 1,
                    '&.active': {
                      color: 'primary.main',
                      fontWeight: 'bold',
                    },
                  }}
                >
                  About
                </Button>
                <Button
                  component={Link}
                  to="/contact"
                  color="inherit"
                  sx={{
                    mx: 1,
                    '&.active': {
                      color: 'primary.main',
                      fontWeight: 'bold',
                    },
                  }}
                >
                  Contact
                </Button>
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
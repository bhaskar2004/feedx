import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme,
  Box,
  useScrollTrigger,
  Slide,
} from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import {
  TrendingUp,
  Category,
  Business as BusinessIcon,
  Science as ScienceIcon,
  HealthAndSafety,
  Movie,
  SportsBasketball,
  ChevronRight,
  Close,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
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

const liquidFlowKeyframes = `
  @keyframes liquidFlow {
    0%, 100% {
      left: -100%;
    }
    50% {
      left: 100%;
    }
  }

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;

if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = liquidFlowKeyframes;
  document.head.appendChild(style);
}

const BurgerButton = ({ onClick, isOpen }) => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <button
      onClick={onClick}
      className="relative z-50 p-2 rounded-lg hover:bg-white/10 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50"
      aria-label="Toggle menu"
      style={{
        border: 'none',
        background: 'transparent',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div className="relative w-6 h-6" style={{ width: '24px', height: '24px' }}>
        <span
          style={{
            position: 'absolute',
            display: 'block',
            width: '24px',
            height: '2px',
            backgroundColor: '#2563eb',
            transition: 'all 0.3s ease-in-out',
            transform: isOpen ? 'rotate(45deg)' : 'rotate(0)',
            top: isOpen ? '11px' : '4px',
          }}
        />
        <span
          style={{
            position: 'absolute',
            display: 'block',
            width: '24px',
            height: '2px',
            backgroundColor: '#2563eb',
            top: '11px',
            transition: 'all 0.3s ease-in-out',
            opacity: isOpen ? 0 : 1,
          }}
        />
        <span
          style={{
            position: 'absolute',
            display: 'block',
            width: '24px',
            height: '2px',
            backgroundColor: '#2563eb',
            transition: 'all 0.3s ease-in-out',
            transform: isOpen ? 'rotate(-45deg)' : 'rotate(0)',
            top: isOpen ? '11px' : '18px',
          }}
        />
      </div>
    </button>
  </Box>
);

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
    { text: 'Business', path: '/category/business', icon: <BusinessIcon /> },
    { text: 'Science', path: '/category/science', icon: <ScienceIcon /> },
    { text: 'Health', path: '/category/health', icon: <HealthAndSafety /> },
    { text: 'Entertainment', path: '/category/entertainment', icon: <Movie /> },
    { text: 'Sports', path: '/category/sports', icon: <SportsBasketball /> },
  ];

  const drawer = (
    <Box
      sx={{
        width: 320,
        maxWidth: '85vw',
        height: '100%',
        background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Menu Header */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
          p: 3,
          color: 'white',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            Menu
          </Typography>
          <Box
            component="button"
            onClick={handleDrawerToggle}
            sx={{
              p: 1,
              borderRadius: 1,
              border: 'none',
              background: 'rgba(255, 255, 255, 0.1)',
              color: 'white',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              '&:hover': {
                background: 'rgba(255, 255, 255, 0.2)',
              },
            }}
          >
            <Close />
          </Box>
        </Box>
        <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
          Explore the latest news
        </Typography>
      </Box>

      {/* Menu Items */}
      <List sx={{ flex: 1, overflowY: 'auto', py: 2 }}>
        {navItems.map((item, index) => (
          <ListItem
            button
            key={item.text}
            component={Link}
            to={item.path}
            onClick={handleDrawerToggle}
            selected={location.pathname === item.path}
            sx={{
              color: 'white',
              px: 3,
              py: 2,
              borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
              animation: drawerOpen ? `slideIn 0.3s ease-out ${index * 0.05}s both` : 'none',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
              '&.Mui-selected': {
                backgroundColor: 'rgba(37, 99, 235, 0.2)',
                borderLeft: '4px solid #2563eb',
              },
            }}
          >
            <Box
              sx={{
                p: 1,
                borderRadius: 1.5,
                background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.2), rgba(124, 58, 237, 0.2))',
                display: 'flex',
                alignItems: 'center',
                mr: 2,
                transition: 'all 0.2s',
                '.MuiListItem-root:hover &': {
                  background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.3), rgba(124, 58, 237, 0.3))',
                },
              }}
            >
              {item.icon}
            </Box>
            <ListItemText
              primary={item.text}
              primaryTypographyProps={{
                fontWeight: 500,
              }}
            />
            <ChevronRight
              sx={{
                opacity: 0.5,
                transition: 'all 0.2s',
                '.MuiListItem-root:hover &': {
                  opacity: 1,
                  transform: 'translateX(4px)',
                },
              }}
            />
          </ListItem>
        ))}
      </List>

      {/* Menu Footer */}
      <Box
        sx={{
          p: 3,
          background: 'linear-gradient(to top, #0f172a, transparent)',
          textAlign: 'center',
        }}
      >
        <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
          © 2024 Tech News. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );

  return (
    <>
      <Slide appear={false} direction="down" in={!trigger}>
        <StyledAppBar position="sticky">
          <Toolbar sx={{ alignItems: 'center' }}>
            <Typography
              variant="h6"
              component={Link}
              to="/"
              sx={{
                flexGrow: 1,
                textDecoration: 'none',
                color: 'rgba(0, 0, 0, 0.8)',
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
                <Button
                  component={Link}
                  to="/"
                  sx={{
                    mx: 1,
                    color: location.pathname === '/' ? '#2563eb' : 'rgba(0, 0, 0, 0.7)',
                    fontWeight: location.pathname === '/' ? 700 : 500,
                    '&:hover': {
                      color: '#2563eb',
                      backgroundColor: 'rgba(37, 99, 235, 0.1)',
                    },
                  }}
                >
                  Home
                </Button>

                {navItems.slice(1).map((item) => (
                  <Button
                    key={item.text}
                    component={Link}
                    to={item.path}
                    sx={{
                      mx: 1,
                      color: location.pathname === item.path ? '#2563eb' : 'rgba(0, 0, 0, 0.7)',
                      fontWeight: location.pathname === item.path ? 700 : 500,
                      '&:hover': {
                        color: '#2563eb',
                        backgroundColor: 'rgba(37, 99, 235, 0.1)',
                      },
                    }}
                  >
                    {item.text}
                  </Button>
                ))}
              </Box>
            )}

            {isMobile && (
              <BurgerButton onClick={handleDrawerToggle} isOpen={drawerOpen} />
            )}
          </Toolbar>
        </StyledAppBar>
      </Slide>

      {/* Overlay */}
      {isMobile && (
        <Box
          onClick={handleDrawerToggle}
          sx={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(4px)',
            zIndex: 1200,
            transition: 'opacity 0.3s',
            opacity: drawerOpen ? 1 : 0,
            pointerEvents: drawerOpen ? 'auto' : 'none',
          }}
        />
      )}

      {/* Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        PaperProps={{
          sx: {
            backgroundColor: 'transparent',
            boxShadow: 'none',
          },
        }}
        sx={{
          '& .MuiDrawer-paper': {
            transition: 'transform 0.3s ease-in-out !important',
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar;

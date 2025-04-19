import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Box } from '@mui/material';
import Navbar from './Navbar';
import Footer from './Footer';
import Home from '../pages/Home';
import Category from '../pages/Category';
import Search from '../pages/Search';
import About from '../pages/About';
import Article from '../pages/Article';
import Author from '../pages/Author';
import Contact from '../pages/Contact';
import Profile from '../pages/Profile';
import Account from '../pages/Account';
import ScrollToTop from './ScrollToTop';

function AppContent() {
  const location = useLocation();
  const isProfileOrAccountPage = location.pathname === '/profile' || location.pathname === '/account';

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category/:category" element={<Category />} />
            <Route path="/search" element={<Search />} />
            <Route path="/about" element={<About />} />
            <Route path="/article/:id" element={<Article />} />
            <Route path="/author/:id" element={<Author />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/account" element={<Account />} />
          </Routes>
        </Box>
        {!isProfileOrAccountPage && <Footer />}
      </Box>
    </>
  );
}

export default AppContent; 
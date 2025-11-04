const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const path = require('path');
const fetch = require('node-fetch');
const axios = require('axios');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration
const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:3001', 'https://technews-updates.onrender.com'],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Accept', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Accept', 'Authorization'],
  credentials: true
}));

// Add headers for proper MIME types
app.use((req, res, next) => {
  if (req.path.endsWith('.css')) {
    res.header('Content-Type', 'text/css');
  } else if (req.path.endsWith('.js')) {
    res.header('Content-Type', 'application/javascript');
  } else if (req.path.endsWith('.json')) {
    res.header('Content-Type', 'application/json');
  } else if (req.path.endsWith('.html')) {
    res.header('Content-Type', 'text/html');
  } else if (req.path.match(/\.(jpg|jpeg|png|gif|ico)$/)) {
    res.header('Content-Type', 'image/' + req.path.split('.').pop());
  }
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use(express.static(path.join(__dirname, '../build')));

// Root route handler
app.get('/', (req, res) => {
  res.json({ message: 'Tech News API is running' });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// News API endpoints
app.get('/api/news', async (req, res) => {
  try {
    const { category = 'technology', country = 'us', q, sortBy = 'publishedAt', language = 'en' } = req.query;
    const apiKey = process.env.NEWS_API_KEY;
    
    if (!apiKey) {
      console.error('NEWS_API_KEY is not set');
      return res.status(500).json({ error: 'News API key is not configured' });
    }

    let url;
    if (q) {
      // If search query is present, use the everything endpoint
      url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(q)}&sortBy=${sortBy}&language=${language}&apiKey=${apiKey}`;
      console.log('Searching news for query:', q);
      console.log('Search URL:', url);
    } else {
      // Otherwise, use the top-headlines endpoint
      url = `https://newsapi.org/v2/top-headlines?category=${category}&country=${country}&apiKey=${apiKey}`;
      console.log('Fetching headlines for category:', category);
    }
    
    console.log('Making API request to:', url);
    const response = await fetch(url);
    const data = await response.json();
    
    if (!response.ok) {
      console.error('News API Error:', data);
      throw new Error(data.message || 'Failed to fetch news');
    }
    
    if (!data.articles || data.articles.length === 0) {
      console.log('No articles found for query:', q || category);
      return res.json({ articles: [] });
    }
    
    console.log(`Found ${data.articles.length} articles`);
    res.json(data);
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({ error: error.message || 'Failed to fetch news' });
  }
});

app.get('/api/everything', async (req, res) => {
  try {
    const { q, page = 1, pageSize = 20 } = req.query;
    const response = await fetch(`https://newsapi.org/v2/everything?q=${q}&page=${page}&pageSize=${pageSize}&apiKey=${process.env.NEWS_API_KEY}`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error searching news:', error);
    res.status(500).json({ error: 'Failed to search news' });
  }
});

app.get('/api/top-headlines', async (req, res) => {
  try {
    const { category, country = 'us', page = 1, pageSize = 10 } = req.query;
    const response = await fetch(`https://newsapi.org/v2/top-headlines?category=${category}&country=${country}&page=${page}&pageSize=${pageSize}&apiKey=${process.env.NEWS_API_KEY}`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching top headlines:', error);
    res.status(500).json({ error: 'Failed to fetch top headlines' });
  }
});

// Create transporter for sending emails
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO,
      subject: `Contact Form: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

// Profile endpoints
app.get('/api/profile', (req, res) => {
  // In a real application, you would fetch this from a database
  const profile = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    location: 'New York, USA',
    memberSince: 'January 2024',
    lastLogin: new Date().toISOString(),
  };
  res.json(profile);
});

app.put('/api/profile', (req, res) => {
  try {
    const { name, email, location } = req.body;
    
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    // In a real application, you would save this to a database
    const updatedProfile = {
      name,
      email,
      location: location || 'Not specified',
      memberSince: 'January 2024',
      lastLogin: new Date().toISOString(),
    };

    res.json({
      message: 'Profile updated successfully',
      profile: updatedProfile
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`API available at http://localhost:${PORT}/api/news`);
}); 
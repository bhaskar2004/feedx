const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const path = require('path');
const axios = require('axios');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration
app.use(cors({
  origin: [
    'http://localhost:3000', 
    'http://localhost:3001', 
    'http://localhost:3002', 
    'https://technews-updates.onrender.com'
  ],
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

// API Routes MUST come BEFORE static files
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
      url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(q)}&sortBy=${sortBy}&language=${language}&apiKey=${apiKey}`;
      console.log('Searching news for query:', q);
    } else {
      url = `https://newsapi.org/v2/top-headlines?category=${category}&country=${country}&apiKey=${apiKey}`;
      console.log('Fetching headlines for category:', category);
    }
    
    console.log('Making API request to:', url);
    const response = await axios.get(url);
    const data = response.data;
    
    if (response.status !== 200) {
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
    const response = await axios.get(`https://newsapi.org/v2/everything?q=${q}&page=${page}&pageSize=${pageSize}&apiKey=${process.env.NEWS_API_KEY}`);
    res.json(response.data);
  } catch (error) {
    console.error('Error searching news:', error);
    res.status(500).json({ error: 'Failed to search news' });
  }
});

app.get('/api/top-headlines', async (req, res) => {
  try {
    const { category, country = 'us', page = 1, pageSize = 10 } = req.query;
    const response = await axios.get(`https://newsapi.org/v2/top-headlines?category=${category}&country=${country}&page=${page}&pageSize=${pageSize}&apiKey=${process.env.NEWS_API_KEY}`);
    res.json(response.data);
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

// Image proxy endpoint - to bypass CORS issues with external images
app.get('/api/proxy-image', async (req, res) => {
  try {
    const { url } = req.query;
    
    if (!url) {
      return res.status(400).json({ error: 'URL parameter is required' });
    }

    console.log('Proxying image:', url);

    const response = await axios.get(url, {
      responseType: 'arraybuffer',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Referer': 'https://www.google.com/',
        'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8'
      },
      timeout: 10000 // 10 second timeout
    });

    const contentType = response.headers['content-type'] || 'image/jpeg';
    res.set('Content-Type', contentType);
    res.set('Cache-Control', 'public, max-age=86400'); // Cache for 1 day
    res.set('Access-Control-Allow-Origin', '*');
    res.send(response.data);
  } catch (error) {
    console.error('Error proxying image:', error.message);
    // Send a 1x1 transparent pixel as fallback
    const transparentPixel = Buffer.from('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', 'base64');
    res.set('Content-Type', 'image/gif');
    res.set('Cache-Control', 'public, max-age=3600');
    res.status(200).send(transparentPixel);
  }
});

// Static files - MUST come AFTER API routes
app.use(express.static(path.join(__dirname, '../build')));

// Catch-all route - serves React app for any route not handled above
// This MUST be the last route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`API available at /api/news`);
});
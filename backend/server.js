const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const path = require('path');
const axios = require('axios');
const compression = require('compression');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const NodeCache = require('node-cache');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize cache (5 minute TTL)
const cache = new NodeCache({ stdTTL: 300, checkperiod: 60 });

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      connectSrc: ["'self'", "https://technews-updates.onrender.com"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:", "http:"],
      scriptSrc: ["'self'"],
    },
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  }
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    error: 'Too many requests from this IP, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// Compression middleware
app.use(compression());

// CORS configuration
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:3002',
    'https://technews-updates.onrender.com',
    'https://feedx.bhaskar.xyz'
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

    // Input validation
    if (q && (typeof q !== 'string' || q.length > 100)) {
      return res.status(400).json({ error: 'Invalid search query' });
    }
    if (category && !['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology', 'indian'].includes(category)) {
      return res.status(400).json({ error: 'Invalid category' });
    }

    const apiKey = process.env.NEWS_API_KEY;
    if (!apiKey) {
      console.error('NEWS_API_KEY is not set');
      return res.status(500).json({ error: 'Service temporarily unavailable' });
    }

    // Create cache key
    const cacheKey = `news_${category}_${country}_${q || ''}_${sortBy}_${language}`;
    const cachedData = cache.get(cacheKey);
    if (cachedData) {
      return res.json(cachedData);
    }

    let url;
    if (q) {
      url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(q)}&sortBy=${sortBy}&language=${language}&apiKey=${apiKey}`;
    } else if (category === 'indian') {
      url = `https://newsapi.org/v2/everything?q=india&sortBy=${sortBy}&language=en&apiKey=${apiKey}`;
    } else {
      url = `https://newsapi.org/v2/top-headlines?category=${category}&country=${country}&apiKey=${apiKey}`;
    }

    const response = await axios.get(url, { timeout: 10000 });
    const data = response.data;

    if (response.status !== 200) {
      throw new Error('External API error');
    }

    if (!data.articles || data.articles.length === 0) {
      return res.json({ articles: [] });
    }

    // Remove duplicate articles based on URL
    const uniqueArticles = data.articles.filter((article, index, self) =>
      index === self.findIndex(a => a.url === article.url)
    );

    const result = { ...data, articles: uniqueArticles };

    // Cache the result
    cache.set(cacheKey, result);

    res.json(result);
  } catch (error) {
    console.error('Error fetching news:', error.message);
    if (error.code === 'ECONNABORTED') {
      return res.status(504).json({ error: 'Request timeout' });
    }
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

app.get('/api/everything', async (req, res) => {
  try {
    const { q, page = 1, pageSize = 20 } = req.query;

    // Input validation
    if (!q || typeof q !== 'string' || q.length > 100) {
      return res.status(400).json({ error: 'Valid search query required' });
    }
    if (pageSize > 100) {
      return res.status(400).json({ error: 'Page size cannot exceed 100' });
    }

    const cacheKey = `everything_${q}_${page}_${pageSize}`;
    const cachedData = cache.get(cacheKey);
    if (cachedData) {
      return res.json(cachedData);
    }

    const response = await axios.get(`https://newsapi.org/v2/everything?q=${encodeURIComponent(q)}&page=${page}&pageSize=${pageSize}&apiKey=${process.env.NEWS_API_KEY}`, { timeout: 10000 });
    cache.set(cacheKey, response.data);
    res.json(response.data);
  } catch (error) {
    console.error('Error searching news:', error.message);
    res.status(500).json({ error: 'Failed to search news' });
  }
});

app.get('/api/top-headlines', async (req, res) => {
  try {
    const { category, country = 'us', page = 1, pageSize = 10 } = req.query;

    // Input validation
    if (category && !['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'].includes(category)) {
      return res.status(400).json({ error: 'Invalid category' });
    }
    if (pageSize > 100) {
      return res.status(400).json({ error: 'Page size cannot exceed 100' });
    }

    const cacheKey = `headlines_${category || 'all'}_${country}_${page}_${pageSize}`;
    const cachedData = cache.get(cacheKey);
    if (cachedData) {
      return res.json(cachedData);
    }

    const response = await axios.get(`https://newsapi.org/v2/top-headlines?category=${category}&country=${country}&page=${page}&pageSize=${pageSize}&apiKey=${process.env.NEWS_API_KEY}`, { timeout: 10000 });
    cache.set(cacheKey, response.data);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching top headlines:', error.message);
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

    // Input validation and sanitization
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    if (name.length > 100 || email.length > 100 || subject.length > 200 || message.length > 1000) {
      return res.status(400).json({ error: 'Input data too long' });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    const sanitizedName = name.replace(/[<>\"&]/g, '');
    const sanitizedSubject = subject.replace(/[<>\"&]/g, '');
    const sanitizedMessage = message.replace(/[<>\"&]/g, '');

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO,
      subject: `Contact Form: ${sanitizedSubject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${sanitizedName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${sanitizedSubject}</p>
        <p><strong>Message:</strong></p>
        <p>${sanitizedMessage.replace(/\n/g, '<br>')}</p>
      `
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error.message);
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

    // Input validation
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }
    if (name.length > 100 || email.length > 100 || (location && location.length > 100)) {
      return res.status(400).json({ error: 'Input data too long' });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    const sanitizedName = name.replace(/[<>\"&]/g, '');
    const sanitizedLocation = location ? location.replace(/[<>\"&]/g, '') : 'Not specified';

    const updatedProfile = {
      name: sanitizedName,
      email,
      location: sanitizedLocation,
      memberSince: 'January 2024',
      lastLogin: new Date().toISOString(),
    };

    res.json({
      message: 'Profile updated successfully',
      profile: updatedProfile
    });
  } catch (error) {
    console.error('Error updating profile:', error.message);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

// Image proxy endpoint - to bypass CORS issues with external images
app.get('/api/proxy-image', async (req, res) => {
  try {
    const { url } = req.query;

    // Input validation
    if (!url) {
      return res.status(400).json({ error: 'URL parameter is required' });
    }
    if (typeof url !== 'string' || url.length > 2000) {
      return res.status(400).json({ error: 'Invalid URL' });
    }

    // Basic URL validation
    try {
      new URL(url);
    } catch {
      return res.status(400).json({ error: 'Invalid URL format' });
    }

    // Check cache first
    const cacheKey = `image_${url}`;
    const cachedImage = cache.get(cacheKey);
    if (cachedImage) {
      res.set('Content-Type', cachedImage.contentType);
      res.set('Cache-Control', 'public, max-age=86400');
      res.set('Access-Control-Allow-Origin', '*');
      return res.send(cachedImage.data);
    }

    const response = await axios.get(url, {
      responseType: 'arraybuffer',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Referer': 'https://www.google.com/',
        'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8'
      },
      timeout: 10000,
      maxContentLength: 10 * 1024 * 1024 // 10MB limit
    });

    const contentType = response.headers['content-type'] || 'image/jpeg';
    if (!contentType.startsWith('image/')) {
      return res.status(400).json({ error: 'URL does not point to an image' });
    }

    // Cache the image
    cache.set(cacheKey, {
      data: response.data,
      contentType: contentType
    }, 86400); // Cache for 24 hours

    res.set('Content-Type', contentType);
    res.set('Cache-Control', 'public, max-age=86400');
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
  // console.log(`Server is running on port ${PORT}`);
  // console.log(`API available at /api/news`);
});
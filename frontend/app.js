const express = require('express');
const app = express();
const shortid = require('shortid');
const cors = require('cors');
const moment = require('moment');

app.use(cors());
app.use(express.json());

const urls = {};
const stats = {};

// Middleware for logging
app.use((req, res, next) => {
  console.log([${new Date().toISOString()}] ${req.method} ${req.url});
  next();
});

// Create Short URL
app.post('/shorten', (req, res) => {
  const { longUrl, preferredCode, validityMinutes = 30 } = req.body;
  const code = preferredCode || shortid.generate();

  if (urls[code]) {
    return res.status(400).json({ error: 'Shortcode already exists' });
  }

  const now = Date.now();
  const expiry = now + validityMinutes * 60 * 1000;

  urls[code] = { longUrl, createdAt: now, expiry };
  stats[code] = [];

  res.json({ shortUrl: http://localhost:3000/${code}, expiry });
});

// Redirect Handler
app.get('/:code', (req, res) => {
  const code = req.params.code;
  const entry = urls[code];

  if (!entry || Date.now() > entry.expiry) {
    return res.status(404).send('Link expired or not found.');
  }

  stats[code].push({
    time: new Date().toISOString(),
    referer: req.get('Referer') || 'Direct',
    location: req.ip // optionally use geoIP for better granularity
  });

  res.redirect(entry.longUrl);
});

// Stats Endpoint
app.get('/stats', (req, res) => {
  const result = Object.entries(urls).map(([code, data]) => ({
    code,
    originalUrl: data.longUrl,
    expiry: data.expiry,
    createdAt: data.createdAt,
    clicks: stats[code]?.length || 0,
    clickDetails: stats[code] || []
  }));
  res.json(result);
});

app.listen(5000, () => console.log('Server running on port 5000'));

import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Typography, Box, List, ListItem } from '@mui/material';
import axios from 'axios';

const App = () => {
  const [urls, setUrls] = useState([{ longUrl: '', code: '', validity: '' }]);
  const [shortened, setShortened] = useState([]);
  const [stats, setStats] = useState([]);

  const handleChange = (index, field, value) => {
    const newUrls = [...urls];
    newUrls[index][field] = value;
    setUrls(newUrls);
  };

  const addInput = () => {
    if (urls.length < 5) {
      setUrls([...urls, { longUrl: '', code: '', validity: '' }]);
    }
  };

  const shorten = async () => {
    const results = [];
    for (const { longUrl, code, validity } of urls) {
      try {
        const res = await axios.post('http://localhost:5000/shorten', {
          longUrl, preferredCode: code, validityMinutes: Number(validity) || 30
        });
        results.push(res.data);
      } catch (err) {
        results.push({ error: err.response?.data?.error || 'Error' });
      }
    }
    setShortened(results);
  };

  const loadStats = async () => {
    const res = await axios.get('http://localhost:5000/stats');
    setStats(res.data);
  };

  useEffect(() => {
    loadStats();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>URL Shortener</Typography>
      {urls.map((url, idx) => (
        <Box key={idx} sx={{ mb: 2 }}>
          <TextField label="Long URL" fullWidth value={url.longUrl} onChange={e => handleChange(idx, 'longUrl', e.target.value)} sx={{ mb: 1 }} />
          <TextField label="Preferred Code (Optional)" fullWidth value={url.code} onChange={e => handleChange(idx, 'code', e.target.value)} sx={{ mb: 1 }} />
          <TextField label="Validity (mins)" fullWidth value={url.validity} onChange={e => handleChange(idx, 'validity', e.target.value)} />
        </Box>
      ))}
      <Button onClick={addInput}>Add More</Button>
      <Button onClick={shorten} variant="contained" sx={{ ml: 2 }}>Shorten URLs</Button>

      <Typography variant="h6" sx={{ mt: 4 }}>Shortened Links</Typography>
      <List>
        {shortened.map((s, i) => (
          <ListItem key={i}>{s.shortUrl || s.error}</ListItem>
        ))}
      </List>

      <Typography variant="h6" sx={{ mt: 4 }}>Statistics</Typography>
      <List>
        {stats.map((s, i) => (
          <ListItem key={i}>
            <div>
              <strong>{s.code}</strong>: {s.clicks} clicks<br />
              Created at: {new Date(s.createdAt).toLocaleString()} | Expiry: {new Date(s.expiry).toLocaleString()}
              <ul>
                {s.clickDetails.map((click, j) => (
                  <li key={j}>{click.time} - {click.referer} - {click.location}</li>
                ))}
              </ul>
            </div>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default App;import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Typography, Box, List, ListItem } from '@mui/material';
import axios from 'axios';

const App = () => {
  const [urls, setUrls] = useState([{ longUrl: '', code: '', validity: '' }]);
  const [shortened, setShortened] = useState([]);
  const [stats, setStats] = useState([]);

  const handleChange = (index, field, value) => {
    const newUrls = [...urls];
    newUrls[index][field] = value;
    setUrls(newUrls);
  };

  const addInput = () => {
    if (urls.length < 5) {
      setUrls([...urls, { longUrl: '', code: '', validity: '' }]);
    }
  };

  const shorten = async () => {
    const results = [];
    for (const { longUrl, code, validity } of urls) {
      try {
        const res = await axios.post('http://localhost:5000/shorten', {
          longUrl, preferredCode: code, validityMinutes: Number(validity) || 30
        });
        results.push(res.data);
      } catch (err) {
        results.push({ error: err.response?.data?.error || 'Error' });
      }
    }
    setShortened(results);
  };

  const loadStats = async () => {
    const res = await axios.get('http://localhost:5000/stats');
    setStats(res.data);
  };

  useEffect(() => {
    loadStats();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>URL Shortener</Typography>
      {urls.map((url, idx) => (
        <Box key={idx} sx={{ mb: 2 }}>
          <TextField label="Long URL" fullWidth value={url.longUrl} onChange={e => handleChange(idx, 'longUrl', e.target.value)} sx={{ mb: 1 }} />
          <TextField label="Preferred Code (Optional)" fullWidth value={url.code} onChange={e => handleChange(idx, 'code', e.target.value)} sx={{ mb: 1 }} />
          <TextField label="Validity (mins)" fullWidth value={url.validity} onChange={e => handleChange(idx, 'validity', e.target.value)} />
        </Box>
      ))}
      <Button onClick={addInput}>Add More</Button>
      <Button onClick={shorten} variant="contained" sx={{ ml: 2 }}>Shorten URLs</Button>

      <Typography variant="h6" sx={{ mt: 4 }}>Shortened Links</Typography>
      <List>
        {shortened.map((s, i) => (
          <ListItem key={i}>{s.shortUrl || s.error}</ListItem>
        ))}
      </List>

      <Typography variant="h6" sx={{ mt: 4 }}>Statistics</Typography>
      <List>
        {stats.map((s, i) => (
          <ListItem key={i}>
            <div>
              <strong>{s.code}</strong>: {s.clicks} clicks<br />
              Created at: {new Date(s.createdAt).toLocaleString()} | Expiry: {new Date(s.expiry).toLocaleString()}
              <ul>
                {s.clickDetails.map((click, j) => (
                  <li key={j}>{click.time} - {click.referer} - {click.location}</li>
                ))}
              </ul>
            </div>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default App;

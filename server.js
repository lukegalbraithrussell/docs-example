const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Redirect rules
app.use((req, res, next) => {
  // Example redirect - customize these rules as needed
  if (req.path === '/old-docs') {
    return res.redirect(301, '/docs');
  }
  // Add more redirect rules here as needed
  next();
});

// Serve static files from the build directory
app.use(express.static(path.join(__dirname, 'build')));

// Handle client-side routing - send all requests to index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
}); 
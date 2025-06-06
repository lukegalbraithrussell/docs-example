const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

// Load redirect rules from JSON file
const redirects = JSON.parse(fs.readFileSync(path.join(__dirname, 'redirects.json'), 'utf8'));

// Redirect middleware
app.use((req, res, next) => {
  const path = req.path;
  
  // Check exact matches first
  if (redirects[path]) {
    return res.redirect(301, redirects[path]);
  }
  
  // Check wildcard matches
  for (const [source, target] of Object.entries(redirects)) {
    if (source.includes('*')) {
      const pattern = new RegExp('^' + source.replace('*', '(.*)') + '$');
      const match = path.match(pattern);
      if (match) {
        const splat = match[1];
        return res.redirect(301, target.replace(':splat', splat));
      }
    }
  }
  
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
  console.log('Loaded redirects:', redirects);
}); 
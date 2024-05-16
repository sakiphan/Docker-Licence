const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static('public'));

// Check license
const checkLicense = async (req, res, next) => {
  try {
    const response = await axios.get('http://license-api:4000/check-license');
    if (response.status === 200) {
      next();
    }
  } catch (error) {
    res.status(403).send('License has expired or invalid IP address.');
  }
};

app.use(checkLicense);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Calculator app is running on port ${port}.`);
});

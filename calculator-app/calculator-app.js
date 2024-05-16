const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static('public'));

// Lisans kontrolü yap
const checkLicense = async (req, res, next) => {
  try {
    const response = await axios.get('http://license-api:4000/check-license');
    if (response.status === 200) {
      next();
    }
  } catch (error) {
    res.status(403).send('Lisans süresi doldu veya geçersiz IP adresi.');
  }
};

app.use(checkLicense);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Hesap makinesi uygulaması ${port} portunda çalışıyor.`);
});

const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 4000;
const LICENSE_DURATION = 30; // 2 dakika = 120 saniye
const startTimeFile = path.join(__dirname, 'start_time.json');

// CORS middleware'i ekle
app.use(cors());

// Başlangıç zamanını oku veya ayarla
const getStartTime = () => {
  try {
    if (fs.existsSync(startTimeFile)) {
      const startTimeContent = fs.readFileSync(startTimeFile, 'utf8').trim();
      if (!startTimeContent || startTimeContent === '{}') {
        const startTime = Date.now() / 1000; // Saniye cinsinden başlangıç zamanı
        const startTimeData = { startTime: startTime.toString() };
        fs.writeFileSync(startTimeFile, JSON.stringify(startTimeData, null, 2));
        console.log('Başlangıç zamanı yazıldı:', startTime);
        return startTime;
      } else {
        const startTimeData = JSON.parse(startTimeContent);
        const startTime = parseFloat(startTimeData.startTime);
        if (isNaN(startTime)) {
          throw new Error('start_time.json dosyası geçersiz veri içeriyor');
        }
        console.log('Başlangıç zamanı okundu:', startTime);
        return startTime;
      }
    } else {
      const startTime = Date.now() / 1000; // Saniye cinsinden başlangıç zamanı
      const startTimeData = { startTime: startTime.toString() };
      fs.writeFileSync(startTimeFile, JSON.stringify(startTimeData, null, 2));
      console.log('Başlangıç zamanı yazıldı:', startTime);
      return startTime;
    }
  } catch (error) {
    console.error('Dosya yazma veya okuma hatası:', error);
    throw error;
  }
};

// Lisans kontrol fonksiyonu
const checkLicense = (req, res) => {
  try {
    const startTime = getStartTime();
    const currentTime = Date.now() / 1000; // Saniye cinsinden mevcut zaman
    const elapsedTime = currentTime - startTime;

    if (isNaN(elapsedTime)) {
      res.status(500).send('Başlangıç zamanı düzgün okunamadı.');
      return;
    }

    if (elapsedTime > LICENSE_DURATION) {
      res.status(403).send('Lisans süresi doldu.');
    } else {
      res.status(200).send('Lisans geçerli. Kalan süre: ' + (LICENSE_DURATION - elapsedTime) + ' saniye');
    }
  } catch (error) {
    res.status(500).send('Başlangıç zamanı düzgün okunamadı.');
  }
};

// Lisans kontrolünü gerçekleştir
app.get('/check-license', (req, res) => {
  checkLicense(req, res);
});

app.listen(port, () => {
  console.log(`Lisans API'si ${port} portunda çalışıyor.`);
});

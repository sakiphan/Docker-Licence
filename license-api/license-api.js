const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 4000;
const LICENSE_DURATION = 30; // License duration in seconds
const startTimeFile = path.join(__dirname, 'start_time.json');

// Add CORS middleware
app.use(cors());

// Read or set the start time
const getStartTime = () => {
  try {
    if (fs.existsSync(startTimeFile)) {
      const startTimeContent = fs.readFileSync(startTimeFile, 'utf8').trim();
      if (!startTimeContent || startTimeContent === '{}') {
        const startTime = Date.now() / 1000; // Start time in seconds
        const startTimeData = { startTime: startTime.toString() };
        fs.writeFileSync(startTimeFile, JSON.stringify(startTimeData, null, 2));
        console.log('Start time written:', startTime);
        return startTime;
      } else {
        const startTimeData = JSON.parse(startTimeContent);
        const startTime = parseFloat(startTimeData.startTime);
        if (isNaN(startTime)) {
          throw new Error('start_time.json contains invalid data');
        }
        console.log('Start time read:', startTime);
        return startTime;
      }
    } else {
      const startTime = Date.now() / 1000; // Start time in seconds
      const startTimeData = { startTime: startTime.toString() };
      fs.writeFileSync(startTimeFile, JSON.stringify(startTimeData, null, 2));
      console.log('Start time written:', startTime);
      return startTime;
    }
  } catch (error) {
    console.error('File write or read error:', error);
    throw error;
  }
};

// License check function
const checkLicense = (req, res) => {
  try {
    const startTime = getStartTime();
    const currentTime = Date.now() / 1000; // Current time in seconds
    const elapsedTime = currentTime - startTime;

    if (isNaN(elapsedTime)) {
      res.status(500).send('Start time could not be read properly.');
      return;
    }

    if (elapsedTime > LICENSE_DURATION) {
      res.status(403).send('License has expired.');
    } else {
      res.status(200).send('License is valid. Remaining time: ' + (LICENSE_DURATION - elapsedTime) + ' seconds');
    }
  } catch (error) {
    res.status(500).send('Start time could not be read properly.');
  }
};

// Perform the license check
app.get('/check-license', (req, res) => {
  checkLicense(req, res);
});

app.listen(port, () => {
  console.log(`License API is running on port ${port}.`);
});

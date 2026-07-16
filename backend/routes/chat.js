const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// Save chat message (for history)
router.post('/message', auth, async (req, res) => {
  try {
    const { message, sender } = req.body;
    // For now we just confirm receipt
    // In future this can save to database
    res.json({ 
      success: true, 
      message: 'Message received',
      data: { message, sender, timestamp: new Date() }
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get crisis resources
router.get('/resources', async (req, res) => {
  try {
    const resources = [
      { name: 'Samaritans', phone: '116 123', url: 'https://www.samaritans.org', available: '24/7' },
      { name: 'Shout Crisis Text Line', phone: 'Text SHOUT to 85258', url: 'https://www.giveusashout.org', available: '24/7' },
      { name: 'NHS Talking Therapies', phone: null, url: 'https://www.nhs.uk/mental-health/talking-therapies-medicine-treatments/talking-therapies-and-counselling/nhs-talking-therapies/', available: 'Mon-Fri' },
      { name: 'Student Minds', phone: null, url: 'https://www.studentminds.org.uk', available: 'Mon-Fri' },
      { name: 'Mind UK', phone: '0300 123 3393', url: 'https://www.mind.org.uk', available: 'Mon-Fri 9am-6pm' },
      { name: 'CALM', phone: '0800 58 58 58', url: 'https://www.thecalmzone.net', available: '5pm-midnight' },
    ];
    res.json(resources);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Mood = require('../models/Mood');

// Save mood
router.post('/', auth, async (req, res) => {
  try {
    const { score, label, note } = req.body;

    const mood = new Mood({
      user: req.user.id,
      score,
      label,
      note,
    });

    await mood.save();
    res.json(mood);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get mood history for logged in user
router.get('/history', auth, async (req, res) => {
  try {
    const moods = await Mood.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .limit(30);
    res.json(moods);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get mood stats
router.get('/stats', auth, async (req, res) => {
  try {
    const moods = await Mood.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .limit(7);

    const average = moods.length
      ? (moods.reduce((sum, m) => sum + m.score, 0) / moods.length).toFixed(1)
      : 0;

    res.json({ moods, average, total: moods.length });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
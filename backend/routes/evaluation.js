const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Evaluation = require('../models/Evaluation');

// Submit evaluation - allows multiple submissions
router.post('/', auth, async (req, res) => {
  try {
    const { susScore, susResponses, interviewAnswers, userName, userEmail } = req.body;

    const evaluation = new Evaluation({
      user: req.user.id,
      userName,
      userEmail,
      susScore,
      susResponses,
      interviewAnswers,
    });

    await evaluation.save();
    res.json({ success: true, message: 'Evaluation submitted successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
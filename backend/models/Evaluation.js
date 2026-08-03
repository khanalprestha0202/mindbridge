const mongoose = require('mongoose');

const EvaluationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  userName: String,
  userEmail: String,
  susScore: Number,
  susResponses: [Number],
  interviewAnswers: [String],
  submittedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Evaluation', EvaluationSchema);
const mongoose = require('mongoose');

const EvaluationSchema = new mongoose.Schema({
  participantCode: String,
  susScore: Number,
  susResponses: [Number],
  interviewAnswers: [String],
  submittedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Evaluation', EvaluationSchema);
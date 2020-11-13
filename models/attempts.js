const mongoose = require('mongoose');

const attemptSchema = new mongoose.Schema(
  {
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
    answers: { type: Object, default: {} },
    score: Number,
    scoreText: String,
    completed: { type: Boolean, default: false },
  },
  { timestamps: true },
);

const Attempt = mongoose.model('Attempt', attemptSchema);

module.exports = Attempt;

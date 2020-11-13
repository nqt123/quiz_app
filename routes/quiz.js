const express = require('express');
const router = express.Router();
const axios = require('axios');
const Question = require('../models/questions');
const Attempt = require('../models/attempts');
const { getScore, getScoreText } = require('../utils/score');

let API_URL = process.env.API_URL || 'https://wpr-quiz-api.herokuapp.com';
router.get('/', async (req, res) => {
  try {
    if (!req.query.guest) {
      return res.render('error.ejs', {
        msg: 'You Can Not Go To Direct Routes',
      });
    }
    const questions = await Question.aggregate([{ $sample: { size: 10 } }]);

    const questionsId = questions.map((question) => question._id);
    const newAttempt = await Attempt.create({
      questions: questionsId,
      answers: {}
    });

    return res.redirect(`/quiz/${newAttempt._id}`);
  } catch (error) {
    res.send(error);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const attempt = await Attempt.findById(req.params.id).populate('questions');

    return res.render('quiz', { attempt });
  } catch (error) {
    res.send(error);
  }
});

router.post('/:id', async (req, res) => {
  try {
    const attempt = await Attempt.findById(req.params.id).populate('questions');
    const score = getScore(req.body, attempt.questions);
    const scoreText = getScoreText(score);

    await attempt.update({
      score,
      scoreText,
      answers: req.body,
      completed: true,
    });
    res.render('result', { score, scoreText });
  } catch (error) {
    res.send(error);
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const { name, value } = req.body;
    const attempt = await Attempt.findById(req.params.id);
    const { answers } = attempt;
    const cloneAnswers = { ...answers };
    cloneAnswers[name] = value;
    attempt.answers = cloneAnswers;
    await attempt.save();
    return res.send({ success: true });
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;

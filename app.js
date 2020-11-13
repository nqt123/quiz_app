const { urlencoded } = require('express');
const express = require('express');
require('./db/database');
const app = express();
const quizRoute = require('./routes/quiz');
const fs = require('fs')
const Questions = require('./models/questions');

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use(urlencoded());
app.use(express.json());

app.get('/', async (req, res) => {
    return res.render("index");
});

app.use('/quiz', quizRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
    const questions = await Questions.find({});
    if (questions.length == 0) {
      const rawData = await fs.readFileSync('./data/questions.json');
      const questions = JSON.parse(rawData);
      await Questions.insertMany(questions);
      console.log("Initialized Sample Data");
    }
    console.log(`Server Started At Port ${PORT}`);;
})

process
  .on('unhandledRejection', (reason, p) => {
    console.error(reason, 'Unhandled Rejection at Promise', p);
  })
  .on('uncaughtException', err => {
    console.error(err, 'Uncaught Exception thrown');
    process.exit(1);
  });
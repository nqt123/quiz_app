const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    text: String,
    answers: [],
    correctAnswer: Number
})

questionSchema.methods.toJSON = function () {
    let question = this.toObject();
    delete question.correctAnswer;
    return question;
}

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
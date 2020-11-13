module.exports = {
    getScore: (userAnswer, questions) => {
        let score = 0;
        for (answer in userAnswer) {
            if (userAnswer[answer] == questions[answer].correctAnswer) {
                score++;
            }
        }

        return score;
    },
    getScoreText: (score, questions) => {
        if (score < 5) {
            return 'Practice more to improve it :D';
        }
        if (score < 7) {
            return 'Good, keep up!';
        }
        if (score < 9) {
            return 'Well done!';
        }
        if (score <= 10) {
            return 'Perfect!!';
        }
    }
}
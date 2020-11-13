const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/quiz', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: true
}, () => {
    console.log("Database Connected");
})

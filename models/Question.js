// THIS FILE CONTAINS ALL THE DROPDOWN DATA REQUIRED FOR REGISTRATION
// FOR A NEW STUDENT OR A TEACHER

const mongoose = require('mongoose');


const QuestionSchema = mongoose.Schema({
    questionId: {
        type: String
    },
    question: {
        type: String
    },
    option1: {
        type: String
    },
    option2: {
        type: String
    },
    option3: {
        type: String
    },
    option4: {
        type: String
    },
    answer: {
        type: String
    },
    image: {
        type: String
    }
});

const Question = module.exports = mongoose.model('questions', QuestionSchema);


// module.exports.getAllClasses = (callback) => {
//     Class.find({}, callback);
// }

// module.exports.addSingleClass = (newClass, callback) => {
//     newClass.save(callback);
// }
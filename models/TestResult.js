const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const TestResultSchema = mongoose.Schema({
    testId: {
        type: Schema.Types.ObjectId,
        ref: 'test_List'
    },
    totalAttempted: {
        type: Number
    },
    totalCorrect: {
        type: Number
    },
    totalQuestions: {
        type: Number
    }
    // "totalAttempted": 3,
    // "totalCorrect": 2,
    // "totalQuestions": 3
});


module.exports = TestResultSchema;
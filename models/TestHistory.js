const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const TestHistorySchema = new Schema({
    testId: {
        type: Schema.Types.ObjectId,
        ref: 'test_List'
    },
    testAttempted: [{
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'students'
        },
        totalAttempted: {
            type: Number
        },
        totalCorrect: {
            type: Number
        },
        totalQuestions: {
            type: Number
        },
        testGivenAt: {
            type: String
        }
    }]
});

const TestHistory = mongoose.model('test_history', TestHistorySchema);
module.exports = TestHistory;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SubjectiveTestSchema = mongoose.Schema({
    testTitle: {
        type: String
    },
    total_times_taken: {
        type: Number
    },
    averageScore: {
        type: Number
    },
    totalQuestions: {
        type: Number
    },
    public: {
        type: Boolean
    },
    startTime: {
        type: String
    },
    endTime: {
        type: String
    },
    description: {
        type: String
    },
    class_id: {
        type: Schema.Types.ObjectId,
        ref: 'ClassDetails'
    },
    subject_id: {
        type: Schema.Types.ObjectId,
        ref: 'subjectdetails'
    },
    subject_name: {
        type: String
    },
    institute_id: {
        type: Schema.Types.ObjectId,
        ref: 'InstituteDetails'
    },
    teacher_id: {
        type: Schema.Types.ObjectId,
        ref: 'teachers'
    },
    testAttempted: [{
        type: Schema.Types.ObjectId,
        ref: 'students'
    }],
    questionpdf: {
        type: String
    }
});

const SubjectiveTest = module.exports = mongoose.model('subjective_test',SubjectiveTestSchema );

module.exports.addSubjectiveTest = (newTest, callback) => {
    newTest.save(callback);
}

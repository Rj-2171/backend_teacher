// THIS FILE CONTAINS ALL THE DROPDOWN DATA REQUIRED FOR REGISTRATION
// FOR A NEW STUDENT OR A TEACHER

const mongoose = require('mongoose');
const Question = require('./Question').schema;
const Schema = mongoose.Schema;


const TestListSchema = mongoose.Schema({
    questions: {
        type: [Question],
    },
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
    startDate: {
        type: String
    },
    endDate: {
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
    }]
});

const TestList = module.exports = mongoose.model('test_List', TestListSchema);


module.exports.getAllTestsList = (classID, instituteID, callback) => {
    const query = {
        class_id: classID,
        institute_id: instituteID
    }
    TestList.find(query, callback);
}

module.exports.addSingleTest = (newTest, callback) => {
    newTest.save(callback);
}

module.exports.startSingleTest = (test_id, callback) => {
    // const query = {
    //     _id: test_id
    // }
    // TestList.findOne(query, callback);
    TestList.findById(mongoose.Types.ObjectId(test_id), callback);
}

module.exports.getAnswerList = (test_id, callback) => {
    const query = {
        _id: mongoose.Types.ObjectId(test_id)
    }
    // get only questions from this query...no need to return all the data
    TestList.findById(query, 'questions', callback);
}

module.exports.getTestsListByTeacherId = (teacher_id, callback) => {
    const query = {
        teacher_id: teacher_id
    }
    TestList.find(query, '-questions -__v -institute_id -teacher_id', callback);
}

module.exports.getPublicTest = (class_id, callback) => {
    const query = {
        class_id: class_id,
        public: true
    }
    TestList.find(query, '-questions', callback);
}

// module.exports.getPublicTestForStudents = (user_id,class_id, callback) => {
//     const query = {
//         class_id: class_id,
//         public: true
//     }
//     TestList.find(query, '-questions', callback);
// }
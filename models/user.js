const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;


const Institute = require('./Institute').schema;
const Classes = require('./Classes').schema;
const TestResult = require('./TestResult').schema;
const TestList = require('./TestList');


// USER Schema

const UserSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    userType: {
        type: String,
        required: true
    },
    phoneNo: {
        type: String,
        required: true
    },
    dob: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    parentsName: {
        type: String,
        required: true
    },
    parentsEmail: {
        type: String,
        required: true
    },
    parentsPhNo: {
        type: String,
        required: true
    },
    parentsQual: {
        type: String,
        required: true
    },
    stuClass_id: {
        type: String,
        required: true
    },
    stuInstitute_id: {
        type: String,
        required: true
    },
    medium: {
        type: String,
        required: true
    },
    stuSubjects: {
        type: String,
        required: false
    },
    testHistory: {
        type: [{
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
            },
            testGivenAt: {
                type: Date,
                default: Date.now
            }
            // "totalAttempted": 3,
            // "totalCorrect": 2,
            // "totalQuestions": 3
        }],
        required: false
    }
});

const User = module.exports = mongoose.model('students', UserSchema);


module.exports.getUserById = (id, callback) => {
    User.findById(id, callback);
};

module.exports.getUserByEmail = (email, callback) => {
    const query = {
        email: email
    };
    User.findOne(query, '-__v -testHistory', callback);
};

module.exports.addUser = (newUser, callback) => {
    // bcrypt.genSalt(10, (err, salt) => {
    //     bcrypt.hash(newUser.password, salt, (err, hash) => {
    //         if (err) {
    //             throw err;
    //         }
    //         newUser.password = hash;
    //         newUser.save(callback);
    //     });
    // })
    newUser.save(callback);
};

module.exports.comparePassword = (userPassword, hash, callback) => {
    bcrypt.compare(userPassword, hash, (err, isMatch) => {
        if (err) throw err;
        callback(null, isMatch);
    });
}

module.exports.addTestResult = (studentId, testResult, callback) => {

    const query = {
        _id: mongoose.Types.ObjectId(studentId)
    };
    User.findOneAndUpdate(query, {
        $push: {
            testHistory: testResult
        }
    }, callback);
}

module.exports.getPastTestResults = (user_id, callback) => {
    const query = {
        _id: mongoose.Types.ObjectId(user_id)
    };
    User.findOne(query, 'testHistory').populate({
        path: 'test_lists',
        model: 'TestList',
    }).exec((resolve, result) => {
        console.log(result);
    });


    // User.aggregate([{
    //     $lookup: {
    //         from: 'test_lists',
    //         localField: 'testHistory.testId.str',
    //         foreignField: '_id.str',
    //         as: 'testdetails'
    //     }
    // }], callback);
}
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Qualification = require('./Qualification').schema;
const Institute = require('./Institute').schema;


// USER Schema

const TeacherProfile = mongoose.Schema({
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
    qualification_id: {
        type: String,
        required: true
    },
    institute_id: {
        type: String,
        required: true
    },
    yearOfExp: {
        type: Number,
        required: true
    }
});

const Teacher = module.exports = mongoose.model('teachers', TeacherProfile);


module.exports.getTeacherById = (id, callback) => {
    Teacher.findById(id, callback);
};

module.exports.getTeacherByName = (username, callback) => {
    const query = {
        username: username
    };
    Teacher.findOne(query, callback);
};

module.exports.getTeacherByEmail = (email, callback) => {
    const query = {
        email: email
    };
    Teacher.findOne(query, '-__v', callback);
};

module.exports.addTeacher = (newTeacher, callback) => {
    // bcrypt.genSalt(10, (err, salt) => {
    //     bcrypt.hash(newUser.password, salt, (err, hash) => {
    //         if (err) {
    //             throw err;
    //         }
    //         newUser.password = hash;
    //         newUser.save(callback);
    //     });
    // })
    newTeacher.save(callback);
};

module.exports.comparePassword = (userPassword, hash, callback) => {
    bcrypt.compare(userPassword, hash, (err, isMatch) => {
        if (err) throw err;
        callback(null, isMatch);
    });
}
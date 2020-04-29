const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const UserLoginSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    userType: {
        type: String,
        required: true
    }
});

const UserLogin = module.exports = mongoose.model('LoginDetails', UserLoginSchema);


// GET THE USERLOGIN DETAILS BY ID
module.exports.getLoginDetailsById = (id, callback) => {
    UserLogin.findById(id, callback);
};

// GET THE USERLOGIN DETAILS BY EMAIL
module.exports.getLoginDetailsByEmail = (email, callback) => {
    const query = {
        email: email
    };

    UserLogin.findOne(query, callback);
}

// ADDS LOGIN CREDENTIAL TO USERLOGIN COLLECTION
module.exports.addLoginDetails = (newUser, callback) => {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) {
                throw err;
            }
            newUser.password = hash;
            newUser.save(callback);
        });
    });
};

// CHECK WHETHER THE PASSWORDS ARE CORRECT
module.exports.comparePassword = (userPassword, hash, callback) => {
    bcrypt.compare(userPassword, hash, (err, isMatch) => {
        if (err) throw err;
        callback(null, isMatch);
    });
}
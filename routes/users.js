const express = require('express');
const router = express.Router();
const User = require('../models/user');
const UserLogin = require('../models/userLogin');
const Teacher = require('../models/teacherProfile');
const passport = require('passport');
const jwt = require('jsonwebtoken');
// const config = require('../../Configs/database');
const randtoken = require('rand-token');




const refreshTokens = {};
// Register
router.post('/registerStudent', (req, res, next) => {

    // GET USER's ALL THE DETAILS
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        userType: req.body.userType,
        phoneNo: req.body.phoneNo,
        dob: req.body.dob,
        gender: req.body.gender,
        parentsName: req.body.parentsName,
        parentsEmail: req.body.parentsEmail,
        parentsPhNo: req.body.parentsPhNo,
        parentsQual: req.body.parentsQual,
        stuClass_id: req.body.stuClass_id,
        stuInstitute_id: req.body.stuInstitute_id,
        medium: req.body.medium,
        stuSubjects: req.body.stuSubjects
    });

    // GET ONLY LOGIN DETAILS 
    let newUserLoginDetails = new UserLogin({
        email: req.body.email,
        password: req.body.password,
        userType: req.body.userType
    });

    // Add the data in USER DETAILS TABLE
    User.addUser(newUser, (err, user) => {
        if (err) {
            console.log(err);
            res.json({
                success: false,
                msg: 'Student Registration failed'
            });
        } else {
            // IF SUCCESSFULLY ADDED THE DATA IN USER DETAILS THEN ONLY
            // ADD THE DATA IN LOGINTABLE
            UserLogin.addLoginDetails(newUserLoginDetails, (err, user) => {
                if (err) {
                    throw err;
                } else {
                    res.json({
                        success: true,
                        msg: 'Student Registration Successful'
                    });
                }
            });
        }
    });
});


router.post('/registerTeacher', (req, res, next) => {
    // GET USER's ALL THE DETAILS
    let newTeacher = new Teacher({
        name: req.body.name,
        email: req.body.email,
        userType: req.body.userType,
        phoneNo: req.body.phoneNo,
        dob: req.body.dob,
        gender: req.body.gender,
        qualification_id: req.body.qualification_id,
        institute_id: req.body.institute_id,
        yearOfExp: req.body.yearOfExp
    });

    // GET ONLY LOGIN DETAILS 
    let newUserLoginDetails = new UserLogin({
        email: req.body.email,
        password: req.body.password,
        userType: req.body.userType
    });

    // Add the data in USER DETAILS TABLE
    Teacher.addTeacher(newTeacher, (err, user) => {
        if (err) {
            console.log(err);
            res.json({
                success: false,
                msg: 'Teacher Registration failed'
            });
        } else {
            // IF SUCCESSFULLY ADDED THE DATA IN USER DETAILS THEN ONLY
            // ADD THE DATA IN LOGINTABLE
            UserLogin.addLoginDetails(newUserLoginDetails, (err, user) => {
                if (err) {
                    throw err;
                } else {
                    res.json({
                        success: true,
                        msg: 'Teacher Registration Successful'
                    });
                }
            });

        }
    });
})

// Authenticate
router.post('/authenticate', (req, res, next) => {
    // res.send('AUTHENTICATION');
    const email = req.body.email;
    const password = req.body.password;

    // IN FUTURE IT WILL BE USED TO GET CORRESPONDING DETAILS 
    // of THE TYPE OF USER
    const userType = req.body.userType;
    UserLogin.findOne({
            email: email
        })
        .then((user) => {
            if (user === null) {
                return res.status(200).json({
                    success: false,
                    msg: 'User with this email doesnt exist.Please check the credentials.'
                });
            }
            UserLogin.comparePassword(password, user.password, (err, isMatch) => {
                if (err) throw err;

                if (isMatch) {
                    const token = jwt.sign({
                        data: user
                    }, process.env.SECRET_KEY || config.secret, {
                        expiresIn: 604800 // 1 Week Logged in time
                    });


                    const refreshToken = randtoken.uid(256);
                    refreshTokens[refreshToken] = email;
                    if (user.userType === 'student') {
                        User.getUserByEmail(email, (err, userStudent) => {
                            return res.status(200).json({
                                success: true,
                                msg: 'Login Successful',
                                token: 'Bearer ' + token,
                                refreshToken: refreshToken,
                                user: userStudent
                            });
                        });
                    } else {
                        Teacher.getTeacherByEmail(email, (err, userTeacher) => {
                            return res.status(200).json({
                                success: true,
                                msg: 'Login Successful',
                                token: 'Bearer ' + token,
                                refreshToken: refreshToken,
                                user: userTeacher
                            });
                        });
                    }
                } else {
                    return res.status(200).json({
                        success: false,
                        msg: 'Wrong Credentials. Please check the password.'
                    });
                }
            });
        })
        .catch((error) => {
            console.log(error);
            return res.status(500).json({
                success: false,
                msg: 'Login Failed'
            });
        });
});


router.post('/validateEmail', (req, res, next) => {
    const userEmail = req.body.email;
    UserLogin.getLoginDetailsByEmail(userEmail, (err, response) => {
        if (err) throw err;
        if (response) {
            res.json({
                success: false,
                msg: 'Email Already Exists'
            });
        } else {
            res.json({
                success: true,
                msg: 'Email Available'
            });
        }
    });
});

// Profile
router.get('/profile', passport.authenticate('jwt', {
    session: false
}), (req, res, next) => {

    res.json({
        user: req.user
    });
    res.send('PROFILE');

});


module.exports = router;
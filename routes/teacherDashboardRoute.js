const express = require('express');
const router = express.Router();
const Subjects = require('../models/Subjects');
const TeacherUser = require('../models/teacherProfile');
const TestList = require('../models/TestList');
const TestHistory = require('../models/TestHistory');
const {
    getMyTestForTeacher,
    getResultOfIndividualTestForTeacher
} = require('../controllers/teacherDashboard');



router.route('/getMyTestForTeacher/:id').get(getMyTestForTeacher);


router.route('/getResultOfIndividualTest/:userId/:testId').get(getResultOfIndividualTestForTeacher);

module.exports = router;
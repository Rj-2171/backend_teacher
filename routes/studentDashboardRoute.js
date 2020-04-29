const express = require('express');
const router = express.Router();
const {
    getAllTestsForStudent,
    getAllPublicTestsForStudent,
    getSingleTestQuestions,
    getPastResultForStudent
} = require('../controllers/studentDashboard');





// GET ALL THE TESTS FOR A STUDENT REGARDING INSTITUTES
router.route('/getAllTests/:userId/:class_id/:institute_id').get(getAllTestsForStudent);

// GET ALL THE TESTS FOR A STUDENT WHICH ARE PUBLIC
router.route('/getAllPublicTests/:id').get(getAllPublicTestsForStudent);

// GET A TEST ON THE BASIS OF ID
router.route('/getSingleTestQuestions/:id').get(getSingleTestQuestions);

// GET ALL THE PAST RESULTS OF THE TESTS ATTEMPTED BY STUDENT
router.route('/getPastResults/:id').get(getPastResultForStudent);

module.exports = router;
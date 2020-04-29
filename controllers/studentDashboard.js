const TestList = require('../models/TestList');
const Subjects = require('../models/Subjects');
const User = require('../models/user');



//  @desc GET all tests for students based on classId and instituteId
//  @route GET /api/v1/getAllTests/:class_id/:institute_id
//  @access Public
exports.getAllTestsForStudent = (req, res, next) => {
    let TestsList = [];
    let userId = req.params.userId;
    let classId = req.params.class_id;
    let instituteId = req.params.institute_id;
    let userTest = [];
    let testList;

    TestList.find({
            class_id: classId,
            institute_id: instituteId
        })
        .then((test_list) => {
            testList = test_list;
            return User.findById(userId);
        })
        .then((userHistory) => {
            userHistory.testHistory.forEach((element) => {
                userTest.push(element.testId);
            });
            return Subjects.find({});
        })
        .then((subjects_list) => {
            // console.log(testList);
            testList.forEach(element => {
                const subject = subjects_list.find((x) => x.id.toString() === element.subject_id.toString());
                // console.log(userTest);
                // console.log(element._id);
                // console.log(userTest.some((y) => {
                //     return y.toString() === element._id.toString();
                // }));
                if (!userTest.some((y) => y.toString() === element._id.toString())) {
                    TestsList.push({
                        _id: element._id,
                        testTitle: element.testTitle,
                        totalQuestions: element.totalQuestions,
                        averageScore: element.averageScore,
                        startDate: element.startDate,
                        endDate: element.endDate,
                        public: element.public,
                        description: element.description,
                        subjectName: subject.subjectName,
                        subjectImage: subject.subjectImage
                    });
                }
            });
            return res.status(200).json({
                success: true,
                TestList: TestsList
            });
        })
        .catch((error) => {
            console.log(error);
            return res.status(500).json({
                success: false,
                error: 'Server Error'
            });
        })
}

//  @desc GET all public tests for students based on classId
//  @route GET /api/v1/getAllTests/:class_id
//  @access Public
exports.getAllPublicTestsForStudent = (req, res, next) => {
    let responseTestList = [];
    let testList;
    let classId = req.params.class_id;

    TestList.find({
            class_id: classId,
            public: true
        })
        .then((tests_list) => {
            testList = tests_list;
            return Subjects.find({});
        })
        .then((subjects_list) => {
            testList.forEach(element => {
                const subject = subjects_list.find((x) => x.id.toString() === element.subject_id.toString());
                responseTestList.push({
                    _id: element._id,
                    testTitle: element.testTitle,
                    totalQuestions: element.totalQuestions,
                    averageScore: element.averageScore,
                    startDate: element.startDate,
                    endDate: element.endDate,
                    public: element.public,
                    description: element.description,
                    subjectName: subject.subjectName,
                    subjectImage: subject.subjectImage
                });
            });

            return res.status(200).json({
                success: true,
                TestList: responseTestList
            });
        })
        .catch((error) => {
            console.log(error);
            return res.status(500).json({
                success: false,
                msg: 'Server Error'
            })
        });
}

//  @desc GET all questions for a single test using a test Id : START A TEST
//  @route GET /api/v1/getAllTests/:id
//  @access Public
exports.getSingleTestQuestions = (req, res, next) => {
    let testId = req.params.id;
    let responseQuestionArray = [];

    TestList.findById(testId)
        .then((single_test) => {

            single_test.questions.forEach((singleQuestion) => {
                responseQuestionArray.push({
                    question_id: singleQuestion._id,
                    question: singleQuestion.question,
                    option1: singleQuestion.option1,
                    option2: singleQuestion.option2,
                    option3: singleQuestion.option3,
                    option4: singleQuestion.option4,
                    image: singleQuestion.image
                });
            });

            return res.status(200).json({
                success: true,
                msg: 'Test Started',
                testTitle: single_test.testTitle,
                questionsList: responseQuestionArray
            });

        })
        .catch((error) => {
            console.log(error);
            return res.status(500).json({
                success: false,
                msg: 'Server Error'
            });
        });
}

//  @desc GET the result of past test for a particular student
//  @route GET /api/v1/getAllTests/:id
//  @access Public
exports.getPastResultForStudent = (req, res, next) => {
    let user_id = req.params.id;

    User.findById(user_id).populate('testHistory.testId')
        .then((user) => {
            // console.log(user);
            let testHistory = [];
            user.testHistory.forEach((test) => {
                testHistory.push({
                    title: test.testId.testTitle,
                    correct: test.totalCorrect,
                    total: test.totalQuestions,
                    timeOfTest: test.testGivenAt.toString()
                });
            });
            res.json({
                success: true,
                msg: 'API Successfully returned Values',
                pastResults: testHistory
            });
        });
}
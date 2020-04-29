const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
// const Class = require('../models/Classes');
// const Institute = require('../models/Institute');
// const Qualification = require('../models/Qualification');

const TestList = require('../models/TestList');
const Subjects = require('../models/Subjects');
const User = require('../models/user');
const TestResultSchema = require('../models/TestResult');
const TestHistory = require('../models/TestHistory');
const SubjectiveTest = require('../models/SubjectiveTest');




// GET ALL THE CLASSES
router.post('/getAllTests', (req, res, next) => {
    var SubjectsList = [];
    let classId = req.body.class_id;
    let instituteId = req.body.institute_id;

    TestList.getAllTestsList(classId, instituteId, (err, testsList) => {
        if (err) throw err;
        if (!testsList) {
            res.json({
                success: false,
                msg: 'Cannot get All Tests'
            });
        } else if (testsList.length <= 0) {
            res.json({
                success: false,
                msg: 'No Test yet Declared.Go Out and Play.'
            });
        } else {

            Subjects.getAllSubjects((err, subjectsList) => {
                if (err) throw err;
                if (!subjectsList) {
                    console.log("Subject NOt found");
                    res.json({
                        success: false,
                        msg: 'Cannot get All Tests.'
                    });
                } else {

                    subjectsList.forEach(element => {
                        SubjectsList.push({
                            id: element._id,
                            subjectName: element.subjectName,
                            subjectImage: element.subjectImage

                        });
                    });
                    var TestsList = [];

                    testsList.forEach(element => {
                        const subject = SubjectsList.find((x) => x.id.toString() === element.subject_id.toString());
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
                    });
                    res.json({
                        success: true,
                        TestList: TestsList
                    });
                }
            });
        }
    })
});


// ADD A SINGLE CLASS
router.post('/addSingleTest', (req, res, next) => {

    let newTest = new TestList({
        questions: req.body.questionPaper.questions,
        testTitle: req.body.questionPaper.testTitle,
        public: req.body.questionPaper.public,
        startDate: req.body.questionPaper.startDate,
        endDate: req.body.questionPaper.endDate,
        description: req.body.questionPaper.description,
        class_id: req.body.questionPaper.class_id,
        subject_id: req.body.questionPaper.subject_id,
        institute_id: req.body.questionPaper.institute_id,
        teacher_id: req.body.questionPaper.teacher_id
    });


    newTest.save()
        .then(() => {
            let newTestHistory = new TestHistory({
                testId: newTest._id,
                testAttempted: []
            });
            newTestHistory.save();
        })
        .then(() => {
            res.json({
                success: true,
                msg: 'New Test Added'
            });
        }).catch((error) => {
            console.log(error);
            res.json({
                success: false,
                msg: 'Unable to Add Test'
            });
        })



        router.post('/addSubjectiveTest', (req, res, next) => {

            let newTest = new SubjectiveTest({
                questions: req.body.questionPaper.questions,
                testTitle: req.body.questionPaper.testTitle,
                public: req.body.questionPaper.public,
                startTime: req.body.questionPaper.startTime,
                endTime: req.body.questionPaper.endTime,
                description: req.body.questionPaper.description,
                class_id: req.body.questionPaper.class_id,
                subject_id: req.body.questionPaper.subject_id,
                institute_id: req.body.questionPaper.institute_id,
                teacher_id: req.body.questionPaper.teacher_id,
                questionpdf: req.body.questionPaper.questionpdf
            });
        
        
            newTest.save()
                .then(() => {
                    let newTestHistory = new TestHistory({
                        testId: newTest._id,
                        testAttempted: []
                    });
                    newTestHistory.save();
                })
                .then(() => {
                    res.json({
                        success: true,
                        msg: 'New Test Added'
                    });
                }).catch((error) => {
                    console.log(error);
                    res.json({
                        success: false,
                        msg: 'Unable to Add Test'
                    });
                })
            });

    // TestList.addSingleTest(newTest, (err) => {
    //     if (err) {
    //         res.json({
    //             success: false,
    //             msg: 'Unable to Add Test'
    //         });
    //     } else {
    //         let newTestHistory = new TestHistory({

    //         });
    //         newTestHistory.save()
    //         .then(()=>{
    //             res.json({
    //                 success: true,
    //                 msg: 'New Test Added'
    //             });
    //         })
    //     }
    // });


    // let newTest
});

// SUBMIT A TEST
router.post('/submitTest', (req, res, next) => {
    let testId = req.body.test_id;
    let studentId = req.body.student_id;
    let answersListFromUser = req.body.answersList;
    TestList.getAnswerList(testId, (err, questionArray) => {
        if (err) {
            // res.json({
            //     success: fanswersListFromUseralse,
            //     msg: 'Sorry ! Cant Serve you right now',
            // });
            throw err;
            console.log(error);
        } else {

            // get the array from database
            let answersListFromDB = questionArray.questions;

            // console.log(answersListFromDB);
            // loop through users answer by applying reduce function, for every answer find
            // the equivalent object from DB array and then compare the correct answer
            const result = answersListFromUser.reduce((totalCorrectAnswers, singleAnswer) => {
                const currentQuestion = answersListFromDB.find((elem_) => elem_._id.toString() === singleAnswer.question_id);
                // const correctAnswerKey = singleAnswer.answer;
                if (currentQuestion.answer === singleAnswer.answer) {
                    return totalCorrectAnswers + 1;
                } else {
                    return totalCorrectAnswers;
                }
            }, 0);

            // Prepare the testResult Object to be stored in database and to be sent 
            // to the user
            let testResult = {
                testId: mongoose.Types.ObjectId(testId),
                totalAttempted: answersListFromUser.length,
                totalCorrect: result,
                totalQuestions: answersListFromDB.length,
                testGivenAt: new Date()
            };

            User.addTestResult(studentId, testResult, (err) => {
                if (err) {
                    console.log(err);
                    res.json({
                        success: false,
                        msg: "Cannot Get your Results. Try Again"
                    });
                } else {

                    // TestList.findById(testId)
                    //     .then((singleTestUpdate) => {
                    //         // console.log('TEST ID :' + singleTestUpdate);
                    //         if (singleTestUpdate.testAttempted.length === 0) {
                    //             singleTestUpdate.testAttempted = [];
                    //         }
                    //         singleTestUpdate.testAttempted.push({
                    //             _id: studentId
                    //         });

                    //         singleTestUpdate.save();
                    //     })
                    TestHistory.findOne({
                            testId: mongoose.Types.ObjectId(testId)
                        }).then((testHistory) => {
                            console.log('Test History : ' + testHistory);
                            testHistory.testAttempted.push({
                                userId: studentId,
                                totalAttempted: testResult.totalAttempted,
                                totalCorrect: testResult.totalCorrect,
                                totalQuestions: testResult.totalQuestions,
                                testGivenAt: testResult.testGivenAt.toString()
                            });
                            testHistory.save();
                        })
                        .then(() => {
                            res.json({
                                success: true,
                                result: testResult
                            });
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                }
            });

        }
    });
});

// GET A TEST ON THE BASIS OF ID
router.get('/getSingleTestQuestions/:id', (req, res, next) => {
    TestList.startSingleTest(req.params.id, (err, singleTest) => {
        if (err) {

            res.json({
                success: false,
                msg: 'Sorry ! Cant Serve you right now',

            });
            throw err;
        } else {
            // console.log(singleTest.questions);
            var questionArray = [];
            singleTest.questions.forEach((singleQuestion) => {
                questionArray.push({
                    question_id: singleQuestion._id,
                    question: singleQuestion.question,
                    option1: singleQuestion.option1,
                    option2: singleQuestion.option2,
                    option3: singleQuestion.option3,
                    option4: singleQuestion.option4,
                    image: singleQuestion.image
                });
            });

            res.json({
                success: true,
                msg: 'Test Started',
                testTitle: singleTest.testTitle,
                questionsList: questionArray
            });
        }
    });
})

router.get('/getSubjectiveTestQuestions/:id', (req, res, next) => {
    TestList.startSubjectiveTest(req.params.id, (err, subjectiveTest) => {
        if (err) {

            res.json({
                success: false,
                msg: 'Sorry ! Cant Serve you right now',

            });
            throw err;
        } else {
            // console.log(subjectiveTest.questions);

            res.json({
                success: true,
                msg: 'Test Started',
                testTitle: subjectiveTest.testTitle,
                questions: questionpdf
            });
        }
    });
})
module.exports = router;
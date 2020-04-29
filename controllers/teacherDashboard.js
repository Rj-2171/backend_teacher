const TestList = require('../models/TestList');
const TestHistory = require('../models/TestHistory');

exports.getResultOfIndividualTestForTeacher = (req, res, next) => {
    TestHistory.findOne({
            testId: req.params.testId
        }).populate('testId', 'testTitle')
        .populate('testAttempted.userId', 'name')
        .then((testAttempted) => {
            console.log(testAttempted);
            return res.status(200).json({
                success: true,
                data: testAttempted
            });
        })
        .catch((error) => {
            console.log(error);
            return res.status(500).json({
                success: fail,
                msg: 'Server Error'
            });
        });
}

exports.getMyTestForTeacher = (req, res, next) => {
    let teacher_id = req.params.id;

    TestList.find({
            teacher_id: teacher_id
        })
        .populate('subject_id')
        .populate('institute_id', 'instituteName')
        .populate('class_id', 'className')
        .then((test_list) => {
            return res.status(200).json({
                success: true,
                msg: 'TestLists Successfully fetched',
                testList: test_list
            });
        })
        .catch((error) => {
            console.log(error);
            return res.status(500).json({
                success: fail,
                msg: 'Server Error'
            })
        });

}
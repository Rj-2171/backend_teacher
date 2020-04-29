const express = require('express');
const router = express.Router();

const Class = require('../models/Classes');
const Institute = require('../models/Institute');
const Qualification = require('../models/Qualification');
const Subjects = require('../models/Subjects');



// GET ALL THE CLASSES
router.get('/getAllClasses', (req, res, next) => {

    Class.getAllClasses((err, classesList) => {
        if (err) throw err;
        if (!classesList) {
            res.json({
                success: false,
                msg: 'Cannot get All Classes'
            });
        } else {
            var ClassesList = [];
            classesList.forEach(element => {
                // ClassesList[element._id] = element.className;
                ClassesList.push({
                    _id: element._id,
                    className: element.className
                });
            });
            res.json({
                success: true,
                Classes: ClassesList
            });
        }
    })
});

// GET ALL THE CLASSES
router.get('/getAllSubjects', (req, res, next) => {

    Subjects.getAllSubjects((err, classesList) => {
        if (err) throw err;
        if (!classesList) {
            res.json({
                success: false,
                msg: 'Cannot get All Subjects'
            });
        } else {
            var ClassesList = [];
            classesList.forEach(element => {
                // ClassesList[element._id] = element.className;
                ClassesList.push({
                    _id: element._id,
                    subjectName: element.subjectName,
                    subjectImage: element.subjectImage
                });
            });
            res.json({
                success: true,
                Subjects: ClassesList
            });
        }
    })
});

// GET ALL THE INSTIUTES
router.get('/getAllInstitutes', (req, res, next) => {
    Institute.getAllInstitutes((err, instituteList) => {
        if (err) throw err;
        if (!instituteList) {
            const config = require('../config/database');

            res.json({
                success: false,
                msg: 'Cannot get All Institutes'
            });
        } else {
            var InstituteList = [];
            instituteList.forEach(element => {
                InstituteList.push({
                    _id: element._id,
                    instituteName: element.instituteName,
                    instituteCity: element.instituteCity,
                    instituteState: element.instituteState
                });
            });
            res.json({
                success: true,
                Institutes: InstituteList
            });
        }
    });
});

router.get('/getAllQualifications', (req, res, next) => {

    Qualification.getAllQualifications((err, qualificationList) => {
        if (err) throw err;
        if (!qualificationList) {
            res.json({
                success: false,
                msg: 'Cannot get All Qualifications'
            });
        } else {
            var QualificationList = [];
            qualificationList.forEach(element => {

                QualificationList.push({
                    _id: element._id,
                    qualification: element.qualificationName
                });
            });
            res.json({
                success: true,
                Classes: QualificationList
            });
        }
    })
});

// ADD A SINGLE CLASS
// router.post('/addClass', (req, res, next) => {
//     let newClass = new Class({
//         className: req.body.className
//     });

//     Class.addSingleClass(newClass, (err) => {
//         if (err) {
//             res.json({
//                 success: false,
//                 msg: 'Unable Add Class'
//             });
//         } else {
//             res.json({
//                 success: true,
//                 msg: 'New Class Added'
//             });
//         }
//     })
// });

// ADD A SINGLE INSTITUTE
router.post('/addInstitute', (req, res, next) => {
    let newInstiute = new Institute({
        instituteName: req.body.instituteName,
        instituteCity: req.body.instituteCity,
        instituteState: req.body.instituteState
    });

    Institute.addSingleInstitute(newInstiute, (err) => {
        if (err) {
            res.json({
                success: false,
                msg: 'Unable to Add Class'
            });
        } else {
            res.json({
                success: true,
                msg: 'New Institute Added'
            });
        }

    });
});
module.exports = router;
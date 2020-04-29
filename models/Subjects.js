// THIS FILE CONTAINS ALL THE DROPDOWN DATA REQUIRED FOR REGISTRATION
// FOR A NEW STUDENT OR A TEACHER

const mongoose = require('mongoose');


const SubjectSchema = mongoose.Schema({
    subjectName: {
        type: String
    },
    subjectImage: {
        type: String
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
});

const SubjectsStu = module.exports = mongoose.model('subjectdetails', SubjectSchema);


module.exports.getAllSubjects = (callback) => {
    SubjectsStu.find({}, callback);
}

// module.exports.addSingleClass = (newClass, callback) => {
//     newClass.save(callback);
// }
// THIS FILE CONTAINS ALL THE DROPDOWN DATA REQUIRED FOR REGISTRATION
// FOR A NEW STUDENT OR A TEACHER

const mongoose = require('mongoose');


const QualificationSchema = mongoose.Schema({
    qualificationName: {
        type: String
    }
});

const Qualification = module.exports = mongoose.model('qualifications', QualificationSchema);


module.exports.getAllQualifications = (callback) => {
    Qualification.find({}, callback);
}
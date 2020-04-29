// THIS FILE CONTAINS ALL THE DROPDOWN DATA REQUIRED FOR REGISTRATION
// FOR A NEW STUDENT OR A TEACHER

const mongoose = require('mongoose');


const InstituteSchema = mongoose.Schema({
    instituteName: {
        type: String
    },
    instituteCity: {
        type: String
    },
    instituteState: {
        type: String
    }
});

const Institute = module.exports = mongoose.model('InstituteDetails', InstituteSchema);


module.exports.getAllInstitutes = (callback) => {
    Institute.find({}, callback);
}

module.exports.addSingleInstitute = (newInstitute, callback) => {
    newInstitute.save(callback);
}
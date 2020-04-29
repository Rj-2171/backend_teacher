// THIS FILE CONTAINS ALL THE DROPDOWN DATA REQUIRED FOR REGISTRATION
// FOR A NEW STUDENT OR A TEACHER

const mongoose = require('mongoose');


const ClassSchema = mongoose.Schema({
    className: {
        type: String
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
});

const Class = module.exports = mongoose.model('ClassDetails', ClassSchema);


module.exports.getAllClasses = (callback) => {
    Class.find({
        isDeleted: false
    }, callback);
}

module.exports.addSingleClass = (newClass, callback) => {
    newClass.save(callback);
}
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VideoSchema = new Schema({
    videoTitle: {
        type: String,
        required: [true, 'Video Title is required.'],
        validate: {
            validator: (name) => name.length > 5,
            message: 'Title must be longer than 5 characters.'
        }
    },
    videoDesc: {
        type: String,
        required: [true, 'Video Description is required.'],
        validate: {
            validator: (name) => name.length > 20,
            message: 'Title must be longer than 20 characters.'
        }
    },
    videoLink: {
        type: String,
        required: [true, 'Video Link is required.'],
    },
    subjectId: {
        type: Schema.Types.ObjectId,
        ref: 'subjectdetails'
    },
    classId: {
        type: Schema.Types.ObjectId,
        ref: 'ClassDetails'
    },
    instituteId: {
        type: Schema.Types.ObjectId,
        ref: 'InstituteDetails'
    },
    isLive: {
        type: Boolean,
        default: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'teachers'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});


const Video = mongoose.model('videos', VideoSchema);
module.exports = Video;
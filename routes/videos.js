const express = require('express');
const router = express.Router();
const {
    getAllVideos,
    addVideo,
    getVideosForStudent,
    getVideosForTeacher
} = require('../controllers/videos');
const upload = require('../services/file-upload');

const singleUpload = upload.single('video');

router.route('/').get(getAllVideos)
    .post(addVideo);

router.route('/:subjectId/:classId/:instituteId').get(getVideosForStudent);

router.route('/teacher/:createdBy').get(getVideosForTeacher);

router.route('/video-upload').post(function (req, res) {

    singleUpload(req, res, function (err) {

        if (err) {
            return res.status(422).send({
                errors: [{
                    title: 'Video Upload Error',
                    detail: err.message
                }]
            });
        }

        return res.json({
            'success': true,
            'message': 'Video Uploaded Successfully',
            'videoLink': req.file.location
        });
    });
});

module.exports = router;
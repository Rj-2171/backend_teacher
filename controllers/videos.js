const Video = require('../models/Video');





//  @desc GET all videos
//  @route GET /api/v1/videos
//  @access Public
exports.getAllVideos = (req, res, next) => {
    // return res.send('ABC');
    Video.find()
        .then((videos) => {

            return res.status(200).json({
                success: true,
                count: videos.length,
                data: videos
            });

        })
        .catch(() => {
            return res.status(500).json({
                success: false,
                error: 'Server Error'
            });
        });

}

//  @desc Add a video
//  @route POST /api/v1/videos
//  @access Public
exports.addVideo = (req, res, next) => {
    const {
        videoTitle,
        videoDesc,
        videoLink,
        createdBy,
        subjectId,
        classId,
        instituteId
    } = req.body;

    let newVideo = new Video({
        videoTitle,
        videoDesc,
        videoLink,
        createdBy,
        subjectId,
        classId,
        instituteId,
    });

    newVideo.save()
        .then(() => {
            return res.status(201).json({
                success: true,
                msg: "Video Added Successfully"
            });
        })
        .catch((error) => {
            console.log(error);
            return res.status(500).json({
                success: false,
                msg: "Server Error"
            });
        });
}


//  @desc GET all videos for a student
//  @route GET /api/v1/videos/subjectId/classId/instituteId
//  @access Public
exports.getVideosForStudent = (req, res, next) => {
    const subjectId = req.params.subjectId;
    const classId = req.params.classId;
    const instituteId = req.params.instituteId;

    Video.find({
            subjectId: subjectId,
            classId: classId,
            instituteId: instituteId
        })
        .populate('subjectId', 'subjectName')
        .populate('instituteId', 'instituteName')
        .populate('classId', 'className')
        .populate('createdBy', 'name')
        .then((videos) => {
            return res.status(200).json({
                success: true,
                count: videos.length,
                data: videos
            });
        })
        .catch((error) => {
            console.log(error);
            return res.status(500).json({
                success: false,
                error: 'Server Error'
            });
        });
}

//  @desc GET all videos for a teacher
//  @route GET /api/v1/videos/createdBy
//  @access Public
exports.getVideosForTeacher = (req, res, next) => {
    const createdBy = req.params.createdBy;

    Video.find({
            createdBy: createdBy
        })
        .populate('subjectId', 'subjectName')
        .populate('instituteId', 'instituteName')
        .populate('classId', 'className')
        .then((videos) => {
            return res.status(200).json({
                success: true,
                count: videos.length,
                data: videos
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
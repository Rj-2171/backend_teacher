const express = require('express');
const router = express.Router();
const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');

// const config = require('../../Configs/database');

aws.config.update({
    secretAccessKey: process.env.S3_ACCESS_KEY || config.S3_ACCESS_KEY,
    accessKeyId: process.env.S3_ACCESS_ID || config.S3_ACCESS_ID,
    region: 'ap-south-1'
});

const s3 = new aws.S3();


const fileFilter = (req, file, cb) => {

    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type, only JPEG and PNG is allowed!'), false);
    }
}

const filePdfFilter = (req, file, cb) => {

    if (file.mimetype === 'pdf/pdf')  {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type, only PDF is allowed!'), false);
    }
}


const upload = multer({
    // fileFilter,
    storage: multerS3({
        s3: s3,
        acl: 'public-read',
        bucket: 'prep-ease-multer',
        metadata: function (req, file, cb) {
            cb(null, {
                fieldName: 'TESTING_METADATA'
            });
        },
        key: function (req, file, cb) {
            cb(null, Date.now().toString())
        }
    })
});

router.post('/image', upload.single('photo'), (req, res, next) => {

    if (!req.file) {
        console.log("No file received");
        return res.send({
            success: false,
            msg: 'Image Upload Failed'
        });

    } else {
        console.log('file received');
        return res.send({
            success: true,
            msg: 'Image Uploaded Successful',
            fileName: req.file.location
        })
    }
});

router.post('/pdf', upload.single('pdf'), (req, res, next) => {

    if (!req.file) {
        console.log("No file received");
        return res.send({
            success: false,
            msg: 'Pdf Upload Failed'
        });

    } else {
        console.log('file received');
        return res.send({
            success: true,
            msg: 'Pdf Uploaded Successful',
            fileName: req.file.location
        })
    }
});

module.exports = router;
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');


// const config = require('../../Configs/database');

aws.config.update({
    secretAccessKey: process.env.S3_ACCESS_KEY || config.S3_ACCESS_KEY,
    accessKeyId: process.env.S3_ACCESS_ID || config.S3_ACCESS_ID,
    region: 'ap-south-1'
});

const s3 = new aws.S3();


// IMPORTANT TYPE OF FILTER YOU WANT TO ADD ON UPLOAD
// const fileFilter = (req, file, cb) => {
//     if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
//         cb(null, true)
//     } else {
//         cb(new Error('Invalid Mime Type, only JPEG and PNG'), false);
//     }
// }

const upload = multer({
    // fileFilter,
    storage: multerS3({
        s3,
        bucket: 'prep-ease-multer',
        acl: 'public-read',
        metadata: function (req, file, cb) {
            cb(null, {
                fieldName: 'TESTING_META_DATA!'
            });
        },
        key: function (req, file, cb) {
            cb(null, Date.now().toString())
        }
    })
})

module.exports = upload;
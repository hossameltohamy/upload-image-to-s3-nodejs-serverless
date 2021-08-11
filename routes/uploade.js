const express = require('express');
const { GenerateSignedUrl, DirectUpload } = require('../controllers/upload');
const router = express.Router();
const { protect } = require('../middleware/auth');
const aws = require('aws-sdk');
const S3_BUCKET = process.env.S3_BUCKET;
aws.config.region = process.env.region

// route unprotected for upload from browser
router.get('/sign-s3', (req, res) => {
  const s3 = new aws.S3();
  const fileName = req.query['file-name'];
  const fileType = req.query['file-type'];
  console.log(fileName, fileType);
  const s3Params = {
    Bucket: 'video-bucket-node',
    Key: fileName,
    Expires: 60,
    ContentType: fileType,
    ACL: 'public-read',
  };

  s3.getSignedUrl('putObject', s3Params, (err, data) => {
    if (err) {
      console.log(err);
      return res.end();
    }
    console.log(data);
    const returnData = {
      signedRequest: data,
      url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`,
    };
    res.write(JSON.stringify(returnData));
    res.end();
  });
});

router.use(protect);

router.route('/GenerateSignedUrl').post(GenerateSignedUrl);
router.route('/DirectUpload').post(DirectUpload);

module.exports = router;

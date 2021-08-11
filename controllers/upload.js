/**
 
 * @module upload
 */

const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const AWS = require('aws-sdk');
const uuid = require('uuid/v1');
const Upload = require('../models/Upload');
const fs = require('fs');
AWS.config.region = process.env.region;
const path = require('path');
const S3_BUCKET = process.env.S3_BUCKET;
const s3 = new AWS.S3({
  accessKeyId: process.env.accessKeyId,
  secretAccessKey: process.env.secretAccessKey,
});

exports.GenerateSignedUrl = asyncHandler(async (req, res, next) => {
  const file = req.files.file;
  if (!file) {
    return next(new ErrorResponse(`Please upload a file`, 400));
  }
  const key = `${file.name}`;
  const params = {
    Bucket: S3_BUCKET,
    Key: key,
    Expires: 600,
    ContentType: file.mimetype,
    ACL: 'public-read',
  };
  s3.getSignedUrl('putObject', params, async (err, url) => {
    if (url) {
      //save to data base url,key
      const file = await Upload.create({ url, key });
      res.status(201).json({
        success: true,
        file,
      });
    } else {
      return next(new ErrorResponse(err, 400));
    }
  });
});

exports.DirectUpload = asyncHandler(async (req, res, next) => {
  const file = req.files.file;

  if (!file) {
    return next(new ErrorResponse(`Please upload a file`, 400));
  }
  const filename = `${file.name}`;
  const key = `${req.user.id}/${uuid()}${filename}`;
  // move file
  await file.mv(path.join(__dirname, '../uploads', file.name));
  //Read content from the file
  const fileContent = await fs.readFileSync('./uploads/' + filename);
  const params = {
    Bucket: 'video-bucket-node',
    Key: key,
    Expires: 600,
    Body: fileContent,
    ResponseContentType: file.mimetype,
  };

  await s3.upload(params, function (s3Err, data) {
    if (s3Err) throw s3Err;
    console.log(`File uploaded successfully at ${data.Location}`);
  });
  delete params.Body;
  await s3.getSignedUrl('getObject', params, async (err, url) => {
    if (url) {
      //save to data base url,key
      const file = await Upload.create({ url, key });
      res.status(201).json({
        success: true,
        url: `https://${S3_BUCKET}.s3.amazonaws.com/${key}`,
      });
    } else {
      return next(new ErrorResponse(err, 400));
    }
  });
});

const AWS = require('aws-sdk');
const s3 = new AWS.S3({
  accessKeyId: process.env.accessKeyId,
  secretAccessKey: process.env.secretAccessKey,
});

const params = {
  Bucket: 'new-bucket-for-image',
  CreateBucketConfiguration: {
    // Set your region here
    LocationConstraint: 'eu-west-1',
  },
};

s3.createBucket(params, function (err, data) {
  if (err) console.log(err, err.stack);
  else console.log('Bucket Created Successfully', data.Location);
});

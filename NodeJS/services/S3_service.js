const S3_AWS = require('aws-sdk/clients/s3');
const { v4 } = require('uuid');
const { S3_ACCESS_KEY, S3_SECRET_ACCESS_KEY, S3_BUCKET, S3_REGION } = require('../config/config')


const bucket = new S3_AWS({
  accessKeyId: S3_ACCESS_KEY,
  secretAccessKey: S3_SECRET_ACCESS_KEY,
  signatureVersion: "v4",
  region: S3_REGION
});

const uploadFiles = async (file, itemType, itemId) => {
  const Key = builderFilePath(file.name, itemType, itemId)

  await bucket.upload({
    Bucket: S3_BUCKET,
    Body: file.data,
    Key,
  }).promise()

  const signedUrl = bucket.getSignedUrl('getObject', { Bucket: S3_BUCKET, Key });

  return signedUrl;
}

function builderFilePath(fileName, itemType, itemId) {
  const fileType = fileName.split('.').pop();

  return `${ itemType }/${ itemId }/${ v4() }.${ fileType }`
}


module.exports = {
  uploadFiles,
};

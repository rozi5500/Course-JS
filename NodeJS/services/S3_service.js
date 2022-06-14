const S3_AWS = require('aws-sdk/clients/s3');
const { v4 } = require('uuid');
const { S3_ACCESS_KEY, S3_SECRET_ACCESS_KEY, S3_BUCKET, S3_REGION } = require('../config/config')


const bucket = new S3_AWS({
  accessKeyId: S3_ACCESS_KEY, // Ключ юзера, який був виданий юзеру
  secretAccessKey: S3_SECRET_ACCESS_KEY,
  signatureVersion: "v4",
  region: S3_REGION
});

const uploadFiles = async (file, itemType, itemId) => {
  const Key = builderFilePath(file.name, itemType, itemId)

  await bucket.upload({
    Bucket: S3_BUCKET, // Відро в яке будуть завантажуватись файли
    Body: file.data, // Це буфер, а саме контент який ми завантажуємо
    Key, // В ключі прописується як це буде зберігатись на Амазоні
  }).promise() // Щоб промісифікувати функцію, по дефолту вона чекає колбек

  // signedUrl використовується зазвичай для приватних файлів, тому що ця силка існує тільки деякий час
  const signedUrl = bucket.getSignedUrl('getObject', { Bucket: S3_BUCKET, Key });

  // Location це там де воно лежить на AWS
  return signedUrl;
}

function builderFilePath(fileName, itemType, itemId) {
  // fileType буде закінченням файлу, типу ".jpg" і т.д.
  const fileType = fileName.split('.').pop();

  // v4() виконується як функція, це повертає нам ID
  return `${ itemType }/${ itemId }/${ v4() }.${ fileType }`
}

module.exports = {
  uploadFiles
};

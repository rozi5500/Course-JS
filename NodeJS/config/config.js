module.exports = {
  PORT: process.env.PORT || 4000,
  MONGO_URL: process.env.MONGO_URL || 'mongodb://localhost:27017/test_db',

  ACCESS_TOKEN_SECRET_KEY: 'logic',
  REFRESH_TOKEN_SECRET_KEY: 'power',
  ACTION_TOKEN_SECRET_KEY: 'action',

  SENDER_EMAIL: process.env.SENDER_EMAIL,
  SENDER_EMAIL_PASSWORD: process.env.SENDER_EMAIL_PASSWORD,

  FRONTEND_URL: 'http://localhost:3000',

  S3_ACCESS_KEY: process.env.S3_ACCESS_KEY,
  S3_SECRET_ACCESS_KEY: process.env.S3_SECRET_KEY,

  S3_REGION: process.env.S3_REGION,
  S3_BUCKET: process.env.S3_BUCKET
};

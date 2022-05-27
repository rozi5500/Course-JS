module.exports = {
  PORT: process.env.PORT || 4000,
  MONGO_URL: process.env.MONGO_URL || 'mongodb://localhost:27017/test_db',

  ACCESS_TOKEN_SECRET_KEY: 'logic',
  REFRESH_TOKEN_SECRET_KEY: 'power',
  ACTION_TOKEN_SECRET_KEY: 'action',

  SENDER_EMAIL: process.env.SENDER_EMAIL,
  SENDER_EMAIL_PASSWORD: process.env.SENDER_EMAIL_PASSWORD,
  EMAIL_RECEIVER: 'kolyabogach12@gmail.com',

  FRONTEND_URL: 'http://localhost:3000'
};

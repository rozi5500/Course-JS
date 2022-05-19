module.exports = {
  PORT: process.env.PORT || 4000,
  MONGO_URL: process.env.MONGO_URL || 'mongodb://localhost:27017/test_db',

  ACCESS_TOKEN_SECRET_KEY: 'logic',
  REFRESH_TOKEN_SECRET_KEY: 'power',
};

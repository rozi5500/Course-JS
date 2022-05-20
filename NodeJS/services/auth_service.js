const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { ApiError } = require('../error');
const { commonErrorEnum, userErrorEnum, codeStatus, tokenTypeEnum } = require('../constants')
const { ACCESS_TOKEN_SECRET_KEY, REFRESH_TOKEN_SECRET_KEY } = require('../config/config')


async function comparePasswords(hashedPassword, password) {
  const IsPasswordEqual = await bcrypt.compare(password, hashedPassword);

  if (!IsPasswordEqual) {
    throw new ApiError(userErrorEnum.WrongPassword, codeStatus.bad_request_status);
  }
}

function hashPassword(password) {
  return bcrypt.hash(password, 10);
}

function generateToken(encodeData) {
  const access_token = jwt.sign(encodeData, ACCESS_TOKEN_SECRET_KEY, { expiresIn: '15s' });
  const refresh_token = jwt.sign(encodeData, REFRESH_TOKEN_SECRET_KEY, { expiresIn: '30m' });

  return {
    access_token,
    refresh_token
  }
}

function validateToken(token, tokenType = tokenTypeEnum.ACCESS) {
  try{
    let secretWord = ACCESS_TOKEN_SECRET_KEY;

    if(tokenType === tokenTypeEnum.REFRESH) {
      secretWord = REFRESH_TOKEN_SECRET_KEY;
    }

    return jwt.verify(token, secretWord)
  } catch (e) {
    throw new ApiError(e.message || commonErrorEnum.InvalidToken, codeStatus.unauthorized_status);
  }
}


module.exports = {
  comparePasswords,
  hashPassword,
  generateToken,
  validateToken
};

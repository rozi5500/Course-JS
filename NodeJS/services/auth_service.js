const bcrypt = require('bcrypt');

const { ApiError } = require('../error');
const { userErrorEnum, codeStatus } = require('../constants')

async function comparePasswords(hashedPassword, password) {
  const IsPasswordEqual = await bcrypt.compare(password, hashedPassword);

  if (!IsPasswordEqual) {
    throw new ApiError(userErrorEnum.WrongPassword, codeStatus.bad_request_status);
  }
}

function hashPassword(password) {
  return bcrypt.hash(password, 10);
}

module.exports = {
  comparePasswords,
  hashPassword
};

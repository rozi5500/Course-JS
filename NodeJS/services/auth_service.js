const bcrypt = require('bcrypt');

const ApiError = require('../error/ApiError');

async function comparePasswords(hashedPassword, password) {
  const IsPasswordEqual = await bcrypt.compare(password, hashedPassword);

  if (!IsPasswordEqual) {
    throw new ApiError('The password is not correct', 400);
  }
}

function hashPassword(password) {
  return bcrypt.hash(password, 10); // Сама функція яка хешує підсолений пароль
} // пароль солять тому що якщо не солити і базі будуть два юзера і більше з однаковими паролями
// то їхні хеші також будуть однаковими, а підсолені хешовані паролі - ні

module.exports = {
  comparePasswords,
  hashPassword
};

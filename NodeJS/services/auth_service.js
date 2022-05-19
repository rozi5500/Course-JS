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
  // Генерація access token'а
  const access_token = jwt.sign(encodeData, ACCESS_TOKEN_SECRET_KEY, { expiresIn: '14m' });
  // Генерація refresh token'а який являється одноразовим
  const refresh_token = jwt.sign(encodeData, REFRESH_TOKEN_SECRET_KEY, { expiresIn: '30m' });

  return {
    access_token,
    refresh_token
  }
}

function validateToken(token, tokenType = tokenTypeEnum.ACCESS) {
  try{
    let secretWord = ACCESS_TOKEN_SECRET_KEY; // Ставимо секретне слово таке як зараз в access_token

    if(tokenType === tokenTypeEnum.REFRESH) {
      secretWord = REFRESH_TOKEN_SECRET_KEY; // Змінюємо секретне слово з access_token'a на refresh_token
    }

    // Для перевірки передаємо самий токен і секретний або публічний ключ по якому ми
    // Розшифруємо цей токен
    return jwt.verify(token, secretWord)
  } catch (e) { // В сервісах не прописується зазвичай try catch, але тут ми прописуємо для того, щоб
    throw new ApiError(e.message || commonErrorEnum.InvalidToken, codeStatus.unauthorized_status); // кинути свій статус, саме 401
  }
}


module.exports = {
  comparePasswords,
  hashPassword,
  generateToken,
  validateToken
};

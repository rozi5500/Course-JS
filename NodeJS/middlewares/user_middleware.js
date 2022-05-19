const { ApiError } = require('../error');
const { User } = require('../DataBase');
const { userValidator, updateUserValidator } = require('../validators');
const { userErrorEnum, codeStatus } = require('../constants')


const checkDuplicatedEmail = async (req, res, next) => {
  try {
    const { email = '' } = req.body;

    const isEmailOccupied = await User.findOne({ email: email.toLowerCase().trim() });

    if (isEmailOccupied) {
      next(new ApiError(userErrorEnum.OccupiedEmail, codeStatus.conflict_status));
      return;
    }

    next();
  } catch (e) {
    next(e);
  }
};

// Функція для динамічних значень яка повертає middleware
// eslint-disable-next-line arrow-body-style
const getDynamicallyUser = (paramName = '_id', where = 'body', DBField = paramName) => {
  return async (req, res, next) => {
    try {
      // Динамічне значення в [] тому що там може бути params, body, query
      const reqElement = req[where];

      if (!reqElement || typeof reqElement !== 'object') {
        next(new ApiError('Incorrect searching param'));
        return;
      }

      // Теж саме, тут може бути пошук по різним полям, email, name і т.д
      const param = reqElement[paramName];

      // Саме такий синтаксис [key]: value, щоб ключ був динамічний
      // +password для того, щоб коли воно буде зрівнювати пароль з body і юзера який в базі
      // то щоб пароль відображався
      const user = await User.findOne({ [DBField]: param }).select("+password");

      if (!user) {
        next(new ApiError('User not found', 404));
        return;
      }

      req.user = user;

      next()
    } catch (e) {
      next(e);
    }
  }
};

const validateUser = (req, res, next) => {
  try {
    const { value, error } = userValidator.UserSchemaValidator.validate(req.body);

    if (error) {
      next(new ApiError(error.details[0].message, 400));
      return;
    }

    req.body = value;

    next();
  } catch (e) {
    next(e);
  }
};

const UserUpdateValidator = (req, res, next) => {
  try {
    const { value, error } = updateUserValidator.UserSchemaUpdateValidator.validate(req.body);

    if (error) {
      next(new ApiError(error.details[0].message, codeStatus.bad_request_status));
      return;
    }

    req.body = Object.assign(req.body, value);

    next()
  } catch (e) {
    next(e);
  }
};


module.exports = {
  getDynamicallyUser,
  validateUser,
  checkDuplicatedEmail,
  UserUpdateValidator
};

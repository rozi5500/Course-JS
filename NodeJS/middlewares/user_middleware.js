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

const getDynamicallyUser = (paramName = '_id', where = 'body', DBField = paramName) => {
  return async (req, res, next) => {
    try {
      const reqElement = req[where];

      if (!reqElement || typeof reqElement !== 'object') {
        next(new ApiError('Incorrect searching param'));
        return;
      }

      const param = reqElement[paramName];

      const user = await User.findOne({ [DBField]: param }).select("+password");

      if (!user) {
        next(new ApiError(userErrorEnum.NotFoundUser, codeStatus.not_found_status));
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
      next(new ApiError(error.details[0].message, codeStatus.bad_request_status));
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

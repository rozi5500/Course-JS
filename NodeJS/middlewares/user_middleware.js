const { User } = require('../DataBase');
const { ApiError } = require('../error');
const { userValidator, queryValidator, updateUserValidator } = require('../validators');
const { userErrorEnum, codeStatus } = require('../constants')

const checkDoesUserExist = async (req, res, next) => {
  try{
    const {UserId} = req.params;

    const currentUser = await User.findById(UserId);

    if(!currentUser) {
      next(new ApiError(userErrorEnum.NotFoundUser, codeStatus.not_found_status));
      return;
    }

    if(UserId.length !== 24) {
      next(new ApiError(userErrorEnum.NotValidID, codeStatus.bad_request_status));
      return;
    }

    req.user = currentUser;

    next();
  } catch (e) {
    next(e);
  }
};

const checkDuplicatedEmail = async (req, res, next) => {
  try{
    const {email = ''} = req.body;

    const isEmailOccupied = await User.findOne({email: email.toLowerCase().trim()});

    if(isEmailOccupied) {
      next(new ApiError(userErrorEnum.OccupiedEmail, codeStatus.conflict_status));
      return;
    }

    next();
  } catch (e) {
    next(e);
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

const userUpdateValidator = (req, res, next) => {
  try{
    const { value, error } = updateUserValidator.UserSchemaUpdateValidator.validate(req.body);

    if(error) {
      next(new ApiError(error.details[0].message, codeStatus.bad_request_status));
      return;
    }

    req.body = Object.assign(req.body, value);

    next()
  }catch (e) {
    next(e);
  }
}

const validateUserQuery = (req, res, next) => {
  try {
    const { error } = queryValidator.querySchemaValidator.validate(req.query);

    if (error) {
      next(new ApiError(error.details[0].message, 400));
      return;
    }

    next()
  }catch (e) {
    next(e);
  }
}


module.exports = {
  validateUser,
  validateUserQuery,
  userUpdateValidator,
  checkDoesUserExist,
  checkDuplicatedEmail,
};

const { authService } = require('../services');
const { authValidator, emailValidator, passwordValidator } = require('../validators')
const { ApiError } = require('../error')
const { OAuth, ActionToken } = require('../DataBase')
const { tokenTypeEnum, codeStatus } = require('../constants')


async function checkAccessToken(req, res, next) {
  try {
    const access_token = req.get('Authorization');

    if (!access_token) {
      next(new ApiError('No token', codeStatus.unauthorized_status));
      return;
    }

    authService.validateToken(access_token);

    const tokenData = await OAuth.findOne({ access_token }).populate('_user_id');

    if (!tokenData || !tokenData._user_id) {
      next(new ApiError('Not valid token', 401))
    }

    req.authUser = tokenData._user_id;

    next()
  } catch (e) {
    next(e);
  }
}

async function checkRefreshToken(req, res, next) {
  try {
    const refresh_token = req.get('Authorization');

    if (!refresh_token) {
      next(new ApiError('No token', codeStatus.unauthorized_status));
      return;
    }

    authService.validateToken(refresh_token, tokenTypeEnum.REFRESH);

    const tokenData = await OAuth.findOne({ refresh_token }).populate('_user_id');

    req.authUser = tokenData._user_id;

    next()
  } catch (e) {
    next(e);
  }
}

function checkActionToken(actionType) {
  return async function(req, res, next) {
    try {
      const { token } = req.body;

      if (!token) {
        next(new ApiError('No token', codeStatus.forbidden));
        return;
      }

      authService.validateToken(token, actionType);

      const tokenData = await ActionToken.findOne({ token, actionType }).populate('_user_id')

      req.user = tokenData._user_id;

      next();
    } catch (e) {
      next(e);
    }
  }
}

function validateLogin(req, res, next) {
  try {
    const { error, value } = authValidator.loginSchema.validate(req.body);

    if (error) {
      next(new ApiError(error.details[0].message, codeStatus.bad_request_status));
      return;
    }

    req.body = value;

    next();
  } catch (e) {
    next(e);
  }
}

function validateEmail(req, res, next) {
  try {
    const { error, value } = emailValidator.forgetPassSchema.validate(req.body);

    if (error) {
      next(new ApiError(error.details[0].message, codeStatus.bad_request_status));
      return;
    }

    req.body = value;

    next();
  } catch (e) {
    next(e);
  }
}

function validatePassword(req, res, next) {
  try {
    const { error } = passwordValidator.PasswordSchema.validate(req.body);

    if (error) {
      next(new ApiError(error.details[0].message, codeStatus.bad_request_status));
      return;
    }

    next();
  } catch (e) {
    next(e);
  }
}


module.exports = {
  checkAccessToken,
  checkActionToken,
  checkRefreshToken,
  validateLogin,
  validateEmail,
  validatePassword
};

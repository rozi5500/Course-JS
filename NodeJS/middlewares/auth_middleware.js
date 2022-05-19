const { authService } = require('../services');
const { authValidator } = require('../validators')
const { ApiError } = require('../error')
const { OAuth } = require('../DataBase')
const { tokenTypeEnum, codeStatus, commonErrorEnum } = require('../constants')


async function checkAccessToken(req, res, next) {
  try {
    const access_token = req.get('Authorization'); // Берем токен з Header таким чином

    if (!access_token) {
      next(new ApiError('No token', codeStatus.unauthorized_status));
      return;
    }

    authService.validateToken(access_token);

    // Найди в колекції OAuth там де key - access_token a value - токен який прийшов з Header
    // і populate це join
    const tokenData = await OAuth.findOne({ access_token }).populate('_user_id');
    // tokenData це юзер з токенами
    // tokenData._user_id це про юзер без токенів

    if (!tokenData || !tokenData._user_id) {
      next(new ApiError('Not valid token', 401))
    }

    // Це робимо для того, щоб передати tokenData._user_id в реквест і прийняти це в контролері
    // це просто об'єкт юзера без токенів
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

    if (!tokenData) {
      next(new ApiError('Not valid token'))
      return;
    }

    await OAuth.deleteOne({ refresh_token });

    const tokens = authService.generateToken();

    await OAuth.create({ _user_id: tokenData._user_id._id, ...tokens})

    next()
  } catch (e) {
    next(e);
  }
}

function validateLogin(req, res, next) {
  try {
    const { error, value } = authValidator.loginSchema.validate(req.body);

    if (error) {
      next(new ApiError(error.details[0].message, 400));
      return;
    }

    req.body = value

    next()
  } catch (e) {
    next(e);
  }
}


module.exports = {
  checkAccessToken,
  checkRefreshToken,
  validateLogin
};

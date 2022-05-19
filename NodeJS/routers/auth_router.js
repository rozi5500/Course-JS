const { Router } = require('express');

const { auth_controller } = require('../controller');
const { auth_middleware, user_middleware } = require('../middlewares');

const authRouter = Router();

authRouter.post('/login',
  auth_middleware.validateLogin,
  user_middleware.getDynamicallyUser('email'),
  auth_controller.login);

authRouter.post('/logout',
  auth_middleware.checkAccessToken,
  auth_controller.logout);

authRouter.post('/refresh',
  auth_middleware.checkRefreshToken,
  auth_controller.refresh
);


module.exports = authRouter;

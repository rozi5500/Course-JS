const { Router } = require('express');

const { auth_controller } = require('../controller');
const { auth_middleware, user_middleware } = require('../middlewares');

const authRouter = Router();

authRouter.post('/login',
  auth_middleware.validateLogin,
  user_middleware.getDynamicallyUser('email'),
  auth_controller.login);

authRouter.post('/logout',
  auth_middleware.checkAccessToken, // Для того, щоб знати хто робить logout, хто виходить з платформи
  auth_controller.logout)


module.exports = authRouter;

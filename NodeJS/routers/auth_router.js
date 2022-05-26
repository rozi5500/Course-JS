const { Router } = require('express');

const { auth_controller } = require('../controller');
const { auth_middleware, user_middleware } = require('../middlewares');
const { actionTypesEnum } = require("../constants");

const authRouter = Router();

authRouter.post('/login',
  auth_middleware.validateLogin,
  user_middleware.getDynamicallyUser('email'),
  auth_controller.login
);

authRouter.post('/logout',
  auth_middleware.checkAccessToken,
  auth_controller.logout
);

authRouter.post('/refresh',
  auth_middleware.checkRefreshToken,
  auth_controller.refresh
);

authRouter.post('/password/forgot',
  auth_middleware.validateEmail,
  user_middleware.getDynamicallyUser('email'),
  auth_controller.forgetPassword
);

authRouter.patch('/password/reset',
  auth_middleware.checkActionToken(actionTypesEnum.forgot_password),
  auth_controller.setNewPassword
);

authRouter.patch('/password/change',
  auth_middleware.validatePassword,
  auth_middleware.checkAccessToken,
  auth_controller.changePassword
);


module.exports = authRouter;

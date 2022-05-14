const { Router } = require('express');

const { user_controller } = require('../controller');
const { user_middleware, common_middleware } = require('../middlewares');

const userRouter = Router();

module.exports = userRouter;

userRouter.post('/',
  user_middleware.validateUser,
  user_middleware.checkDuplicatedEmail,
  user_controller.createUser);

userRouter.get('/', common_middleware.validateQuery, user_controller.getAllUsers);

userRouter.all('/:UserId', user_middleware.checkDoesUserExist);
userRouter.get('/:UserId', user_controller.getOneUserByID);

userRouter.patch('/:UserId',
  user_middleware.UserUpdateValidator,
  user_middleware.checkDuplicatedEmail,
  user_controller.updateUser);

userRouter.delete('/:UserId', user_controller.deleteUser);

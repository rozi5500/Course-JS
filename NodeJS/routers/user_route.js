const { Router } = require('express');

const { user_controller } = require('../controller');
const { user_middleware, common_middleware } = require('../middlewares');
const { reqValuesEnum } = require('../constants')

const userRouter = Router();

userRouter.post('/',
  user_middleware.validateUser,
  user_middleware.checkDuplicatedEmail,
  user_controller.createUser);

userRouter.get('/', common_middleware.validateQuery, user_controller.getAllUsers);

userRouter.use('/:UserId', user_middleware.getDynamicallyUser('UserId', reqValuesEnum.params, '_id'));
userRouter.get('/:UserId', user_controller.getOneUserByID);

userRouter.patch('/:UserId',
  user_middleware.UserUpdateValidator,
  user_middleware.checkDuplicatedEmail,
  user_controller.updateUser);

userRouter.delete('/:UserId', user_controller.deleteUser);

userRouter.post('/:UserId/photo', user_middleware.checkCorrectImage, user_controller.uploadPhoto)

module.exports = userRouter;

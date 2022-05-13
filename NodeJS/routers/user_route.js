const { Router } = require('express');

const { user_controller } = require('../controller');
const { user_middleware } = require('../middlewares');

const userRouter = Router();

module.exports = userRouter;

userRouter.post('/',
  user_middleware.validateUser,
  user_middleware.checkDuplicatedEmail,
  user_controller.createUser);

userRouter.get('/', user_controller.getAllUsers);

userRouter.get('/pages',user_middleware.validateUserQuery, user_controller.getUserPages);

userRouter.all('/:UserId', user_middleware.checkDoesUserExist);
userRouter.get('/:UserId', user_controller.getOneUserByID);

userRouter.patch('/:UserId',
  user_middleware.userUpdateValidator,
  user_middleware.checkDuplicatedEmail,
  user_controller.updateUser);

userRouter.delete('/:UserId', user_controller.deleteUser);

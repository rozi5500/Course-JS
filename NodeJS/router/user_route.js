const {Router} = require('express');

const userController = require('../controller/user_controller');
const userMiddleWare = require('../middlewares/user_middleware');

const userRouter = Router();

module.exports = userRouter;


userRouter.post('/',
  userMiddleWare.checkDublicatedEmail,
  // userMiddleWare.checkValidAge, не працює :(
  userMiddleWare.checkValidGender,
  userController.createUser);

userRouter.get('/', userController.getAllUsers);

userRouter.get('/:UserID', userController.getOneUserByID);

userRouter.delete('/:UserId', userController.deleteUser);



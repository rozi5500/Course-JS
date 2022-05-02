const {Router} = require('express');

const userController = require('../controller/user_controller');

const userRouter = Router();

module.exports = userRouter;


userRouter.post('/', userController.createUser);

userRouter.get('/', userController.getAllUsers);

userRouter.get('/:UserID', userController.getOneUserByID);

userRouter.delete('/:UserId', userController.deleteUser);



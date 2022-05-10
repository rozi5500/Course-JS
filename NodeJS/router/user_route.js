const {Router} = require('express');

const userController = require('../controller/user_controller');
const userMiddleWare = require('../middlewares/user_middleware');

const userRouter = Router();

module.exports = userRouter;


userRouter.post('/',
  userMiddleWare.isNameWritten,
  userMiddleWare.checkValidAge,
  userMiddleWare.checkDublicatedEmail,
  userMiddleWare.checkValidGender,
  userController.createUser);

userRouter.get('/', userController.getAllUsers);

userRouter.get('/pages', userController.getUserPages);

userRouter.all('/:UserId', userMiddleWare.checkDoesUserExist); // Ставим мідлвару тут для того щоб перевірити
// чи є взагалі такий юзер і тільки тоді йдемо далі, щоб не писати в кожні нижче стрічці цю мідлвару
userRouter.get('/:UserId', userController.getOneUserByID);
userRouter.patch('/:UserId', userController.updateUser);
userRouter.delete('/:UserId', userController.deleteUser);

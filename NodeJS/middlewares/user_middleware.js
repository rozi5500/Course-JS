const { User } = require('../DataBase');
const ApiError = require('../error/ApiError');
const { userValidator } = require('../validators');

const checkDoesUserExist = async (req, res, next) => {
  try{
    const {UserId} = req.params;

    const currentUser = await User.findById(UserId);

    if(!currentUser) {
      next(new ApiError('User is not found', 404));
      return;
    }

    req.user = currentUser;

    next();
  } catch (e) {
    next(e);
  }
};

const checkDuplicatedEmail = async (req, res, next) => {
  try{
    const {email = ''} = req.body;

    if(!email) {
      next(new ApiError('Email must be written', 400));
      return;

    }

    if(!email.endsWith('@gmail.com')) {
      next(new ApiError('Wrong email adress', 400));
      return;
    }

    const isEmailOccupied = await User.findOne({email: email.toLowerCase().trim()});

    if(isEmailOccupied) {
      next(new ApiError('This email is occupied', 409));
      return;
    }

    next();
  } catch (e) {
    next(e);
  }
};

const validateUser = (req, res, next) => {
  try {
    const { value, error } = userValidator.UserShemaValidator.validate(req.body); // Валідація через joi

    if (error) {
      next(new ApiError(error.details[0].message, 400)); // синтаксис доволі виглядить заплутано але
      return; // таким чином ми показуємо чим шляхом помилку якщо вона є взагалі, якщо ні - йдемо далі
    }

    req.body = value;

    next();
  } catch (e) {
    next(e);
  }
}

module.exports = {
  validateUser,
  checkDoesUserExist,
  checkDuplicatedEmail,
};

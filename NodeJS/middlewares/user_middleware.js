const User = require('../DataBase/user.scheme');
const ApiError = require('../error/ApiError');

const checkDoesUserExist = async (req, res, next) => {
  try{
    const {UserId} = req.params;

    const currentUser = await User.findById(UserId);

    if(!currentUser) {
      next(new ApiError('User is not found', 404));
      return;
    }

    req.user = currentUser; // Робимо новий параметр реквесту - юзер і використовуємо
    // в контролері для того щоб два рази не шукати юзера в базі, один раз знайшли,
    // і записали в змінну і змінну використовуємо

    next();
  } catch (e) {
    next(e);
  }
}

const checkDublicatedEmail = async (req, res, next) => {
  try{
    const {email = ''} = req.body;

    if(!email) {
      next(new ApiError('Email must be written', 400));// Ми кидаєм вже не звичайну
      return; // еррору а ту яку створили для того щоб була можливість дати їй статус

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

const isNameWritten = (req, res, next) => {
  try{
    const { name } = req.body;

    if (!name) {
      next(new ApiError('Name is required to be written', 400));
      return;
    }

    next();
  } catch (e) {
    next(e);
  }
}

const checkValidAge = (req, res, next) => {
  try {
    const { age } = req.body;

    if (age <= 0 || age >= 120) {
      next(new ApiError('Not valid age', 400));
      return;
    }

    next();
  } catch (e) {
    next(e);
  }
};

const checkValidGender = (req, res, next) => {
  try{
    const { gender } = req.body;
    const genderToLowerCase = gender.toLowerCase();

    const maleOrFemale = genderToLowerCase !== 'male' && genderToLowerCase !== 'female';

    if (maleOrFemale) {
      next(new ApiError('Not valid gender', 400));
      return;
    }

    next();
  } catch (e) {
    next(e);
  }
};

module.exports = {
  checkDoesUserExist,
  checkDublicatedEmail,
  checkValidGender,
  checkValidAge,
  isNameWritten
};

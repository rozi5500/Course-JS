const User = require('../DataBase/user.scheme');

// В МЕНЕ TRY CATCH ЯКЩО ОГОРТАТИ ТО ВИДАЄ ПУСТИЙ ОБ'ЄКТ, САМЕ ЦЬОМУ
// Я БЕЗ НЬОГО ДЕЯКІ ОБРОБНИКИ РОБИВ
const checkDublicatedEmail = async (req, res, next) => {
    const {email = ''} = req.body;

    if(!email) {
      throw new Error('Email must be written');
    }

    if(!email.includes('@gmail.com')) {
      throw new Error('Wrong email adress');
    }

    const isEmailOccupied = await User.findOne({email: email.toLowerCase().trim()});

    if(isEmailOccupied) {
      throw new Error('This email is occupied');
    }

    next();
};

const isNameWritten = async (req, res, next) => {
    const { name } = req.body;

    if (!name) {
      throw new Error('Name is required to be written');
    }

    next();
}

const checkValidAge = async (req, res, next) => {
  try {
    const { age } = req.body;

    if (age <= 0 || age >= 120) {
      throw new Error('Not valid age');
    }

    next();
  } catch (e) {
    console.log(e);
  }
};

const checkValidGender = async (req, res, next) => {
  const { gender } = req.body;
  const genderToLowerCase = gender.toLowerCase();

  const maleOrFemale = genderToLowerCase !== 'male' && genderToLowerCase !== 'female';

  if (maleOrFemale) {
    throw new Error('Not valid gender');
  }

  next();
};

module.exports = {
  checkDublicatedEmail,
  checkValidGender,
  checkValidAge,
  isNameWritten
};
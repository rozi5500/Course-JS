const User = require('../DataBase/user.scheme');

const checkDublicatedEmail = async (req, res, next) => {
  try {
    const {email = ''} = req.body;

    if (!email) {
      res.json(`Email must be written! It's required`);
    }

    const isExistedUser = await User.findOne({email: email.toLowerCase().trim()});

    if(isExistedUser) {
      res.status(409).json(`Email '${email}' is already occupied`); // 409 конфлікт
      return
    }

    next() // команда піти далі, воно перекидує на наступний крок в роутері
  } catch (e) {
    res.json(e);
  }
};

// const checkValidAge = async (req, res, next) => {
//   try {
//     const {age} = req.body;
//
//     const parsedAge = JSON.parse(age);
//     const typeOfAge = typeof parsedAge !== "number";
//     console.log(parsedAge);
//
//     if (typeOfAge) {
//       throw new Error('Age must be a number');
//     }
//
//     next()
//   } catch (e) {
//     console.log(e);
//   }
// }

const checkValidGender = async (req, res, next) => {
  const { gender } = req.body;
  const genderToLowerCase = gender.toLowerCase()

  const maleOrFemale = genderToLowerCase !== 'male' && genderToLowerCase !== 'female';

  if (maleOrFemale) {
    res.json('Gender can be only male or female');
  }

  next()
}

module.exports = {
  checkDublicatedEmail,
  checkValidGender
  // checkValidAge не працює :(
};
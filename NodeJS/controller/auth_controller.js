const { authService } = require('../services')
const { OAuth } = require('../DataBase')

const login = async (req, res, next) => {
  try {
    const { user, body: { password } } = req;

    // Звіряємо пароль введений з body з паролем в базі
    // Пароль який в базі - захешований тому ми перевіряємо за допомогою bcrypt
    await authService.comparePasswords(user.password, password);

    // Генеруємо пару токенів, не обов'язково щось передавати в encodeData
    const tokens = authService.generateToken({userId: user._id});

    // Створюємо в нові колекції в базі даних юзера тільки з його id і токенами
    await OAuth.create({_user_id: user._id, ...tokens})

    res.json({
      user,
      ...tokens
    })
  }catch (e) {
    next(e);
  }
};

const logout = async (req, res, next) => {
  try {
    const authUser = req.authUser;

    // Розлогінити юзера зі всіх девайсів якщо з одного йде logout
    await OAuth.deleteMany({_user_id: authUser._id})

    res.json('Ok')

  } catch (e) {
    next(e);
  }
}


module.exports = {
  login,
  logout
};

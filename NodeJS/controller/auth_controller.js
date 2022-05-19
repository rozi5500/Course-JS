const { authService } = require('../services')
const { OAuth } = require('../DataBase')

const login = async (req, res, next) => {
  try {
    const { user, body: { password } } = req;

    await authService.comparePasswords(user.password, password);

    const tokens = authService.generateToken({userId: user._id});

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

    await OAuth.deleteMany({_user_id: authUser._id})

    res.json('Ok')

  } catch (e) {
    next(e);
  }
};

const refresh = async (req, res, next) => {
  try {
    const token = req.get('Authorization')

    await OAuth.deleteOne({refresh_token: token});

    const generatedTokens = authService.generateToken()

    // Я НЕ ЗНАЮ ЯК ДАЛІ ЮЗЕРА ВЗЯТИ
    const model = await OAuth.create({_user_id: user._id, ...generatedTokens})
    res.json(model)

  } catch (e) {
    next(e);
  }
}


module.exports = {
  login,
  logout,
  refresh
};

const { authService } = require('../services');
const { OAuth } = require('../DataBase');
const { emailService } = require('../services');
const { emailActionsEnum } = require('../constants')

const login = async (req, res, next) => {
  try {
    const { user, body: { password } } = req;

    // В аргументах пишемо - кому відправити почту і тип події яку ми відправляємо
    await emailService.sendMail('kolyabogach12@gmail.com', emailActionsEnum.carArrived)

    await authService.comparePasswords(user.password, password);

    const tokens = authService.generateToken({ userId: user._id });

    await OAuth.create({ _user_id: user._id, ...tokens })

    res.json({
      user,
      ...tokens
    })
  } catch (e) {
    next(e);
  }
};

const logout = async (req, res, next) => {
  try {
    const authUser = req.authUser;

    await OAuth.deleteMany({ _user_id: authUser._id })

    res.json('Logout is successful')

  } catch (e) {
    next(e);
  }
};

const refresh = async (req, res, next) => {
  try {
    const refresh_token = req.get('Authorization');
    const authUser = req.authUser;

    await OAuth.deleteOne({ refresh_token });

    const generatedTokens = authService.generateToken({ userId: authUser._id });

    await OAuth.create({ _user_id: authUser._id, ...generatedTokens });

    res.json({
      authUser,
      ...generatedTokens
    });
  } catch (e) {
    next(e);
  }
}


module.exports = {
  login,
  logout,
  refresh
};

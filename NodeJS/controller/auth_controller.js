const { authService, emailService } = require('../services');
const { OAuth, ActionToken, User } = require('../DataBase');
const { actionTypesEnum, emailActionsEnum } = require('../constants')
const { FRONTEND_URL } = require("../config/config");

const login = async (req, res, next) => {
  try {
    const { user, body: { password } } = req;

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
};

const changePassword = async (req, res, next) => {
  try {
    const { authUser, body: { newPassword } } = req;

    const hashedPassword = await authService.hashPassword(newPassword);
    await User.updateOne({ _id: authUser._id }, { password: hashedPassword });

    res.json('Password is changed')
  } catch (e) {
    next(e);
  }
}

function forgetPassword(email_receiver) {
  return async function(req, res, next) {
    try {
      const { user } = req;

      const token = authService.generateActionToken({ userId: user._id });

      await ActionToken.create({
        _user_id: user._id,
        token,
        actionType: actionTypesEnum.forgot_password
      })

      const forgottenPassUrl = `${FRONTEND_URL}/password/forgot?token=${token}`;

      await emailService.sendMail(email_receiver,
        emailActionsEnum.forgot_password,
        {
          forgottenPassUrl,
          userName: user.name
        });

      res.json('ok')
    } catch (e) {
      next(e);
    }
  }
}


const setNewPassword = async (req, res, next) => {
  try {
    const { body, user } = req;

    const hashedPassword = await authService.hashPassword(body.password);

    await User.updateOne({ _id: user._id }, { password: hashedPassword });
    await OAuth.deleteMany({ _user_id: user._id });
    await ActionToken.deleteMany({ _user_id: user._id });

    res.json('Success')
  } catch (e) {
    next(e);
  }
}


module.exports = {
  login,
  logout,
  refresh,
  changePassword,
  forgetPassword,
  setNewPassword
};

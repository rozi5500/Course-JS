const User = require('../DataBase/user_scheme');
const ApiError = require('../error/ApiError');
const { authService } = require('../services')

module.exports = {

  getUserPages: async (req, res, next) => {
    try {
      const { limit, page } = req.query;

      if (limit < 0 || page < 0) {
        next(new ApiError('Not valid value', 400));
      }

      const skip = (page - 1) * limit;

      const pagedUsers = await User.find().limit(limit).skip(skip);
      const countAllElem = await User.count({});

      res.json({
        page,
        ElementsOnPage: limit,
        data: pagedUsers,
        countAllElem
      })
    } catch (e) {
      next(e);
    }
  },

  getAllUsers: async (req, res, next) => {
    try {
      const users = await User.find();

      res.json(users);
    } catch (e) {
      next(e);
    }
  },

  createUser: async (req, res, next) => {
    try {
      const hashPassword = await authService.hashPassword(req.body.password)
      const createdUser = await User.create({...req.body, password: hashPassword}); // Це працює
      // як Object.assign(), тобто воно з'єднує данні в один об'єкт

      res.status(201).json(createdUser);
    } catch (e) {
      next(e);
    }
  },

  updateUser: async (req, res, next) => {
    try {
      const { name } = req.body;

      const updatedUser = await User.findOneAndUpdate({name: name});

      res.json(updatedUser);
    } catch (e) {
      next(e)
    }
  },

  getOneUserByID: (req, res, next) => {
    try {
      res.json(req.user);
    } catch (e) {
      next(e);
    }
  },

  deleteUser: async (req, res, next) => {
    try {
      const {UserId} = req.params;
      const currentUser = await User.findByIdAndDelete(UserId);

      res.send(currentUser);
    } catch (e) {
      next(e);
    }
  }
};

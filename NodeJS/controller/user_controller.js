const { User } = require('../DataBase');
const { authService } = require('../services');
const { codeStatus } = require('../constants')

module.exports = {

  getUserPages: async (req, res, next) => {
    try {
      const { limit, page } = req.query;

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
      const createdUser = await User.create({...req.body, password: hashPassword});

      res.status(codeStatus.created_status).json(createdUser);
    } catch (e) {
      next(e);
    }
  },

  updateUser: async (req, res, next) => {
    try {
      const { UserId } = req.params;
      const { name, email, password, gender, age } = req.body;

      const updatedUser = await User.findOneAndUpdate(UserId, {
        name,
        age,
        email,
        password,
        gender
      });

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

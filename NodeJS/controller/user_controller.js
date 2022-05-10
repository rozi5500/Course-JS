const User = require('../DataBase/user.scheme');
const ApiError = require('../error/ApiError');

module.exports = {

  getUserPages: async (req, res, next) => {
    try {
      const { limit, page } = req.query;

      if (limit < 0 || page < 0) {
        next(new ApiError('Not valid value', 400));
      }

      const skip = (page - 1) * limit; // page - 1 тому що з фронта нам прийде
      // не 0 елемент а перший, а нам потрібен нульовий 0

      const pagedUsers = await User.find().limit(limit).skip(skip); // Пагінація
      const countAllElem = await User.count({}); // Рахує елементи, можна фільтрувати
      // по якомусь параметру

      res.json({ // такий об'єкт потрібно повертати на фронт
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
      const createdUser = await User.create(req.body);

      res.status(201).json(createdUser); // 201 статус - created
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
      res.json(req.user); // req.user був створенний в мідлварі для того щоб не шукати юзера 2 рази
    } catch (e) {
      next(e);
    }
  },

  deleteUser: async (req, res, next) => {
    try {
      const {UserId} = req.params;
      const currentUser = await User.findByIdAndDelete(UserId);

      if (!currentUser) {
        next(new ApiError('Such a user does not exist', 400));
        return;
      }

      res.send(currentUser);
    } catch (e) {
      next(e);
    }
  }
};

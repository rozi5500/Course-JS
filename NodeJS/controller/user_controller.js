const User = require('../DataBase/user.scheme');

module.exports = {

  getAllUsers: async (req, res) => {
    try {
      const allUsers = await User.find();

      res.json(allUsers)
    } catch (e) {
      res.json({
        message: e
      });
    }
  },

  createUser: async (req, res) => {
    try {
      const createdUser = await User.create(req.body);

      res.status(201).json(createdUser); // 201 статус - created
    } catch (e) {
      res.json({
        message: e
      });
    }
  },

  getOneUserByID: async (req, res) => {
    try {
      const {UserID} = req.params;
      const currentUser = await User.findById(UserID);

      if (!currentUser) {
        res.status(404).json('User is not found')
        return
      }

      res.json(currentUser);
    } catch (e) {
      res.json({
        message: e
      });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const {UserId} = req.params;
      const currentUser = await User.findByIdAndDelete(UserId);

      if (!currentUser) {
        res
          .status(404)
          .json('Such a user does not exist')

        return
      }

      res.send(currentUser);
    } catch (e) {
      res.json({
        message: e
      });
    }
  }
}
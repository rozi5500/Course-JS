const users = require('../DataBase/users');

module.exports = {

  getAllUsers: (req, res) => {
    res.json(users)
  },

  createUser: (req, res) => {
    const channelInfo = req.body;

    console.log(channelInfo);

    users.push(channelInfo)

    res.json(users);
  },

  getOneUserByID: (req, res) => {
    const {UserID} = req.params;
    const currentUser = users[UserID];

    if (!currentUser) {
      res.status(404).json('User is not found')
      return
    }

    res.json(currentUser)
  },

  deleteUser: (req, res) => {
    const {UserId} = req.params;
    const currentUser = users[UserId]

    if (!currentUser) {
      res
        .status(404)
        .json('Such a user does not exist')

      return
    }

    filtredUsers = users.filter(el => el.id !== UserId);

    res.send(filtredUsers);
  }
}
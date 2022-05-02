let users = [
  { id: 0, name: 'Mykola', age: 19 },
  { id: 1, name: 'Palyanitca', age: 17 },
  { id: 2, name: 'Dudka', age: 25 },
  { id: 3, name: 'Compukter', age: 22 }
]

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
    const { UserId } = req.params;
    const currentUser = users[UserId]

    if(!UserId){
      res
        .status(404)
        .json('Such a user does not exist')

      return
    }

    users = users.filter(el => el.id != UserId);

    res.send(users);
  }
}
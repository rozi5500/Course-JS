const { User } = require('../DataBase');
const { codeStatus } = require('../constants')
const { authService, s3Service, filterService } = require('../services');


const getAllUsers = async (req, res, next) => {
  try {
    const filteredResult = await filterService.filterUsers(req.query);

    res.json(filteredResult)

  } catch (e) {
    next(e);
  }
};

const createUser = async (req, res, next) => {
  try {
    const hashPassword = await authService.hashPassword(req.body.password)
    const createdUser = await User.create({ ...req.body, password: hashPassword });

    res.status(codeStatus.created_status).json(createdUser);
  } catch (e) {
    next(e);
  }
};

const updateUser = async (req, res, next) => {
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
};

const getOneUserByID = (req, res, next) => {
  try {
    res.json(req.user);
  } catch (e) {
    next(e);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { UserId } = req.params;
    const currentUser = await User.findByIdAndDelete(UserId);

    res.send(currentUser);
  } catch (e) {
    next(e);
  }
};

const uploadPhoto = async (req, res, next) => {
  try{
    const file = req.files.image;
    const user = req.user;

    const result = await s3Service.uploadFiles(file, 'user', user._id);

    res.json(result)
  }catch (e) {
    next(e);
  }
}


module.exports = {
  getAllUsers,
  getOneUserByID,
  updateUser,
  createUser,
  deleteUser,
  uploadPhoto
};

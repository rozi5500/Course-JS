const Car = require('../DataBase/car_scheme');

const checkDublicatedModel = async (req, res, next) => {
  try {
    const { model = '' } = req.body;

    const isExistedCar = await Car.findOne({model: model.toLowerCase().trim()});

    if (isExistedCar) {
      res.status(409).json(`Model ${model} is occupied`);
      return;
    }

    next()
  } catch (e) {
    res.json(e);
  }
}

module.exports = {
  checkDublicatedModel
}
const Car = require('../DataBase/car_scheme');

const checkDublicatedModel = async (req, res, next) => {
  const {model = ''} = req.body;

  if (!model) {
    throw new Error('Model is required to be written');
  }

  const isExistedCar = await Car.findOne({model: model.toLowerCase().trim()});

  if (isExistedCar) {
    throw new Error('This model is occupied');
  }

  next();
};

const IsNameWritten = async (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    throw new Error('Name is required to be written');
  }

  next();
};

const validYear = async (req, res, next) => {
  const { year } = req.body;

  const parsedYear = JSON.parse(JSON.stringify(year));
  const lengthOfYear = parsedYear.length;

  if (lengthOfYear > 4) {
    throw new Error('Not valid year');
  }

  next();
};

module.exports = {
  checkDublicatedModel,
  IsNameWritten,
  validYear
}
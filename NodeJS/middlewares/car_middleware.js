const Car = require('../DataBase/car_scheme');
const ApiError = require('../error/ApiError')

const checkDoesCarExist = async (req, res, next) => {
  try {
    const { CarId } = req.params;

    const currentCar = await Car.findById(CarId);

    if (!currentCar) {
      next(new ApiError('Car is not found', 404));
      return;
    }

    req.car = currentCar;

    next();
  } catch (e) {
    next(e);
  }
}

const checkDublicatedModel = async (req, res, next) => {
  try{
    const {model = ''} = req.body;

    if (!model) {
      next(new ApiError('Model is required to be written', 400));
    }

    const isExistedCar = await Car.findOne({model: model.toLowerCase().trim()});

    if (isExistedCar) {
      next(new ApiError('This model is occupied', 409));
    }

    next();
  } catch (e) {
    next(e);
  }
};

const IsNameWritten = (req, res, next) => {
  try {
    const { name } = req.body;

    if (!name) {
      next(new ApiError('Name is required to be written', 400));
      return;
    }

    next();
  } catch (e) {
    next(e);
  }
};

const validYear = (req, res, next) => {
  try{
    const { year } = req.body;

    const parsedYear = JSON.parse(JSON.stringify(year));
    const lengthOfYear = parsedYear.length;

    if (lengthOfYear > 4) {
      next(new ApiError('Not valid year', 400));
      return;
    }

    next();
  } catch (e) {
    next(e);
  }
};

module.exports = {
  checkDublicatedModel,
  IsNameWritten,
  validYear,
  checkDoesCarExist
};

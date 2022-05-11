const { Car } = require('../DataBase');
const ApiError = require('../error/ApiError')
const { carValidator } = require('../validators')

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

const checkDuplicatedModel = async (req, res, next) => {
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

const validateCar = (req, res, next) => {
  try{
    const { value, error } = carValidator.CarShemaValidator.validate(req.body);

    if(error) {
      next(new ApiError(error.details[0].message))
      return;
    }

    req.body = value;

    next()
  } catch (e) {
    next(e);
  }
}

module.exports = {
  validateCar,
  checkDuplicatedModel,
  checkDoesCarExist
};

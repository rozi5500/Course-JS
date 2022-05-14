const { Car } = require('../DataBase');
const { ApiError } = require('../error')
const { carValidator, updateCarValidator } = require('../validators')
const { codeStatus, carErrorEnum } = require('../constants')


const checkDoesCarExist = async (req, res, next) => {
  try {
    const { CarId } = req.params;

    const currentCar = await Car.findById(CarId);

    if (!currentCar) {
      next(new ApiError(carErrorEnum.NotFoundCar, codeStatus.not_found_status));
      return;
    }

    req.car = currentCar;

    next();
  } catch (e) {
    next(e);
  }
};

const checkDuplicatedModel = async (req, res, next) => {
  try {
    const { model = '' } = req.body;

    const isExistedCar = await Car.findOne({ model: model.toLowerCase().trim() });

    if (isExistedCar) {
      next(new ApiError(carErrorEnum.OccupiedModel, codeStatus.conflict_status));
    }

    next();
  } catch (e) {
    next(e);
  }
};

const validateCar = (req, res, next) => {
  try {
    const { value, error } = carValidator.CarSchemaValidator.validate(req.body);

    if (error) {
      next(new ApiError(error.details[0].message))
      return;
    }

    req.body = value;

    next()
  } catch (e) {
    next(e);
  }
};

const CarUpdateValidator = (req, res, next) => {
  try{
    const { value, error } = updateCarValidator.CarSchemaUpdateValidator.validate(req.body);

    if(error) {
      next(new ApiError(error.details[0].message, codeStatus.bad_request_status));
      return;
    }

    req.body = Object.assign(req.body, value);

    next()
  }catch (e) {
    next(e);
  }
};


module.exports = {
  validateCar,
  checkDuplicatedModel,
  checkDoesCarExist,
  CarUpdateValidator
};

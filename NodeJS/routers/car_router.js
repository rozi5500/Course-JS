const { Router } = require('express');

const { car_controller } = require('../controller');
const { car_middleware, common_middleware } = require('../middlewares');

const carRouter = Router();

carRouter.get('/', common_middleware.validateQuery, car_controller.getAllCars);

carRouter.post('/',
  car_middleware.validateCar,
  car_middleware.checkDuplicatedModel,
  car_controller.createCar);

carRouter.all('/:CarId', car_middleware.checkDoesCarExist);
carRouter.get('/:CarId', car_controller.getOneCarById);

carRouter.patch('/:CarId',
  car_middleware.CarUpdateValidator,
  car_middleware.checkDuplicatedModel,
  car_controller.updateCar);

carRouter.delete('/:CarId', car_controller.deleteCar);

module.exports = carRouter;

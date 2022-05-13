const { Router } = require('express');

const { car_controller } = require('../controller');
const { car_middleware } = require('../middlewares');

const carRouter = Router();

carRouter.get('/', car_controller.getAllCars);

carRouter.post('/',
  car_middleware.validateCar,
  car_middleware.checkDuplicatedModel,
  car_controller.createCar);

carRouter.get('/pages', car_middleware.validateCarQuery, car_controller.getPageCars);

carRouter.all('/:CarId', car_middleware.checkDoesCarExist);
carRouter.get('/:CarId', car_controller.getOneCarById);

carRouter.patch('/:CarId',
  car_middleware.validateCar,
  car_middleware.checkDuplicatedModel,
  car_controller.updateCar);

carRouter.delete('/:CarId', car_controller.deleteCar);

module.exports = carRouter;

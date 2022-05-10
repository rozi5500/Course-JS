const { Router } = require('express');

const carController = require('../controller/car_controller');
const carMiddleWare = require('../middlewares/car_middleware');

const carRouter = Router();

carRouter.get('/', carController.getAllCars);

carRouter.post('/',
  carMiddleWare.IsNameWritten,
  carMiddleWare.checkDublicatedModel,
  carMiddleWare.validYear,
  carController.createCar);

carRouter.get('/pages', carController.getPageCars);

carRouter.all('/:CarId', carMiddleWare.checkDoesCarExist);
carRouter.get('/:CarId', carController.getOneCarById);
carRouter.patch('/:CarId', carController.updateCar);
carRouter.delete('/:CarId', carController.deleteCar);

module.exports = carRouter;

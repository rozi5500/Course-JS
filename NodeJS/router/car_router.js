const { Router } = require('express');

const carController = require('../controller/car_controller');
const carMiddleWare = require('../middlewares/car_middleware');

const carRouter = Router();

carRouter.get('/', carController.getAllCars);

carRouter.post('/', carMiddleWare.checkDublicatedModel, carController.createCar);

carRouter.get('/:CarID', carController.getOneCarById);

carRouter.delete('/:CarId', carController.deleteCar);

module.exports = carRouter;

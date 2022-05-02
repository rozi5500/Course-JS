const { Router } = require('express');

const carController = require('../controller/car_controller');

const carRouter = Router();

carRouter.get('/', carController.getAllCars);

carRouter.post('/', carController.createCar);

carRouter.get('/:indexCar', carController.getOneCarById);

carRouter.delete('/:CarId', carController.deleteCar);

module.exports = carRouter;

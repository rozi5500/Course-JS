const cars = require('../DataBase/cars')

module.exports = {

  getAllCars: (req, res) => {
    res.json(cars)
  },

  getOneCarById: (req, res) => {
    const {indexCar} = req.params;
    const currentCar = cars[indexCar];

    if (!currentCar) {
      res.status(404).json('Car has not been found');
      return;
    }

    res.json(currentCar);
  },

  createCar: (req, res) => {
    const channelInfo = req.body;

    console.log(channelInfo);

    cars.push(channelInfo);
    res.json(cars);
  },

  deleteCar: (req, res) => {
    const {CarId} = req.params;
    const currentCar = cars[CarId];

    if (!currentCar) {
      res
        .status(404)
        .json('Such a car does not exist');

      return
    }

    filtredCars = cars.filter(el => el.id !== CarId);

    res.send(filtredCars);
  }
}
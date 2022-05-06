const Car = require('../DataBase/car_scheme');

module.exports = {

  getAllCars: async (req, res) => {
    try {
      const allCars = await Car.find();

      res.json(allCars);
    }catch (e) {
      res.json(e);
    }
  },

  getOneCarById: async (req, res) => {
    try {
      const {CarID} = req.params;
      const currentCar = await Car.findById(CarID);

      if (!currentCar) {
        res.status(404).json('Car has not been found');
        return;
      }

      res.json(currentCar);
    } catch (e) {
      res.json(e);
    }
  },

  updateCar: async (req, res) => {
    const {name} = req.body;

    const updatedCar = await Car.findOneAndUpdate({name: name});

    res.json(updatedCar);
  },

  createCar: async (req, res) => {
    try {
      const createdCar = await Car.create(req.body);

      res.status(201).json(createdCar);
    } catch (e) {
      res.json(e);
    }
  },

  deleteCar: async (req, res) => {
    try {
      const { CarId } = req.params;
      const currentCar = await Car.findByIdAndDelete(CarId);

      if (!currentCar) {
        res
          .status(404)
          .json('Such a car does not exist');

        return
      }

      res.send(currentCar);
    } catch (e) {
      res.json(e);
    }
  }
}
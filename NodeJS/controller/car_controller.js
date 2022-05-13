const { Car } = require('../DataBase');

module.exports = {

  getAllCars: async (req, res, next) => {
    try {
      const allCars = await Car.find();

      res.json(allCars);
    } catch (e) {
      next(e);
    }
  },

  getPageCars: async (req, res, next) => {
    try {
      const { limit, page } = req.query;
      const skip = (page - 1) * limit;

      const pagedCars = await Car.find().limit(limit).skip(skip)
      const countElems = await Car.count();

      res.json({
        page,
        ElemsOnPage: limit,
        data: pagedCars,
        countElems
      })

      next();
    } catch (e) {
      next(e);
    }
  },

  getOneCarById: (req, res, next) => {
    try {
      res.json(req.car);
    } catch (e) {
      next(e);
    }
  },

  updateCar: async (req, res, next) => {
    try {
      const { CarId } = req.params;

      const { name, year, model, power } = req.body;

      const updatedCar = await Car.findByIdAndUpdate(CarId , {
        name,
        model,
        year,
        power
      });

      res.json(updatedCar);
    } catch (e) {
      next(e);
    }
  },

  createCar: async (req, res, next) => {
    try {
      const createdCar = await Car.create(req.body);

      res.status(201).json(createdCar);
    } catch (e) {
      next(e);
    }
  },

  deleteCar: async (req, res, next) => {
    try {
      const {CarId} = req.params;
      const currentCar = await Car.findByIdAndDelete(CarId);

      res.send(currentCar);
    } catch (e) {
      next(e);
    }
  }
};

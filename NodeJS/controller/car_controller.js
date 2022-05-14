const { Car } = require('../DataBase');

const getAllCars = async (req, res, next) => {
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
    });

  } catch (e) {
    next(e);
  }
};

const getOneCarById = (req, res, next) => {
  try {
    res.json(req.car);
  } catch (e) {
    next(e);
  }
};

const updateCar = async (req, res, next) => {
  try {
    const { CarId } = req.params;

    const { name, year, model, power } = req.body;

    const updatedCar = await Car.findByIdAndUpdate(CarId, {
      name,
      model,
      year,
      power
    });

    res.json(updatedCar);
  } catch (e) {
    next(e);
  }
};

const createCar = async (req, res, next) => {
  try {
    const createdCar = await Car.create(req.body);

    res.status(201).json(createdCar);
  } catch (e) {
    next(e);
  }
};

const deleteCar = async (req, res, next) => {
  try {
    const { CarId } = req.params;
    const currentCar = await Car.findByIdAndDelete(CarId);

    res.send(currentCar);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getAllCars,
  getOneCarById,
  deleteCar,
  updateCar,
  createCar
}

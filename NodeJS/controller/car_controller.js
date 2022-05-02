
let cars = [
  { id: 0, name: "BMW", year: 2020},
  { id: 1, name: "Mazda", year: 2002},
  { id: 2, name: "Porshe", year: 2022},
  { id: 3, name: "Toyota", year: 1996},
  { id: 4, name: "Range Rover", year: 2015}
]

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
    const { CarId } = req.params;
    const currentCar = cars[CarId];

    if(!currentCar){
      res
        .status(404)
        .json('Such a car does not exist');

      return
    }

    cars = cars.filter(el => el.id != CarId);

    res.send(cars);
  }
}
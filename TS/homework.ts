// - Створити клас який дозволяє створювати об'єкти car, з властивостями модель, виробник, рік випуску, максимальна швидкість, об'єм двигуна.
//   додати в об'єкт функції:
// -- drive () - яка виводить в консоль "їдемо зі швидкістю {максимальна швидкість} на годину"
// -- info () - яка виводить всю інформацію про автомобіль
// -- increaseMaxSpeed (newSpeed) - яка підвищує значення максимальної швидкості на значення newSpeed
// -- changeYear (newValue) - змінює рік випуску на значення newValue
// -- addDriver (driver) - приймає об'єкт який "водій" з довільним набором полів, і добавляє його в поточний об'єкт car


class createCars {
  model: string;
  produced: string;
  year: number;
  maxSpeed: number;
  engineCapacity: number;

  constructor(model: string, produced: string, year: number, maxSpeed: number, engineCapacity?: number) {
    this.model = model;
    this.produced = produced;
    this.year = year;
    this.maxSpeed = maxSpeed;
    this.engineCapacity = engineCapacity;
  }

  drive() {
    console.log(`Їдемо зі швидкістю ${this.maxSpeed} на годину`)
  }

  info() {
    console.log(`Model: ${this.model}, Produced: ${this.produced}, Year: ${this.year},
    Max Speed: ${this.maxSpeed}, Engine Capacity: ${this.engineCapacity}`)
  }

  increaseMaxSpeed(newMaxSpeed: number): any {
    if (newMaxSpeed > this.maxSpeed) {
      this.maxSpeed = newMaxSpeed;
      console.log(`New max speed = ${this.maxSpeed}`)
    } else {
      console.log(`You can't decrease max speed`)
    }
  }

  changeYear(newValue: number): any {
    this.year = newValue;
    console.log(this.year, '- changed year')
  }

}


const bmw = new createCars('BMW', 'Germany', 2020, 250, 2000);

console.log(bmw);
bmw.drive();
bmw.info();
bmw.increaseMaxSpeed(240);
bmw.changeYear(2021);

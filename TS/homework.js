// - Створити клас який дозволяє створювати об'єкти car, з властивостями модель, виробник, рік випуску, максимальна швидкість, об'єм двигуна.
//   додати в об'єкт функції:
// -- drive () - яка виводить в консоль "їдемо зі швидкістю {максимальна швидкість} на годину"
// -- info () - яка виводить всю інформацію про автомобіль
// -- increaseMaxSpeed (newSpeed) - яка підвищує значення максимальної швидкості на значення newSpeed
// -- changeYear (newValue) - змінює рік випуску на значення newValue
// -- addDriver (driver) - приймає об'єкт який "водій" з довільним набором полів, і добавляє його в поточний об'єкт car
var createCars = /** @class */ (function () {
    function createCars(model, produced, year, maxSpeed, engineCapacity) {
        this.model = model;
        this.produced = produced;
        this.year = year;
        this.maxSpeed = maxSpeed;
        this.engineCapacity = engineCapacity;
    }
    createCars.prototype.drive = function () {
        console.log("\u0407\u0434\u0435\u043C\u043E \u0437\u0456 \u0448\u0432\u0438\u0434\u043A\u0456\u0441\u0442\u044E ".concat(this.maxSpeed, " \u043D\u0430 \u0433\u043E\u0434\u0438\u043D\u0443"));
    };
    createCars.prototype.info = function () {
        console.log("Model: ".concat(this.model, ", Produced: ").concat(this.produced, ", Year: ").concat(this.year, ",\n    Max Speed: ").concat(this.maxSpeed, ", Engine Capacity: ").concat(this.engineCapacity));
    };
    createCars.prototype.increaseMaxSpeed = function (newMaxSpeed) {
        if (newMaxSpeed > this.maxSpeed) {
            this.maxSpeed = newMaxSpeed;
            console.log("New max speed = ".concat(this.maxSpeed));
        }
        else {
            console.log("You can't decrease max speed");
        }
    };
    createCars.prototype.changeYear = function (newValue) {
        this.year = newValue;
        console.log(this.year, '- changed year');
    };
    return createCars;
}());
var bmw = new createCars('BMW', 'Germany', 2020, 250, 2000);
console.log(bmw);
bmw.drive();
bmw.info();
bmw.increaseMaxSpeed(240);
bmw.changeYear(2021);

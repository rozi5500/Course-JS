var isBool = true;
var num = 10;
var str = 'str';
var n = null;
var u = undefined;
// Функція нічого не повертає, це і є тип функції void - без повертання
var sayHello = function (user) {
    console.log('Hello', user);
};
// Array type - ми говоримо що тип даних будуть числа, і ці числа будуть находитись в масиві
var list = [1, 2, 3];
// Generic type - за допомогою ключового слова Array ми задаємо тип даних і після цього
// За допомогою <number> описуємо тип даних які будуть в масиві
var list1 = [1, 2, 3];
// Tuple type - якщо ми хочемо, щоб в масиві були декілька типів даних,
// Але в тому порядку в якому записані типи даних
var x = [15, 'hi'];
// Any type - він приймає будь-які типи даних
var y = [902, 'mouse'];
var ex = ['keyboard', 51];
var notSure = true;
notSure = 85;
notSure = 'changed';
notSure = undefined;
// never type - коли функція нескінчена або видає помилку,
// never не повертає результат
var err = function () {
    throw new Error();
};
var a = 42; // Error
// enum
var partsOfBody;
(function (partsOfBody) {
    partsOfBody[partsOfBody["rightHand"] = 2] = "rightHand";
    partsOfBody[partsOfBody["leftHand"] = 4] = "leftHand";
    partsOfBody[partsOfBody["rightLeg"] = 6] = "rightLeg";
    partsOfBody[partsOfBody["leftLeg"] = 8] = "leftLeg";
})(partsOfBody || (partsOfBody = {}));
// таким чином можемо доступатись до енамки по індексу та отримати ключ
// partsOfBody[2]
// partsOfBody[4]
// partsOfBody.rightLeg
// partsOfBody.leftLeg
// Argument type
var createPassword = function (name, age) {
    return "".concat(name).concat(age);
};
// Default value
var createPassword = function (name, age) {
    if (name === void 0) { name = 'User'; }
    if (age === void 0) { age = 24; }
    return "".concat(name).concat(age);
};
// Optional argument age? - тобто не обов'язкове поле для заповнення
var createPassword = function (name, age) {
    if (name === void 0) { name = 'User'; }
    return "".concat(name).concat(age);
};
// Описування типів даних в об'єкті
var user = {
    name: 'Nick',
    age: 4,
    company: false
};
var admin = {
    name: 'Petro',
    age: 22,
    sayHello: function () {
        return "Hello ".concat(this.name);
    }
};
var User = /** @class */ (function () {
    // Тут ми добавляємо можливість приймати ці властивості при ініціалізації
    function User(name, age, company, pass) {
        this.name = name;
        this.age = age;
        this.company = company;
        this.pass = pass;
    }
    return User;
}());
var User = /** @class */ (function () {
    // Для оптимізації кода можна записувати таким чином, тільки треба обов'язково
    // вказувати модифікатор, типу public, private тощо
    function User(name, age, company, pass) {
        this.name = name;
        this.age = age;
        this.company = company;
        this.pass = pass;
    }
    return User;
}());
var User = /** @class */ (function () {
    function User(name) {
        this.name = name;
        this.age = 9;
    }
    // Функція яка змінює значення елемента в якого private модифікатор
    User.prototype.myAge = function (age) {
        this.age = age;
    };
    return User;
}());
var User = /** @class */ (function () {
    function User(name, age) {
        this.name = name;
        this.age = age;
    }
    User.prototype.createPass = function () {
        return "".concat(this.name).concat(User.secret);
    };
    User.secret = 12345; // static property, тобто його видно в класі без створення екземпляру
    return User;
}());
// Це оболочка в якій зберігаються ці змінні
var Util;
(function (Util) {
    Util.password = 50194;
    var name = 'gsneam';
    Util.getHardPass = function () {
        return "".concat(name).concat(Util.password);
    };
})(Util || (Util = {}));
// Використання інтерфейсу в об'єкті
var worker = {
    name: 'Tolyan',
    age: 44
};
// Використання інтерфейсу в класі
var Tolik = /** @class */ (function () {
    function Tolik() {
    }
    Tolik.prototype.getPass = function () {
        return "".concat(this.name).concat(this.age);
    };
    return Tolik;
}());
// Generic type - синтаксис за допомогою якого тип змінної замість T підставиться автоматично
var getter = function (data) { return data; };
// Тут замість Т буде string і таким чином ми можем взяти s.length
var s = getter('fsfsrs');
console.log(s.length);
// А тут замість Т буде тип number і синтаксис JS не дає нам взяти length
// тим самим запобігає появи помилки
var x = getter(15001);
console.log(x);
// Utility Readonly
var user = {
    name: 'Gerax'
};
var obj = { a: 10 }; // Ok
var obj1 = { a: 10, b: 510 }; // А тут обов'язково стають всі поля

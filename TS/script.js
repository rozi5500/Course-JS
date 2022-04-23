var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
function sum(a, b) {
    var sumOfNums = a + b;
    return sumOfNums.toString();
}
var sum1 = sum(10, 900);
console.log(sum1);
function createUser(firstName, lastName, age) {
    // вводу елемента. IUser для типізації на вихідних елементах
    console.log('was');
    return {
        firstName: firstName,
        lastName: lastName,
        age: age,
        car: true
    };
}
var user = createUser('Victor', 'Jora');
console.log(user);
function filterUserBuilder(filterObj) {
    return [];
}
function filterUserBuilder(filterObj) {
    return [];
}
function filterUserBuilder(filterObj) {
    return [];
}
function filterUserBuilder(filterObj) {
    // класс а тільки його частинку і повертати його частину Array<string | number> - такий синтакс дозволяє вказувати
    // декілька значень
    return ['Hello', 'World', 1];
}
filterUserBuilder({ firstName: 'Victor' });
// enum використовується для переліку чогось що надалі буде використовуватись
var ESubject;
(function (ESubject) {
    ESubject["JAVA_SCRIPT"] = "JavaScript";
    ESubject["NODE_JS"] = "NodeJS";
})(ESubject || (ESubject = {}));
var User = /** @class */ (function () {
    function User(name, course) {
        this.name = name;
        this.course = course;
        this.wife = true;
    }
    User.prototype.closeSession = function () {
        this.buyKursova(ESubject.JAVA_SCRIPT); // Таким чином вводиться значення з enum
        this.playGames();
    };
    User.prototype.helpFriend = function (friendName) {
        console.log("I have helped ".concat(friendName));
        this.playGames();
    };
    User.prototype.sayCourse = function () {
        console.log("Hi, I study ".concat(this.course, " course"));
    };
    User.prototype.playGames = function () {
        console.log("".concat(this.name, " is playing games"));
    };
    User.prototype.buyKursova = function (subject) {
        // ESubject це enum який був оголешний вище
        return {
            subject: subject,
            done: true
        };
    };
    return User;
}());
var Human = /** @class */ (function (_super) {
    __extends(Human, _super);
    function Human(name, course) {
        return _super.call(this, name, course) || this;
    }
    Human.prototype.walkWithFriends = function () {
        this.sayCourse();
        this.playGames();
    };
    return Human;
}(User));
var roma = new User('Romchik', 4);
var roman = new Human('Roman Yuriyovich', 10);
// Це тіпа для динамічного взяття ключу але воно чомусь не працює
function getKey(key) {
    return user[key];
}
getKey('firstName');
roma.sayCourse();
roman.walkWithFriends();
roman.helpFriend('Nikita');
roma.closeSession();
roman.walkWithFriends();

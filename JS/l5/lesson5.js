

user1 = {
    name: 'Mykola',
    age: 19,
    job: false, 
    sayhello: () => {
        console.log(`Hello, ${user1.name}`);
    }
};

user2 = {
    name: 'Anton',
    age: 22,
    job: false, 
    sayhello: () => {
        console.log(`Hello, ${user2.name}`);
    }
};

user3 = {
    name: 'Nastya',
    age: 20,
    job: true, 
    sayhello: () => {
        console.log(`Hello, ${user3.name}`);
    }
};


// CLASSES


// Створення класу, зазвичай назва классу пишеться з великої букви 
// як правило доброго тону, це не обов'язково
class User {
    constructor(name, age) { // Конструктор, які поля будуть в об'єкті
        this.name = name; // В того в кого будуєтся поле name, поле name дорівнює name що заданий в конструкторі
        this.age = age; // Теж саме що зверху       
    };
    // Функції які називаються методами в ООП краще писати під конструктором 
    sayhello = () => { 
        console.log(`Hey, ${this.name}`);
    };

    workIn(job = 'manager') {
        console.log(this.name, 'works by a', job);
    }

}; // Тобто ми можемо використовувати цей клас як шаблон для створення юзерів

const jerax = new User('Valera', 20); // new використовується в класах для створення об'єктів 
const misha = new User('Misha', 35);  
const katya = new User('Katya', 25); // Генеруємо скльіки хочемо об'єктів
const masha = new User('Masha', 18);  

console.log(jerax);
console.log(misha);
console.log(katya);
console.log(masha);

valera.sayhello();
misha.workIn('middle developer');



// EXTENDS


class Human {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    greeting() {
        console.log(`Hey, my name is ${this.name}, ${this.age}, years old`);
    }
}


class Developer extends Human { // Клас девелопер який наслідується з Хюмена
    constructor(name, age, skill) {
        super(name, age) // this автоматом вже прописані для цих параметрів
        this.skill = skill; // this потрібно тільки для нових полів
    }

    codding(hours) {
        console.log(`My name is ${this.name} and  I code ${hours} hours per day`);
    }
}


class TeamLead extends Developer {
    constructor(name, age, skill,) {
        super(name, age, skill);
    }

    codding(hours) {
        console.log(`I've already codded that I needed to code`);
    }

    greeting(){
        console.log('Yoo, how is it going?');
    }
}


const anton = new Human('Anton', 22);
const jeka = new Developer('Jeka', 19, 'Node.JS');
const valera = new TeamLead('Valera', 30, ['Node.JS', 'React'])


console.log(jeka);
jeka.greeting(); // Нащадки мають ті же методи
jeka.codding(6);

console.log(valera);
valera.codding(20);
valera.greeting();
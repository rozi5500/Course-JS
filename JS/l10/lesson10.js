const cheburek = {

    name: 'Mouse',
    age: 25,
    job: true
}

cheburek.wife = 'Jennifer';

const array = ['Petya', 'Kolya', 'Vova', 'Victor', 'Anna', cheburek, { name: 'Nataly' }]

// Диструктуризація
const [n1, n2, ...others] = array;

console.log(others);

for (let i = 0; i < array.length; i+=2) {
    console.log(array[i]);

}


for (const iterator of array) {
    console.log(iterator);
}


// Для того щоб витягнути значення ключів об'єкта динамічно
// в масивному стилі
for (const key in cheburek) {
    console.log(cheburek[key]);
}

function test(name = 'Yurii') {
    arrFromArg = Array.from(arguments);
    arrFromArgCopy = [...arguments];

    console.log(arrFromArg);
    console.log(`Yo ${name}`);
}

test('Dima', 'Vasya', 'Petya');

const suplier = {
    name: 'Jorj',
    age: 29,
    car: true
}

const city = {
    name: 'Vancouver',
    age: 170
}


const { name: suplierName } = suplier;
const { name: cityName } = city;

console.log(suplierName, 'from', cityName);



const array = ['Petya', 'Kolya', 'Vova', 'Victor', 'Anna',  { name: 'Nataly' }]

const include = array.includes('Kolya');

const deletedName = array.pop();


const map = array.map((value, index) => {
    return {
        id: index + 1,
        name:value
    }
})



const cheburek = {
    name: 'Mouse',
    age: 25,
    job: true
}


// Це робиться для того щоб зробити копію
// об'єкта щоб не було мутації
const ObjCopy = JSON.parse(JSON.stringify(cheburek));

ObjCopy.name = 'palitra';

test()

function test() {
    console.log('test');
}



const func = () => {
    console.log('func');
}

 func()

function test() {
    let x = 0;

    return () =>{
        x++;

        console.log(x);
    }
}

const num = test();



const p1 = new Promise((resolve, reject) => {
    resolve('Hello p1')
})



const p2 = new Promise((resolve, reject) => {
    resolve('Hello p2')
})


p1
    .then(value => {
        console.log(value);

        return p2;
    })
    .then(value => {
        console.log(value);
    })
    .catch(err => {
        console.error(err);
    })

Promise.allSettled([p1, p2]). then(value => {
    console.log(value);
})

async function test() {
    try {
        const waitP1 = await p1;
        const waitP2 = await p2;

        console.log(waitP1);
        console.log(waitP2);
    } catch (error) {
        console.log(error);
    }

}

test();

const array = ['Petya', 'Kolya', 'Vova', 'Victor', 'Anna',  { name: 'Nataly' }]

array.sort((a, b) => {
    if (a > b) {
        return 1;
    }
        return -1
});

array.forEach(element => {
    if(element.length <= 4){
        return
    }
    console.log(element);
});

// Шукає перший елемент який сходиться інструкцією
const find = array.find(element => element.endsWith('a'));
console.log(find);

const findI = array.findIndex(element => element.startsWith('A'));
console.log(findI);

const filter = array.filter(element => element.length >= 4);
console.log(filter);

const some = array.some(element => element.startsWith('A'));
console.log(some);

const every = array.every(element => element.length >= 4);
console.log(every);

const users = [
    { name: 'Dima', age: 10 },
    { name: 'Nasta', age: 22 },
    { name: 'Volodya', age: 19 },
    { name: 'Yarik', age: 39 },
    { name: 'Jenya', age: 14 },
    { name: 'Taras', age: 44 }
];

const reduce = users.reduce((acc, value) => {

    return acc + value.age
}, 0)

console.log(reduce);


const age = 103;

const checkAge = age >= 103 ? 'Yes' : 'No';

console.log(checkAge);

console.time('1')
for (let i = 0; i < 15; i++) {
    console.log(i);

}

console.timeEnd('1')

const names = 'Ira;Vasya;Petya;Do;Re';
const split = names.split(';');

const map = split.map((value, index) => {
    return {
        id: index + 1,
        name: value
    }
})

console.log(map);

const text = 'Hello I had a turtle and I\'m expressed by a turtle\'s behavior. I did like turtle';
const replaced = text.replaceAll('turtle', 'Pig')

console.log(replaced);


const obj = {
    name: 'Jin',
    age: 305,
    wife: false,
    job: {
        pos: 'Senior',
        since: 2020
    }
}

console.log(obj?.job?.since?.team);
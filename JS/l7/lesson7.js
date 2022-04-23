

const nums = [510, 514, 445, 20, 1, 57, 3, 41, 42, 5155, 155, 876, 35, 5, 12, 95];


const sort = nums.sort((a, b) => {
    return a - b;
})

console.log(sort);

const filter = nums.filter((num) => {
    if (num > 10){
        console.log(num);
    }

})


nums.forEach(element => {
    document.write(element);
    document.write(' ')
});

const map = nums.map((number) => {
    return number * 3;
})

console.log(map);

const sum = nums.reduce((acc, number) =>{
    console.log(acc, 'acc');
    console.log(number, 'num');
    console.log('______');
    
    return acc + number;
})

console.log(sum);

const strings = ['Jornalist', 'Afraid', 'Turkey', 'Mouse', 'Key',
'Itor', 'Phone', 'Person', 'Women', 'America', 'Europe', 'Magazine', 'Kid'];

let filter = strings.sort();
filter = strings.reverse();

console.log(filter);
array = [];

const filter = strings.filter((value) => {
    if (value.length > 4) {
        array.push(value);
    }
    
})

console.log(array);

const changeWords = strings.map((value) => {
    return 'Sam says ' + value;
})

console.log(changeWords);

const users = [
    {name: 'vasya', age: 31, isMarried: false},
    {name: 'petya', age: 30, isMarried: true},
    {name: 'kolya', age: 29, isMarried: true},
    {name: 'olya', age: 28, isMarried: false},
    {name: 'max', age: 30, isMarried: true},
    {name: 'anya', age: 31, isMarried: false},
    {name: 'oleg', age: 28, isMarried: false},
    {name: 'andrey', age: 29, isMarried: true},
    {name: 'masha', age: 30, isMarried: true},
    {name: 'olya', age: 31, isMarried: false},
    {name: 'max', age: 31, isMarried: true}
 ];


const sort = users.sort((a, b) => {
    return b.name.length - a.name.length
})

console.log(sort);

let array = [];

const index = users.map((value, index) => {

    return {
        name: value.name,
        age: value.age,
        isMarried: value.isMarried,
        id: index + 1
    };
    


})

console.log(index);
console.log(array);


const er = '{"name": true, "age":58}';
const object = JSON.parse(er);

console.log(object);

console.log(JSON.stringify([new Number(3), new String('false'), new Boolean(false)]));
console.log(JSON.stringify([new Number(2), new String('Nick'), new Boolean(true)]));


const cars = [
    {producer:"subaru",model: "wrx",year: 2010, color:"blue",type: "sedan",engine: "ej204x",volume: 2,power: 400},
    {producer:"subaru",model: "legacy",year: 2007, color:"silver",type: "sedan",engine: "ez30",volume: 3,power: 250},
    {producer:"subaru",model: "tribeca",year: 2011, color:"white",type: "jeep",engine: "ej20",volume: 2,power: 300},
    {producer:"subaru",model: "leone",year: 1998, color:"yellow",type: "sedan",engine: "ez20x",volume: 2,power: 140},
    {producer:"subaru",model: "impreza",year: 2014, color:"red",type: "sedan",engine: "ej204x",volume: 2,power: 200},
    {producer:"subaru",model: "outback",year: 2014, color:"red",type: "hachback",engine: "ej204",volume: 2,power: 165},
    {producer:"bmw",model: "115",year: 2013, color:"red",type: "hachback",engine: "f15",volume: 1.5,power: 120},
    {producer:"bmw",model: "315",year: 2010, color:"white",type: "sedan",engine: "f15",volume: 1.5, power: 120},
    {producer:"bmw",model: "650",year: 2009, color:"black",type: "coupe",engine: "f60",volume: 6,power: 350},
    {producer:"bmw",model: "320",year: 2012, color:"red",type: "sedan",engine: "f20",volume: 2,power: 180},
    {producer:"mercedes",model: "e200",year: 1990, color:"silver",type: "sedan",engine: "eng200",volume: 2,power: 180},
    {producer:"mercedes",model: "e63", year: 2017, color:"yellow",type: "sedan",engine: "amg63",volume:3,power: 400},
    {producer:"mercedes",model: "c250",year: 2017, color:"red",type: "sedan",engine: "eng25",volume: 2.5,power: 230}
 ];
 

const moreThan2L = cars.filter((value) => {
    if (value.producer === 'bmw' && value.power >= 250) {
        console.log(value);
    }
})


const usersWithAddress = [
    {id: 9, name: 'vasya', age: 31, isMarried: false, address: {city: 'Kyiv', street: 'Gongadze', number: 16}},
    {id: 2, name: 'petya', age: 30, isMarried: true, address: {city: 'Rivne', street: 'Zelena', number: 1}},
    {id: 4, name: 'kolya', age: 29, isMarried: true, address: {city: 'Lviv', street: 'Pasichna', number: 121}},
    {id: 3, name: 'olya', age: 28, isMarried: false, address: {city: 'Rivne', street: 'Shevchenko', number: 90}},
    {id: 8, name: 'max', age: 30, isMarried: true, address: {city: 'Lviv', street: 'Kriva Lipa', number: 115}},
    {id: 6, name: 'anya', age: 31, isMarried: false, address: {city: 'Lviv', street: 'Shevchenko', number: 2}},
    {id: 10, name: 'oleg', age: 28, isMarried: false, address: {city: 'Kyiv', street: 'Centralna', number: 22}},
    {id: 5, name: 'andrey', age: 29, isMarried: true, address: {city: 'Lviv', street: 'Gorodotska', number: 43}},
    {id: 1, name: 'masha', age: 30, isMarried: true, address: {city: 'Kyiv', street: 'Peremogi', number: 12}},
    {id: 7, name: 'olya', age: 31, isMarried: false, address: {city: 'Lviv', street: 'Naukova', number: 16}},
    {id: 11, name: 'max', age: 31, isMarried: true, address: {city: 'Rivne', street: 'Ivana Franka', number: 121}}
];

const sort = usersWithAddress.sort((a, b) => {
    if (a.name > b.name){
        return 1;
    }else{
        return -1;
    }
})
console.log(sort);

const sort = usersWithAddress.sort((a, b) => {
    return a.address.number - b.address.number;
})

console.log(sort);

const less30 = usersWithAddress.filter((value) => {
    if (value.address.number % 2 === 0){
        return value;
    }
})

console.log(less30);


array = ['Форсунка', 'Арсен', 'Діма','Гєна', 'Рома', 'Анастасія'];

array.sort((a, b) => {
    return a[0].localeCompare(b[0])
});

console.log(array);

function orderTour(money, callback) {
    setTimeout(() => {
        if (money > 380){
            return callback(null, {country: 'Turkey', change: money - 380})
        }

        callback('Don\'t have enough money')
    }, 1000);
    
}

function preparing(cb) {
    setTimeout(() => {
        return 'preparing';
    }, 500);
}

orderTour(490, (err, data) => {
    if(err) {
        console.error(err);
    }else{
        console.log('Країна ', data.country);
        console.log(`change ${data.change}`);
        preparing((err, data) => {
            if (err) {
                console.error(err);
            }else{
                console.log(data);
            }
        });
    }

    
});

Set
const testSet = new Set();

testSet.add('Monday');
testSet.add('Tuesday');
testSet.add({day: 'Monday'});
const a = testSet.has('Wednesday');

console.log(testSet);


// Способы чтобы сделать из Set массив
const arrayFromtestSet = [...testSet];
const arrayFromtestSet2 = Array.from(testSet);

arrayFromtestSet.forEach(element => {
    console.log(element);
});

console.log(arrayFromtestSet2);


let x = '431';

//Сделать из строки цифру
let num = +x;
let numFromX = Number(x);

console.log(numFromX);
console.log(num);

let n = '536faf';


// Два мотода для удаления букв, после первого
// непонятного елемента удаляет всё
const ParseIntN = parseInt(n);
const ParseFloatN = parseFloat(n);

console.log(ParseFloatN);
console.log(ParseIntN);

const num = 35.5616;

// Обрізає число на кількість символів вказане в аргументах
let x = +num.toFixed(2)
console.log(x);


const map = new Map();

const car = {car: true};

map.set('name', 'Wasim');
map.set(car, ['Subaru', 'Ferrari']);

let name = map.get('name');
let car1 = map.get(car);

console.log(name);
console.log(car1);


// Нахождение анаграммы
function checkLetters(name, name1) {
    count = 0;
    for (let i = 0; i < name.length; i++) {
        let UpperCaseName = name.toUpperCase();
        let UpperCaseName1 = name1.toUpperCase();
        let index = UpperCaseName[i];
        if (UpperCaseName1.includes(index)) {
            count++;
        }
        
    };
    if (count === name.length) {
        console.log(true);
    }else{
        console.log(false);
    }
}

checkLetters('Valentin', 'lvinvaten');

const obj = {
    user: {
      name: 'Dima',
      wife: {
        age: 33
      }
    }
  }

// Синтаксис на випадок якщо ми не впевнені в уровні вложеності
// або другий елемент, поверне indefined якщо не знайде елемент
console.log(obj?.user?.wife?.car?.mark);    

// Старий синтаксис
console.log(obj && obj.user && obj.user.car && obj.user.car.speed)


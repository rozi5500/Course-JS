

// function oderStatement(money) {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             if (money > 450) {
//                 resolve({country:'The United States', change: money - 450});
//             } else {
//                 reject('We don\'t have enough money')
//             }

//         }, 1100);
//     })
// }

// function preparing() {
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             resolve('I\'m ready')
//         }, 900);
//     })
// }

// function goToAirport(data) {
//     return new Promise((resolve, reject) => {
//         console.log('I bought tickets on', data);
//         setTimeout(() => {
//             if (data === 23.02){
//                 return reject(`Tickets on ${data} haven't left`)
//             }

//             resolve('Chuh chuh')
//         }, 940);
//     })
// }

// oderStatement(460).then((value) => {
//     console.log('Oh yes, we go to', value);
//     console.log('Збирай шмотки');
    
//     return preparing(); 
// })
// .then((state) => {
//     console.log(state);

//     return goToAirport(22.02)
// })
// .then((value) => {
//     console.log(value);
// })

// .catch((reason) => {
//     console.log(`We can't go to vacation because ${reason}`);
// })

// const send1 = new Promise((resolve) => {
//     setTimeout(() => {
//         resolve('Send1')
//     }, 2000);
// })
// const send2 = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         reject('Send2')
//     }, 1000);

// })
// const send3 = new Promise((resolve) => {
//     setTimeout(() => {
//         resolve('Send3');
//     }, 1000);
// })

// console.time('1')

// Promise.all([send1, send2.catch, send3]).then((value) => {
//     console.log(value);
//     console.timeEnd('1')
// })


// Promise.allSettled([send1, send2, send3])
//     .then((value) => {
//         console.log(value);
//     })


// async function vacation() {
//     try {
//         const value = await oderStatement(500);
//     console.log('Oh yes, we go to', value.country); 
//     console.log(`${value.change} left`);
//     console.log('Збирай шмотки');

//     const ready = await preparing();
//     console.log(ready);

//     const roadToAirPort = await goToAirport(23.02);
//     console.log(roadToAirPort);
        
//     } catch (error) {
//         console.log(error);
//     }

    
// }

// vacation();

function wakeUp(time) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {

            if(time > 9){
                resolve('Просипаюсь...');
            }else{
                return reject('Я ше сплю');
            }
        }, 1000)
    })
}

function eat(){
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('Їм')
        }, 300);
    })
}

function shower() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('Душ зачьотний')
        }, 200)
    })
}

function zaryadka() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('Оп оп зарядочка після душа саме то')
        }, 505)
    })
}

function bus(money) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(money > 8){
                resolve('Їдем на автобусі');
                change = money - 8;
            }else{
                return reject('Не хватило на автобус');
            }
        }, 1500)
    })
}

function post(documents) {
    return new Promise((resolve, ) => {
        setTimeout(() => {
            resolve('Забираєм посилку')
        }, 100)
    })
}


function swimmingPools(){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('Пішли в басейн')
        }, 1500)
    })
}

// wakeUp(10)
//     .then((value) => {
//         console.log(value);

//         return eat();
//     })
//     .then((value) => {
//         console.log(value);
//         return shower();
//     })
//     .then((value) => {
//         console.log(value);
//         return zaryadka();
//     })
//     .then((value) => {
//         console.log(value);
//         return bus(10);
//     })
//     .then((value) => {
//         console.log(value);
//         return post();
//     })
//     .then((value) => {
//         console.log(value);
//         return swimmingPools();
//     })
//     .then((value) => {
//         console.log(value);
//     })
//     .catch((error) => {
//         console.log(error);
//     })


// async function actions() {
//     try {
//         const wakeup = await wakeUp(10);
//         console.log(wakeup);
    
//         const eat1 = await eat();
//         console.log(eat1, 'fruit');
    
//         const takingShower = await shower();
//         console.log(takingShower);
    
//         const physicalExercises = await zaryadka();
//         console.log(physicalExercises);
    
//         const waitingForBus = await bus(50);
//         console.log(waitingForBus, `Осталось ${change} грошей`);
    
//         const goToPost = await post();
//         console.log(goToPost);
    
//         const goToSwim = await swimmingPools();
//         console.log(goToSwim);
//     } catch (error) {
//         console.log(error);
//     }

   
// }


// actions();


// employee1 = {
//     name: 'Victor',
//     age: 19,
//     title: 'Senior'
// }

// employee2 = {
//     name: 'Nick',
//     age: 21,
//     title: 'Trainee'
// }

// function changeValues(newAge, newTitle) {
//     console.log('******');
//     console.log(this);
//     console.log('******');
//     this.age = newAge;
//     this.title = newTitle;
// }

// changeValues.call(employee1, 21, 'Junior');
// changeValues.apply(employee2, [34, 'Senior'])

// const copyObj = changeValues.bind(employee2, 34, 'Middle')
// copyObj()

// console.log(employee1);
// console.log(employee2);


// let a = 0;
// let b = ++a;

// console.log(a, 'a');
// console.log(b, 'b');

// array = [10, 20, 30, 40, 50];

// function selfStarter(arr, i = 0) {
    

//     if(i >= array.length){
//         return
//     }
//     console.log('/\\/\\ ');
//     console.log(i);
//     console.log(array[i]);
//     selfStarter(arr, ++i);
// }

// selfStarter(array);


const users = [
    user1 = {
        name: 'Victor',
        haswife: true,
        hasDog: true
    },
    user2 = {
        name: 'Petya',
        haswife:false, 
        hasDog: false
    },
    user3 = {
        name: 'Ruslan',
        haswife:false,
        hasDog: true
    },
    user4 = {
        name: 'Tolik',
        haswife:true,
        hasDog: true
    },
    user5 = {
        name: 'Ibrahim',
        haswife:false,
        hasDog: true
    },
    user6 = {
        name: 'Vasya',
        haswife:true,
        hasDog: false
    },
    user6 = {
        name: 'Roman',
        hasDog: false
    }
];



const findUserHasWife = (users) => {
    
    return users.reduce((acc, user) => {
        
        if(user.hasDog && user.haswife) {
            acc.push(user);
        }

        return acc
    }, [])
}
    


console.log(findUserHasWife(users));

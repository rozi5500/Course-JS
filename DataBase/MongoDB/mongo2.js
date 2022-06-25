
// Агрегатні функції
db.getCollection('teacher').aggregate([
    {}, // функція спрацьовує перша, вона передає свої данні далі по цепочці вниз
    {}, // функція бере данні з верхньої функції і працює з ними і передає далі вниз
    {} // функція теж бере данні працює і передає вниз і так далі

])


// $group, $sort, $project
db.getCollection('teacher').aggregate([
    {
        $group: {
            _id: '$payment', // Поле "_id" по якому групуються елементи
            countOfTeachers: { $sum: 1 } // Рахує скільки об'єктів з таким значенням "payment"
        }
    }, // Ці данні передаются в нижню функцію 
    {
        $sort: { countOfTeachers: 1 } // Сортування по 'countOfTeachers' по зростанню
    },
    {
        $project: { // це функція яка створює новий об'єкт
            money: '$_id', // Створює поле "money" яке зсилається на поле "_id"
            countOfTeachers: 1, // Це поле таким же залишається
            _id: 0 // Видаляєм поле '_id'
        }
    }
])


// $lookup
db.getCollection('teacher').aggregate([
    {
        $lookup: { // З'єднує таблиці(колекції в mongo) між собою аналог join в SQL
            from: 'students', // До якої колекції підключатись
            localField: 'class_curator', // Поле по якому з'єднуватись з другою таблицею і яке є локальне
            foreignField: 'class', // Поле з колекції яку приєднуємо
            as: 'kids' // Як назвати 
        }
    }
])


// $match 
db.getCollection('teacher').aggregate([
    {
        $match: {
            cars: { $exists: 1 } // Сортування тих в кого є поле cars
        }
    },
    {
        $lookup: {
            from: 'students',
            localField: 'class_curator',
            foreignField: 'class',
            as: 'kids'
        }
    },
    {
        $match: {
            'kids.name': 'Ivan' // Сортування дітей з іменем Іван
        }
    }
])


// $unwind розбиває елементи по об'єктах
db.getCollection('teacher').aggregate([
    {
        $match: {
            cars: { $exists: 1 }
        }
    },
    {
        $lookup: {
            from: 'students',
            localField: 'class_curator',
            foreignField: 'class',
            as: 'kids'
        }
    },
    {
        $match: {
            'kids.name': 'Ivan'
        }
    },
    {
        $unwind: '$kids' // розіб'є "kids" по окремих об'єктах
    }
])


// $min, $max, $avg, $sum
db.getCollection('teacher').aggregate([
    {
        $group: {
            _id: 0,
            minPayment: { $min: '$payment' }, // Знаходить мінімальне значення
            maxPayment: { $max: '$payment' }, // Знаходить максимальне значення
            avgPayment: { $avg: '$payment' },// Знаходить середнє значення
            count: { $sum: 1 }, // Знаходить число елементів (1 можна змінювати, таким чином змінювати крок)
            sum: { $sum: '$payment' } // Знаходить суму з поля "payment" тобто додає всі значення між собою 
        }
    }
])



// $count
db.getCollection('teacher').aggregate([
    {
        $match: {
            payment: { $gte: 2500 }
        }
    },
    {
        $count: 'rich_people' // Створює поле "rich_people" та виводить цифру значень    
    }                         // які підлягають вище заданими інструкціями
])


// $addFields, $arrayElemAt
db.getCollection('teacher').aggregate([
    {
        $match: { cars: { $exists: 1 } }
    },
    {
        $addFields: { // Додати поле 
            firstCar: { $arrayElemAt: ['$cars', 0] } // Назва поля "firstCar", з массива "cars" взяти нульовий 0 елемент
        }
    },
    {
        $addFields: { // Додати поле
            secondCar: { $arrayElemAt: ['$cars', 1] } // Назва поля "secondCar", з массива "cars" взяти перший 1 елемент
        }
    }
])
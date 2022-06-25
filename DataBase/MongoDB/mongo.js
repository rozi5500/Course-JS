
// find
db.getCollection('teacher').find({ lesson: 'basic', payment: 2100 })

// filter
db.getCollection('teacher').find(
    { lesson: 'basic', payment: 2100 }, // Кома після "lesson: 'basic'" означає and
    { lesson: 1, name: 1, _id: 0 } // Фільтрація 
)

// or
db.getCollection('teacher').find({
    $or: [
        { lesson: 'basic' },
        { payment: 2000 }
    ]
})

// and
db.getCollection('teacher').find({
    $and: [
        { lesson: 'basic' },
        { payment: 2300 }
    ]

})

db.getCollection('teacher').find({ name: /^o/i }) // == o% in SQL
// ^ значить що звідси починається слово;
//  i значить ігнорування регістру, великі чи маленькі букви

db.getCollection('teacher').find({ name: /vna$/i }) // == %vna in SQL 

db.getCollection('teacher').find({ name: /.*tor.*/i }) // == %tor% in SQL 

db.getCollection('teacher').find({}).sort({ payment: 1, name: -1 }) // Сортування, сортувати можливо не тільки по одному полю

db.getCollection('teacher').find({}).sort({ payment: -1 }).limit(2).skip(4) // Оффсети

db.getCollection('teacher').find({ payment: { $exists: true } }).sort({ payment: 1 }) // Якщо payment існує - сорртуй

db.getCollection('teacher').find({ payment: { $gte: 2500 } }) // payment >= 2500; greater than equals

db.getCollection('teacher').find({ payment: { $lte: 2500 } }) // payment <= 2500; less than equals

db.getCollection('teacher').find({ payment: { $gt: 2500 } }) // payment > 2500; greater than

db.getCollection('teacher').find({ payment: { $lt: 2500 } }) // payment < 2500; less than

db.getCollection('teacher').find({ payment: { $eq: 2500 } }) //  payment === 2500; Строга рівність 

db.getCollection('teacher').find({ payment: { $ne: 2500 } }) // payment !== 2500; Строга нерівність 


db.getCollection('teacher').find({ class_curator: { $in: [5, 6, 7] } }) // Виводить всі поля де class_curator дорівнює цим значенням

db.getCollection('teacher').find({ class_curator: { $nin: [5, 6, 7] } }) // Виводить всі поля де class_curator не дорівнює цим значенням

db.getCollection('teacher').find({ class_curator: { $not: { $in: [5, 6, 7] } } }) // Заперечення з використанням $not

db.getCollection('teacher').update(
    {}, // FIND
    {}, // SET
    {} // OPTIONS
)

db.getCollection('teacher').update( // Додає до teacher одне поле cars
    { payment: { $lt: 2400 } },
    { $set: { cars: ['BMW', 'Tesla'] } }
) 

db.getCollection('teacher').updateMany( // updateMany додає до всіх об'єктів поля cars
    { payment: { $lt: 2400 } },
    { $set: { cars: ['BMW', 'Tesla'] } }
) 

db.getCollection('teacher').updateMany(
    { _id: ObjectId("62519ba7290f2b151afc0d13") },
    { $push: { cars: 'Mercedes' } }
) // push; По-українські додавати щось до массиву

db.getCollection('teacher').update(
    { _id: ObjectId("62519ba7290f2b151afc0d13") },
    { $pull: { cars: 'BMW' } }
) // pull; По-українські видалення 

db.getCollection('teacher').find({ cars: { $size: 3 } }) // Найти об'єкти з трьома машинами 

db.getCollection('teacher').find({ 'cars.1': "Mercedes" }) // Знайти об'єкт в якого Mercedes йде другим по рахунку

db.getCollection('teacher').remove({ class_curator: { $exists: false } }) // Видалення в кого немає поля class_curator

const express = require('express');
const { engine } = require('express-handlebars')
const DBusers = require('./DataBase/users')

const app = express(); // Створюємо аппку до якого підтягуємо експерс як функцію

app.engine('.hbs', engine({defaultLayout: false}));
app.set('view engine', '.hbs');
app.set('views', './static');


// це end point, тут є request і response, завжди повинен повертатись response
app.get('/', (req, res) => {
  res.json('Hi everyone') // робить json.stringify під капотом
})


app.get('/test', (req, res) => {
  res.send('Users are here'); // просто текстовку висилає
})


app.get('/users', (req, res) => {
  res.status(404).json(DBusers)
})


// Динамічне взяття індекса юзера
app.get('/users/:UserIndex', (req, res) => {

  // req.params повертає об'єкт ключем якого буде значення після :
  // В данному випадку це буде об'єкт { UserIndex: "тут буде значення після : " }
  const {UserIndex} = req.params;

  res.json(DBusers[UserIndex] || 'Nothing')

})

app.get('/page', (req, res) => {
  // .write не завершує сервер, треба це робити руками
  res.write(` 
    <div style="color: cadetblue; background-color: lemonchiffon">You will become better and better</div>
  `)

  res.end()
})


app.get('/pager', (req, res) => {
  // 1 аргумент - шлях, 2 аргумент, опціонал: ми можемо передати туда змінну
  // як в цьому випадку і в файлі greeting використати її
  res.render('greeting', {
    userName: 'Pavlo',
    userCars: ['Lamborgini', 'Mazda']
  }); // шлях до файлу з хбс кодом
})


app.listen(5000, () => { // Запуск сервера по суті
  console.log('App is listeting')
})


const express = require('express');
const {engine} = require('express-handlebars');
const DBUsers = require('./users.js')
const DBCars = require('./cars.js')


const app = express();

app.engine('.hbs', engine({defaultLayout: false}));
app.set('view engine', '.hbs')
app.set('views', './hmStatic');


app.get('/welcome', (req, res) => {
  res.render('hmHBS', {
    ownerName: "Mykola",
    ownerLastName: "Bogach",
    ownerAge: 19
  })
})

app.get('/users', (req, res) => {
  res.json(DBUsers);
})

app.get('/users/:indexUser', (req, res) => {
  const {indexUser} = req.params;
  res.json(DBUsers[indexUser] || 'Such a user does not exist')
})

app.get('/cars', (req, res) => {
  res.json(DBCars)
})

app.get('/cars/:indexCar', (req, res) => {
  const {indexCar} = req.params;

  res.json(DBCars[indexCar])
})


app.listen(5000, () => {
  console.log('Listen 5000')
})
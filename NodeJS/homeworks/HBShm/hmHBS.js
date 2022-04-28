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


  if(DBUsers[indexUser]){
    res.json(DBUsers[indexUser])
  }else{
    res.status(404).json('User has not been found');
  }

})

app.get('/cars', (req, res) => {
  res.json(DBCars)
})

app.get('/cars/:indexCar', (req, res) => {
  const {indexCar} = req.params;

  if (DBCars[indexCar]){
    res.json(DBCars[indexCar])
  }else{
    res.status(404).json('Car has not been found')
  }
})


app.listen(5000, () => {
  console.log('Listen 5000')
})
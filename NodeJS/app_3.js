const express = require('express');
const { engine } = require('express-handlebars')

const {PORT} = require('./config/config');
const carRouter = require('./router/car_router');
const reportRouter = require('./router/money_report_router');
const userRouter = require('./router/user_route');

const app = express(); // Створюємо аппку до якого підтягуємо експерс як функцію

app.use(express.json()); // Це для того, щоб навчити експрес читати json files
app.use(express.urlencoded({extended:true})); // А це як джентльменський набір,
// з цим буде краще працювати

app.engine('.hbs', engine({defaultLayout: false}));
app.set('view engine', '.hbs');
app.set('views', './static');


app.use('/cars', carRouter);
app.use('/users', userRouter); // Використовуй userRouter там де шлях починається на /users
app.use('/reports', reportRouter);


app.listen(PORT, () => { // Запуск сервера по суті
  console.log(`Server is listeting ${PORT} PORT`);
});


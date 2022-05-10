const express = require('express');
const { engine } = require('express-handlebars');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const ApiError = require('./error/ApiError');
const carRouter = require('./router/car_router');
const {PORT, MONGO_URL} = require('./config/config');
const reportRouter = require('./router/money_report_router');
const userRouter = require('./router/user_route');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.engine('.hbs', engine({defaultLayout: false}));
app.set('view engine', '.hbs');
app.set('views', './static');

mongoose.connect(MONGO_URL).then(() => {
  console.log('Connection successful')
});

app.use('/cars', carRouter);
app.use('/users', userRouter);
app.use('/reports', reportRouter);
app.use('*', _ErrorNotFoundHandler);
app.use(_MainErrorHandler);

function _ErrorNotFoundHandler(req, res, next) {
  next(new ApiError('Not found', 404));
}


function _MainErrorHandler(err, req, res, next) { // Функція до якої потрапляють всі еррори
  res
    .status(err.status || 500)
    .json({
      message: err.message || 'Server error',
      status: err.status
    })
}

app.listen(PORT, () => {
  console.log(`Server is listeting ${PORT} PORT`);
});


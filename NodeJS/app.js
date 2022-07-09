const express = require('express');
const fileUpload = require('express-fileupload');
const { engine } = require('express-handlebars');
const mongoose = require('Course-JS-SharedModules/dependencies');
const dotenv = require('dotenv');
const swagger = require('swagger-ui-express');
const socketIO = require('socket.io');
const http = require('http');

dotenv.config();

const { ApiError } = require('./error');
const { authRouter, carRouter, userRouter, socketRouter } = require('./routers');
const { PORT, MONGO_URL, NODE_ENV } = require('./config/config');
const { codeStatus, commonErrorEnum } = require('./constants')
const cronRuner = require('./cron')
const swaggerJson = require('./swagger.json')

const app = express();
const server = http.createServer(app)
const io = socketIO(server, { cors: { origin: '*' } });

io.on('connection', (socket) => socketRouter(io, socket))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('.hbs', engine({ defaultLayout: false }));
app.set('view engine', '.hbs');
app.set('views', './static');

mongoose.connect(MONGO_URL).then(() => {
  console.log('Connection to MongoDB is successfully')
});

app.use(fileUpload({}));

if (NODE_ENV === 'stage') {
  const morgan = require('morgan');
  app.use(morgan('dev'));
}

app.use('/auth', authRouter);
app.use('/docs', swagger.serve, swagger.setup(swaggerJson));
app.use('/cars', carRouter);
app.use('/users', userRouter);
app.use('*', _ErrorNotFoundHandler);
app.use(_MainErrorHandler);

function _ErrorNotFoundHandler(req, res, next) {
  next(new ApiError(commonErrorEnum.NotFound, codeStatus.not_found_status));
}

// eslint-disable-next-line no-unused-vars
function _MainErrorHandler(err, req, res, next) {
  res
    .status(err.status || 500)
    .json({
      message: err.message || 'Server error',
      status: err.status
    })
}

server.listen(PORT, () => {
  console.log(`Server is listening ${ PORT } PORT`);

  cronRuner()
});


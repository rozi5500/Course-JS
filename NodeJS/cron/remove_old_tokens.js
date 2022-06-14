const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc')

dayjs.extend(utc);

const { OAuth } = require('../DataBase');

module.exports = async () => {
  // Встановлюємо час, щоб токени які живуть довше ніж заданий час помирали
  const date = dayjs().utc().subtract(5, 'days').toString()

  // І трем токени в який дата створення старіша за дату яку ми встановили, тобто 5 днів
  await OAuth.deleteMany({ createdAt: { $lte: date } });
};

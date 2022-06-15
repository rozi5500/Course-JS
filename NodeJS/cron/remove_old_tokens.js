const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc')

dayjs.extend(utc);

const { OAuth } = require('../DataBase');

module.exports = async () => {
  const date = dayjs().utc().subtract(5, 'days').toString()

  await OAuth.deleteMany({ createdAt: { $lte: date } });
};

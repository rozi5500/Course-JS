const cron = require('node-cron');

const deleteOldTokens = require('./remove_old_tokens')

module.exports = () => {
  cron.schedule('0 0 5 * *', deleteOldTokens)
};

const { emailActionsEnum } = require('../constants');

module.exports = {
  [emailActionsEnum.welcome]: {
    subject: 'We are glad to see a new client',
    emailTemplateName: 'welcome'
  },

  [emailActionsEnum.carArrived]: {
    subject: 'Your car has arrived recently',
    emailTemplateName: 'car-arrived'
  },

  [emailActionsEnum.forgot_password]: {
    subject: 'Seems like you forgot password',
    emailTemplateName: 'forgot-password'
  }
};

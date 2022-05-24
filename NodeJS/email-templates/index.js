const { emailActionsEnum } = require('../constants');

module.exports = {
  // Ми динамічно вказуємо ключ об'єкта(події на який буде трігиритись емейл)
  // І в значенні ставимо subject i emailTemplateName тому що в кожній події
  // різний subject
  [emailActionsEnum.welcome]: {
    subject: 'We are glad to see a new client',
    emailTemplateName: 'welcome'
  },

  [emailActionsEnum.carArrived]: {
    subject: 'Your car has arrived recently',
    emailTemplateName: 'car-arrived'
  }
};

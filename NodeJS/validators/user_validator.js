const Joi = require('joi');

const { constants } = require('../constants')

const UserShemaValidator = Joi.object({
  name: Joi.string().alphanum().min(2).max(25).required().trim(),
  email: Joi.string().email().required().trim().lowercase(),
  age: Joi.number().min(2).max(120),
  password: Joi.string().regex(constants.PASSWORD_REGEX).required(), // Кастомна регулярка для пароля
  gender: Joi.string().valid('male', 'female')
    .when('job', { is: false, then: Joi.required() }), // Якщо job: false то gender
  // стає обов'язковим
  friends: Joi.array().items(Joi.number(), Joi.string()), // friends воно жде як массив в якому
  // може бути намбер або стрінга
  job: Joi.boolean()
});

module.exports = {
  UserShemaValidator
};

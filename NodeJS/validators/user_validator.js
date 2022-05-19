const Joi = require('joi');

const { constants } = require('../constants')

const UserSchemaValidator = Joi.object({
  name: Joi.string().alphanum().min(2).max(25).required().trim(),
  email: Joi.string().email().required().trim().lowercase(),
  age: Joi.number().min(2).max(120),
  password: Joi.string().regex(constants.PASSWORD_REGEX).required(),
  gender: Joi.string().valid('male', 'female')
    .when('job', { is: false, then: Joi.required() }),
  friends: Joi.array().items(Joi.number(), Joi.string()),
  job: Joi.boolean()
});

module.exports = {
  UserSchemaValidator
};

const Joi = require('joi');

const UserSchemaUpdateValidator = Joi.object({
  name: Joi.string().alphanum().min(2).max(25).required(),
  age: Joi.number().min(2).max(180).required(),
  email: Joi.string().email().lowercase(),
  gender: Joi.string().valid('male', 'female')
});

module.exports = {
  UserSchemaUpdateValidator
};

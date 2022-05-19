const Joi = require('joi');

const { constants } = require('../constants')

const loginSchema = Joi.object({
  email: Joi.string().email().trim().lowercase().required(),
  password: Joi.string().regex(constants.PASSWORD_REGEX).required(),
});

module.exports = {
  loginSchema
};

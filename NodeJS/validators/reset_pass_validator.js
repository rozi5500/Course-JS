const Joi = require('joi');

const { constants } = require('../constants')

const resetPassSchema = Joi.object({
  token: Joi.string(),
  password: Joi.string().regex(constants.PASSWORD_REGEX).required(),
});

module.exports = {
  resetPassSchema
};

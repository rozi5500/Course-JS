const Joi = require('joi');

const { constants } = require('../constants')

const CarSchemaUpdateValidator = Joi.object({
  name: Joi.string().alphanum().min(2).max(30).required(),
  model: Joi.string().min(2).lowercase().trim().required(),
  year: Joi.number().min(1920).max(constants.CURRENT_YEAR),
  power: Joi.number().min(200).max(100000)
});

module.exports = {
  CarSchemaUpdateValidator
};

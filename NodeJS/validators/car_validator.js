const Joi = require('joi');

const { constants } = require("../constants");

const CarSchemaValidator = Joi.object({
  name: Joi.string().alphanum().required().trim().min(2).max(30),
  model: Joi.string().lowercase().trim().required(),
  year: Joi.number().min(1920).max(constants.CURRENT_YEAR),
  power: Joi.number().required().min(500).max(100000)
})

module.exports = {
  CarSchemaValidator
};

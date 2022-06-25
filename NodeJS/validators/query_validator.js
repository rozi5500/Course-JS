const Joi = require('joi');

const querySchemaValidator = Joi.object({
  limit: Joi.number().min(0),
  page: Joi.number().min(1),
  search: Joi.string().min(1).max(100),
  age_gte: Joi.number().min(1).max(300),
  age_lte: Joi.number().min(1).max(300)
})

module.exports = {
  querySchemaValidator
};

const Joi = require('joi');


const EmailSchema = Joi.object({
  email: Joi.string().email().trim().lowercase().required()
});


module.exports = {
  EmailSchema
};

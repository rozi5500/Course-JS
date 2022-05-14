const { ApiError } = require("../error");
const { codeStatus } = require("../constants");
const { queryValidator } = require("../validators");


const validateQuery = (req, res, next) => {
  try {
    const { error } = queryValidator.querySchemaValidator.validate(req.query);

    if (error) {
      next(new ApiError(error.details[0].message, codeStatus.bad_request_status));
      return;
    }

    next()
  }catch (e) {
    next(e);
  }
};


module.exports = {
  validateQuery,
};

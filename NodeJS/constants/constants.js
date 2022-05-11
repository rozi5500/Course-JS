module.exports = {
  CURRENT_YEAR: new Date().getFullYear(),
  PASSWORD_REGEX: new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$')
};

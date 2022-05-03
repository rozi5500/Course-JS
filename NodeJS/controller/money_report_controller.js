const moneyReport = require('../DataBase/moneyReport')

module.exports = {

  getSpentMoney: (req, res) => {
    res.json(moneyReport)
  },

  createField: (req, res) => {
    const channelInfo = req.body;

    console.log(channelInfo);

    moneyReport.push(channelInfo);

    res.json(moneyReport)
  },

  getOneField: (req, res) => {
    const { FieldId } = req.params;
    const currentField = moneyReport[FieldId];

    if(!currentField){
      res
        .status(404)
        .json('Field is not found');

      return;
    }
    res.json(currentField)
  },

  deleteField: (req, res) => {
    const { FieldId } = req.params;
    const currentID = moneyReport[FieldId];

    if(!currentID) {
      res
        .status(404)
        .json('Field does not exist');

      return;
    }
    filtredReport = moneyReport.filter(el => el.id !== FieldId);

    res.send(filtredReport);
  }
}
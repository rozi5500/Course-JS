let DBreportMoney = [
  { id: "0", fuel: 1000 },
  { id: "1", food: 2700 },
  { id: "2", newBike: 5000 }
]

module.exports = {

  getSpentMoney: (req, res) => {
    res.json(DBreportMoney)
  },

  createField: (req, res) => {
    const channelInfo = req.body;

    console.log(channelInfo);

    DBreportMoney.push(channelInfo);

    res.json(DBreportMoney)
  },

  getOneField: (req, res) => {
    const { FieldId } = req.params;
    const currentField = DBreportMoney[FieldId];

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
    const currentID = DBreportMoney[FieldId];

    if(!currentID) {
      res
        .status(404)
        .json('Field does not exist');

      return;
    }
    DBreportMoney = DBreportMoney.filter(el => el.id != FieldId);

    res.send(DBreportMoney);
  }
}
const { model, Schema } = require('mongoose');

const Car = new Schema ({
  name: { type: String, trim: true, required: true },
  model: { type: String, trim: true, unique: true },
  year: { type: Number, default: 2000 },
  power: { type: Number, required: true }
}, { timestamps: true })

module.exports = model('car', Car);

const { Schema, model } = require('mongoose');

const userPosEnum = require('../constants/user_positions');

// Створення схеми для опису Юзера
const User = new Schema ({
  name: { type: String, trim: true, required: true },
  position: { type: String, enum: Object.values(userPosEnum), default: userPosEnum.TRAINEE },
  email: { type: String, trim: true, lowercase: true, unique: true, required: true },
  age: { type: Number, default: 24 },
  gender: { type: String, trim: true, lowercase: true }

}, { timestamps: true }) // timestamps true створює поля created at, updated at.

module.exports = model('User', User); // модель це річ яка дозволяє робити .findOne() і так далі
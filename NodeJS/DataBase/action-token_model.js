const { Schema, model } = require('mongoose');
const { actionTypesEnum } = require('../constants')

const actionToken = new Schema({
  _user_id: { type: Schema.Types.ObjectId, trim: true, required: true, ref: 'User' },
  token: { type: String, required: true },
  actionType: { type: String, required: true, enum: Object.values(actionTypesEnum) }
}, { timestamps: true });


module.exports = model('action_token', actionToken);

const { Schema, model } = require('mongoose');
const { authService } = require('../services')

const { userPosEnum } = require('../constants');

const User = new Schema({
  name: { type: String, trim: true, required: true },
  position: { type: String, enum: Object.values(userPosEnum), default: userPosEnum.TRAINEE },
  email: { type: String, trim: true, lowercase: true, unique: true, required: true },
  age: { type: Number, default: 24 },
  gender: { type: String, trim: true, lowercase: true },
  password: { type: String, required: true, default: '', select: false }
},
{
  timestamps: true,
  toJSON:
    {
      virtuals: true,
      transform: deletePassword
    },
  toObject:
    { virtuals: true ,
      transform: deletePassword
    }
});

User.virtual('capsName').get(function() {
  return this.name.toUpperCase()
})

User.statics = {
  async createUserWithHashPass(user) {
    const hashPass = await authService.hashPassword(user.password)

    return this.create({ password: hashPass, ...user })
  }
}

User.methods = {
  hidePassword: () => {
    const user = this.toObject();

    delete user.password;

    return user;
  }
}


module.exports = model('User', User);

function deletePassword(doc, ret) {
  delete ret.password;

  return ret;
}

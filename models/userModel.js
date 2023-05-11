const mongoose = require('mongoose')
const { Schema } = mongoose

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, default: 'abc@xyz.com' },
  password: { type: String, required: true },
})

const UserModel = mongoose.model('users', UserSchema)

module.exports = { UserModel }

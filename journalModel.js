const mongoose = require('mongoose')
const { Schema } = mongoose
const { v4: uuid } = require('uuid')

const JournalsSchema = new Schema({
  id: { type: String, required: true, default: uuid() },
  date: { type: Number, required: true },
  body: { type: String, required: true },
})

JournalsSchema.pre("save",(next) => {
  this.date = Date.now()
  next()
})

const JournalsModel = mongoose.model('journals', JournalsSchema)

module.exports = { JournalsModel }

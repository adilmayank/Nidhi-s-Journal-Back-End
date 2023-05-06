const mongoose = require('mongoose')
const { Schema } = mongoose
const { v4: uuid } = require('uuid')

const JournalsSchema = new Schema({
  id: { type: String, required: true, default: uuid() },
  date: { type: Number, required: true, default: Date.now() },
  body: { type: String, required: true },
})

const JournalsModel = mongoose.model('journals', JournalsSchema)

module.exports = { JournalsModel }

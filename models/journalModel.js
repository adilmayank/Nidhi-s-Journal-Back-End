const mongoose = require('mongoose')
const { Schema } = mongoose

const JournalsSchema = new Schema({
  date: { type: Number, required: true },
  body: { type: String, required: true },
})

const JournalsModel = mongoose.model('journals', JournalsSchema)

module.exports = { JournalsModel }

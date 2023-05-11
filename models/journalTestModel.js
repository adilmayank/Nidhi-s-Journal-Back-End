const mongoose = require('mongoose')
const { Schema } = mongoose

const JournalsTestSchema = new Schema({
  date: { type: Number, required: true },
  body: { type: String, required: true },
})

const JournalsTestModel = mongoose.model('journalsTest', JournalsTestSchema)

module.exports = { JournalsTestModel }

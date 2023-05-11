const { JournalsTestModel } = require('../models/journalTestModel')

const getAllJournals = async () => {
  const allJournals = await JournalsTestModel.find({}).sort({ date: -1 }).lean()
  allJournals.map((item) => {
    item.date = new Date(item.date).toLocaleDateString()
    item.time = new Date(item.date).toLocaleTimeString()
  })
  return allJournals
}

const createJournal = async (body) => {
  await JournalsTestModel({ body, date: Date.now() }).save()
  const allJournals = await JournalsTestModel.find({}).sort({ date: -1 }).lean()
  allJournals.map((item) => {
    item.date = new Date(item.date).toLocaleDateString()
    item.time = new Date(item.date).toLocaleTimeString()
  })
  return allJournals
}

const updateJournal = async (journalId, body) => {
  await JournalsTestModel.findOneAndUpdate({ _id: journalId }, { body })
  const allJournals = await JournalsTestModel.find({}).sort({ date: -1 }).lean()
  allJournals.map((item) => {
    item.date = new Date(item.date).toLocaleDateString()
    item.time = new Date(item.date).toLocaleTimeString()
  })
  return allJournals
}

const removeJournal = async (journalId) => {
  await JournalsTestModel.findOneAndRemove({ _id: journalId })
  const allJournals = await JournalsTestModel.find({}).sort({ date: -1 }).lean()
  allJournals.map((item) => {
    item.date = new Date(item.date).toLocaleDateString()
    item.time = new Date(item.date).toLocaleTimeString()
  })
  return allJournals
}

module.exports = { getAllJournals, createJournal, updateJournal, removeJournal }

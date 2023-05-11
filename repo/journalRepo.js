const { JournalsModel } = require('../models/journalModel')

const getAllJournals = async () => {
  const allJournals = await JournalsModel.find({}).sort({ date: -1 }).lean()
  allJournals.map((item) => {
    item.date = new Date(item.date).toLocaleDateString()
    item.time = new Date(item.date).toLocaleTimeString()
  })
  return allJournals
}

const createJournal = async (body) => {
  await JournalsModel({ body, date: Date.now() }).save()
  const allJournals = await JournalsModel.find({}).sort({ date: -1 }).lean()
  allJournals.map((item) => {
    item.date = new Date(item.date).toLocaleDateString()
    item.time = new Date(item.date).toLocaleTimeString()
  })
  return allJournals
}

const updateJournal = async (journalId, body) => {
  await JournalsModel.findOneAndUpdate({ _id: journalId }, { body })
  const allJournals = await JournalsModel.find({}).sort({ date: -1 }).lean()
  allJournals.map((item) => {
    item.date = new Date(item.date).toLocaleDateString()
    item.time = new Date(item.date).toLocaleTimeString()
  })
  return allJournals
}

const removeJournal = async (journalId) => {
  await JournalsModel.findOneAndRemove({ _id: journalId })
  const allJournals = await JournalsModel.find({}).sort({ date: -1 }).lean()
  allJournals.map((item) => {
    item.date = new Date(item.date).toLocaleDateString()
    item.time = new Date(item.date).toLocaleTimeString()
  })
  return allJournals
}

module.exports = { getAllJournals, createJournal, updateJournal, removeJournal }

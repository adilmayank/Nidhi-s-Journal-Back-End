const { JournalsModel } = require('./journalModel')

const getAllJournals = async () => {
  const allJournals = await JournalsModel.find({})
    .sort({ dateCreated: -1 })
    .lean()
  allJournals.map((item) => {
    item.date = new Date(item.date).toDateString()
  })
  return allJournals
}

const createJournal = async (body) => {
  await JournalsModel({ body }).save()
  const allJournals = await JournalsModel.find({})
    .sort({ dateCreated: -1 })
    .lean()
  allJournals.map((item) => {
    item.date = new Date(item.date).toDateString()
  })
  return allJournals
}

const updateJournal = async (journalId, body) => {
  await JournalsModel.findOneAndUpdate({ id: journalId }, { body })
  const allJournals = await JournalsModel.find({})
    .sort({ dateCreated: -1 })
    .lean()
  allJournals.map((item) => {
    item.date = new Date(item.date).toDateString()
  })
  return allJournals
}

const removeJournal = async (journalId) => {
  await JournalsModel.findOneAndRemove({ id: journalId })
  const allJournals = await JournalsModel.find({})
    .sort({ dateCreated: -1 })
    .lean()
  allJournals.map((item) => {
    item.date = new Date(item.date).toDateString()
  })
  return allJournals
}

module.exports = { getAllJournals, createJournal, updateJournal, removeJournal }

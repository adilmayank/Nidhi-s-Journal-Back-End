const { JournalsTestModel } = require('../models/journalTestModel')

const getAllJournals = async (username) => {
  const allJournals = await JournalsTestModel.find({ username: username })
    .sort({ date: -1 })
    .lean()
  return allJournals
}

const createJournal = async (username, body) => {
  await JournalsTestModel({ username, body, date: Date.now() }).save()
  const allJournals = await JournalsTestModel.find({ username: username })
    .sort({ date: -1 })
    .lean()
  return allJournals
}

const updateJournal = async (username, journalId, body) => {
  await JournalsTestModel.findOneAndUpdate(
    { _id: journalId, username: username },
    { body }
  )
  const allJournals = await JournalsTestModel.find({ username: username })
    .sort({ date: -1 })
    .lean()
  return allJournals
}

const removeJournal = async (username, journalId) => {
  await JournalsTestModel.findOneAndRemove({
    _id: journalId,
    username: username,
  })
  const allJournals = await JournalsTestModel.find({ username: username })
    .sort({ date: -1 })
    .lean()
  return allJournals
}

module.exports = { getAllJournals, createJournal, updateJournal, removeJournal }

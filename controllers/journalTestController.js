const {
  getAllJournals: _getAllJournals,
  createJournal: _createJournal,
  updateJournal: _updateJournal,
  removeJournal: _removeJournal,
} = require('../repo/journalTestRepo')

const getAllJournals = async (req, res) => {
  try {
    const allJournals = await _getAllJournals()
    res.json({ success: true, data: allJournals })
  } catch (error) {
    res.json([{ success: false, error: error.message }])
  }
}

const createJournal = async (req, res) => {
  try {
    const { body } = req.body
    const getAllJournalsAfterCreate = await _createJournal(body)
    res.json({ success: true, data: getAllJournalsAfterCreate })
  } catch (error) {
    res.json([{ success: false, error: error.message }])
  }
}

const updateJournal = async (req, res) => {
  try {
    const { journalId } = req.params
    const { body } = req.body
    const getAllJournalsAfterUpdate = await _updateJournal(journalId, body)
    res.json({ success: true, data: getAllJournalsAfterUpdate })
  } catch (error) {
    res.json([{ success: false, error: error.message }])
  }
}

const removeJournal = async (req, res) => {
  try {
    const { journalId } = req.params
    const getAllJournalsAfterDelete = await _removeJournal(journalId)
    res.json({ success: true, data: getAllJournalsAfterDelete })
  } catch (error) {
    res.json([{ success: false, error: error.message }])
  }
}

module.exports = { getAllJournals, createJournal, updateJournal, removeJournal }

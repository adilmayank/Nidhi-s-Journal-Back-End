const {
  getAllJournals: _getAllJournals,
  createJournal: _createJournal,
  updateJournal: _updateJournal,
  removeJournal: _removeJournal,
} = require('../repo/journalTestRepo')

const fs = require('fs')
const moment = require('moment')

const getAllJournals = async (req, res) => {
  try {
    const { username } = req
    const allJournals = await _getAllJournals(username)
    res.json({ success: true, data: allJournals })
  } catch (error) {
    res.json([{ success: false, error: error.message }])
  }
}

const createJournal = async (req, res) => {
  try {
    const { username } = req
    const { body } = req.body
    const getAllJournalsAfterCreate = await _createJournal(username, body)
    res.json({ success: true, data: getAllJournalsAfterCreate })
  } catch (error) {
    res.json([{ success: false, error: error.message }])
  }
}

const updateJournal = async (req, res) => {
  try {
    const { username } = req
    const { journalId } = req.params
    const { body } = req.body
    const getAllJournalsAfterUpdate = await _updateJournal(
      username,
      journalId,
      body
    )
    res.json({ success: true, data: getAllJournalsAfterUpdate })
  } catch (error) {
    res.json([{ success: false, error: error.message }])
  }
}

const removeJournal = async (req, res) => {
  try {
    const { username } = req
    const { journalId } = req.params
    const getAllJournalsAfterDelete = await _removeJournal(username, journalId)
    res.json({ success: true, data: getAllJournalsAfterDelete })
  } catch (error) {
    res.json([{ success: false, error: error.message }])
  }
}

const downloadAllData = async (req, res) => {
  try {
    const { username } = req
    const allJournals = await _getAllJournals(username)
    const timestamp = moment().format('dd-MM-YYYY-HHmm')
    const filename = `journal_entries_${timestamp}.txt`

    const writeStream = fs.createWriteStream(filename)
    const options = { timeZone: 'Asia/Kolkata' };
    allJournals.forEach((journal) => {
      writeStream.write(
        `Date: ${new Date(journal.date).toLocaleString('en-US', options)}\n\nEntry: ${
          journal.body
        }\n\n\n`
      )
    })
    writeStream.end()

    writeStream.on('finish', () => {
      const readStream = fs.createReadStream(filename)

      readStream.on('end', () => {
        fs.unlink(filename, (err) => {
          if (err) {
          }
        })
      })

      readStream.pipe(res)
    })

    writeStream.on('error', (error) => {
      res.json({ success: false, error: error.message })
    })
    res.setHeader('Content-disposition', `attachment; filename=${filename}`)
    res.setHeader('Content-type', 'text/plain')
  } catch (error) {
    res.json([{ success: false, error: error.message }])
  }
}

module.exports = {
  getAllJournals,
  createJournal,
  updateJournal,
  removeJournal,
  downloadAllData,
}

require('dotenv').config()
const express = require('express')
const { dbConnect } = require('./server')
const cors = require('cors')

const app = express()
app.use(express.json())

app.use(
  cors({
    origin: ['http://localhost:3000', 'https://journalfornidhi.onrender.com'],
  })
)

const PORT = process.env.production || 5000

const {
  getAllJournals,
  createJournal,
  updateJournal,
  removeJournal,
} = require('./journalsRepo')

// get all journals
app.get('/api/v1/journals', async (req, res) => {
  try {
    const allJournals = await getAllJournals()

    res.json(allJournals)
  } catch (error) {
    res.json([{ body: error.message }])
  }
})

//create journal
app.post('/api/v1/journals', async (req, res) => {
  try {
    const { body } = req.body
    const getAllJournalsAfterCreate = await createJournal(body)
    res.json(getAllJournalsAfterCreate)
  } catch (error) {
    res.json([{ body: error.message }])
  }
})

// update journal
app.patch('/api/v1/journals/:journalId', async (req, res) => {
  try {
    const { journalId } = req.params
    const { body } = req.body
    const getAllJournalsAfterUpdate = await updateJournal(journalId, body)
    res.json(getAllJournalsAfterUpdate)
  } catch (error) {
    res.json([{ body: error.message }])
  }
})

// delete journal
app.delete('/api/v1/journals/:journalId', async (req, res) => {
  try {
    const { journalId } = req.params
    const getAllJournalsAfterDelete = await removeJournal(journalId)
    res.json(getAllJournalsAfterDelete)
  } catch (error) {
    res.json([{ body: error.message }])
  }
})

app.listen(PORT, async () => {
  try {
    await dbConnect()
    console.log(`Connected to DB. Listening to port: ${PORT}`)
  } catch (error) {
    console.log(`Error: ${error}`)
  }
})

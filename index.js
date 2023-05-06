require('dotenv').config()
const express = require('express')
const { dbConnect } = require('./server')
const cors = require('cors');

const app = express()
app.use(express.json())

app.use(cors({
    origin: 'https://journalfornidhi-backend.onrender.com'
  }));

const PORT = process.env.production || 5000

const {
  getAllJournals,
  createJournal,
  updateJournal,
  removeJournal,
} = require('./journalsRepo')

// get all journals
app.get('/api/v1/journals', async (req, res) => {
  // get all journals
  const allJournals = await getAllJournals()
  res.json(allJournals)
})

//create journal
app.post('/api/v1/journals', async (req, res) => {
  const { body } = req.body
  const getAllJournalsAfterCreate = await createJournal(body)
  res.json(getAllJournalsAfterCreate)
})

// update journal
app.patch('/api/v1/journals/:journalId', async (req, res) => {
  const { journalId } = req.params
  const { body } = req.body
  const getAllJournalsAfterUpdate = await updateJournal(journalId, body)
  res.json(getAllJournalsAfterUpdate)
})

// delete journal
app.delete('/api/v1/journals/:journalId', async (req, res) => {
  const { journalId } = req.params
  const getAllJournalsAfterDelete = await removeJournal(journalId)
  res.json(getAllJournalsAfterDelete)
})

app.listen(PORT, async () => {
  try {
    await dbConnect()
    console.log(`Connected to DB. Listening to port: ${PORT}`)
  } catch (error) {
    console.log(`Error: ${error}`)
  }
})

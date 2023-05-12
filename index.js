require('dotenv').config()
const express = require('express')
const { dbConnect } = require('./server')
const cors = require('cors')
const { authentication } = require('./middlewares/authentication')

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
} = require('./controllers/journalController')

const {
  getAllJournals: getAllJournalsDev,
  createJournal: createJournalDev,
  updateJournal: updateJournalDev,
  removeJournal: removeJournalDev,
  downloadAllData: downloadAllDataDev,
} = require('./controllers/journalTestController')

const {
  userAuthenticate,
  userSignup,
  userSignin,
} = require('./controllers/userController')

// create a user
app.post('/api/v1/user/signup', userSignup)

// sign in a user
app.post('/api/v1/user/signin', userSignin)

// sign in a user
app.get('/api/v1/user/authenticate', userAuthenticate)

// get all journals
app.get('/api/v1/journals', getAllJournals)

// get all journals test
app.get('/api/v1/dev/journals', [authentication, getAllJournalsDev])

//create journal
app.post('/api/v1/journals', createJournal)

//create journal test
app.post('/api/v1/dev/journals', [authentication, createJournalDev])

// update journal
app.patch('/api/v1/journals/:journalId', updateJournal)

// update journal dev
app.patch('/api/v1/dev/journals/:journalId', [authentication, updateJournalDev])

// delete journal
app.delete('/api/v1/journals/:journalId', removeJournal)

// delete journal dev
app.delete('/api/v1/dev/journals/:journalId', [
  authentication,
  removeJournalDev,
])

app.get('/api/v1/dev/journals/download', [
  authentication,
  downloadAllDataDev,
])

app.listen(PORT, async () => {
  try {
    await dbConnect()
    console.log(`Connected to DB. Listening to port: ${PORT}`)
  } catch (error) {
    console.log(`Error: ${error}`)
  }
})

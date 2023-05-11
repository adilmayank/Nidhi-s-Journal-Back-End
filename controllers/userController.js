const bcrypt = require('bcrypt')
const saltRounds = 10
const { signToken } = require('../Utils/jwtOperations')

const { createUser, findUser } = require('../repo/userRepo')

const userSignup = async (req, res) => {
  try {
    const { username, password } = req.body
    const hashedPassword = await bcrypt.hash(password, saltRounds)
    const { _id, createdUsername } = await createUser(username, hashedPassword)
    const token = signToken(_id, createdUsername)
    res.json({ bearerToken: token })
  } catch (error) {
    res.json({ error: error.message })
  }
}

const userSignin = async (req, res) => {
  try {
    const { username, password } = req.body
    let isPasswordValid = false
    const userFromDb = await findUser(username)
    if (!userFromDb) {
      res.json({ success: false, message: 'user not found' })
    } else {
      isPasswordValid = await bcrypt.compare(password, userFromDb.password)
      if (isPasswordValid) {
        const id = userFromDb._id.toString()
        const token = signToken(id, userFromDb.username)
        res.json({ bearerToken: token })
      } else {
        res.json({ success: false, message: 'invalid credentials' })
      }
    }
  } catch (error) {
    res.json({ error: error.message })
  }
}

module.exports = { userSignup, userSignin }

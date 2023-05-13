const bcrypt = require('bcrypt')
const saltRounds = 10
const { signToken, verifyToken } = require('../Utils/jwtOperations')

const { createUser, findUser } = require('../repo/userRepo')

const userAuthenticate = async (req, res) => {
  try {
    const { authorization: bearerTokenString } = req.headers

    if (!bearerTokenString) {
      throw new Error('No bearer token found.')
    }

    const bearerToken = bearerTokenString.slice(7, bearerTokenString.length)
    const isTokenVerified = verifyToken(bearerToken)
    if (isTokenVerified instanceof Error) {
      res.json({ success: false, error: isTokenVerified.message })
    } else {
      res.json({ success: true })
    }
  } catch (error) {
    res.json({ success: false, error: error.message })
  }
}

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
      res.json({ success: false, message: 'User not found' })
    } else {
      isPasswordValid = await bcrypt.compare(password, userFromDb.password)
      if (isPasswordValid) {
        const id = userFromDb._id.toString()
        const token = signToken(id, userFromDb.username)
        res.json({ success: true, bearerToken: token })
      } else {
        res.json({ success: false, message: 'Invalid credentials' })
      }
    }
  } catch (error) {
    res.json({ error: error.message })
  }
}

module.exports = { userAuthenticate, userSignup, userSignin }

const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET

const signToken = (id, username) => {
  try {
    const signedToken = jwt.sign({ id: id, username: username }, JWT_SECRET, {
      expiresIn: '1h',
    })
    return signedToken
  } catch (error) {
    throw new Error(error.message)
  }
}

const decodeToken = (token) => {
  try {
    const tokenData = jwt.verify(token, JWT_SECRET)
    return tokenData
  } catch (error) {
    throw new Error(error.message)
  }
}

module.exports = { signToken, decodeToken }

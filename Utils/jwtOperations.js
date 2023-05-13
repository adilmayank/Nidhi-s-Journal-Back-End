const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET

const signToken = (id, username) => {
  try {
    const expiresIn = 60 * 30 // 30 minutes
    const signedToken = jwt.sign({ id: id, username: username }, JWT_SECRET, {
      expiresIn: expiresIn,
    })
    return signedToken
  } catch (error) {
    throw new Error(error.message)
  }
}

const verifyToken = (token) => {
  try {
    const currentTime = Date.now() / 1000
    const tokenData = jwt.verify(token, JWT_SECRET)
    const decodedExpirationTime = tokenData.exp

    if (currentTime > decodedExpirationTime) {
      throw new Error('Token expired.')
    }

    return tokenData
  } catch (error) {
    console.log(`Error caught: ${error.name}`)
    return new Error(error.message)
  }
}

module.exports = { signToken, verifyToken }

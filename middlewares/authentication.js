const { verifyToken } = require('../Utils/jwtOperations')

const authentication = (req, res, next) => {
  try {
    const { authorization: bearerTokenString } = req.headers

    if (!bearerTokenString) {
      throw new Error('No bearer token found.')
    }

    const bearerToken = bearerTokenString.slice(7, bearerTokenString.length)
    const decodedToken = verifyToken(bearerToken)
    if (decodedToken instanceof Error) {
      throw new Error(decodedToken.message)
    }
    req.userDBId = decodedToken.id
    req.username = decodedToken.username
    next()
  } catch (error) {
    res.json({ success: false, error: error.message })
  }
}

module.exports = { authentication }

const { UserModel } = require('../models/userModel')

const createUser = async (username, password) => {
  try {
    const user = await UserModel({
      username,
      password,
    }).save()
    return { _id: user._id, createdUsername: user.username }
  } catch (error) {
    if (error.name === 'MongoError' && error.code === 11000) {
      throw new Error('Duplicate key error')
    }
    throw error
  }
}

const findUser = async (username) => {
  try {
    const user = await UserModel.findOne({ username: username })
    return user
  } catch (error) {}
}

module.exports = { createUser, findUser }

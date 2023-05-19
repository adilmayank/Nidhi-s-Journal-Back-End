const { UserModel } = require('../models/userModel')

const createUser = async (username, password) => {
  try {
    const user = await UserModel({
      username,
      password,
    }).save()
    return { _id: user._id, createdUsername: user.username }
  } catch (error) {
    if (error.name === 'MongoServerError' && error.code === 11000) {
      return new Error('Username already exists')
    }
    throw new Error(error.message)
  }
}

const getUserPassword = async (username) => {
  try {
    const user = await findUser(username)
    return user.password
  } catch (error) {
    throw new Error(error.message)
  }
}

const updateUserPassword = async (username, newPassword) => {
  try {
    const updatedUser = await UserModel.findOneAndUpdate(
      { username: username },
      { password: newPassword }
    ).lean()
    return updatedUser
  } catch (error) {
    throw new Error(error.message)
  }
}

const findUser = async (username) => {
  try {
    const user = await UserModel.findOne({ username: username })
    return user
  } catch (error) {
    throw new Error(error.message)
  }
}

module.exports = { createUser, findUser, getUserPassword, updateUserPassword }

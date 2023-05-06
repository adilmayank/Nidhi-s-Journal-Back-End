const mongoose = require('mongoose')

async function dbConnect() {
  return new Promise((resolve, reject) => {
    resolve(
      mongoose.connect(
        `mongodb+srv://adilmayank5894:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}.mongodb.net/?retryWrites=true&w=majority`,
        {
          serverSelectionTimeoutMS: 60000,
        }
      )
    )
  })
}

module.exports = { dbConnect }

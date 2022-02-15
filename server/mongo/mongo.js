const mongoose = require('mongoose')

const config = require('../../config/config.js')

const uri = `mongodb://localhost:${config.server.mongoPort}/blog`

async function mongoConnection() {
  return mongoose.connect(uri)
}

const mongo = mongoConnection()

module.exports = {
  mongo,
  mongoConnection,
}
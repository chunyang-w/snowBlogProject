const mongoose = require('mongoose')

module.exports = new mongoose.Schema({
  name: {
    type: String,
    default: undefined
  },
  email: {
    type: String,
    default: undefined
  },
  homepage: {
    type: String,
    default: undefined
  }
})
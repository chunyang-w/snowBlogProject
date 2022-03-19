const mongoose = require('mongoose')

module.exports = new mongoose.Schema({
  clickable: {
    type: Boolean,
    default: false
  },
  // fontSize possible value:
  // extraLarge
  // large
  // medium
  // small
  // extraSmall
  fontSize: {
    type: String,
    default: 'medium'
  },
  content: {
    type: String,
    default: ''
  },
  linkTarget: {
    type: String,
    default: ''
  },
  comment: {
    type: String,
    default: '',
  }
})
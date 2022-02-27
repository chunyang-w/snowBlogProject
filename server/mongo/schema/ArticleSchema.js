const mongoose = require('mongoose')

module.exports = new mongoose.Schema({
  rank: Number,
  articleTitle: String,
  created: Number,
  online: Boolean,
  lastModified: Number,
  hits: Number,
  content: String
});
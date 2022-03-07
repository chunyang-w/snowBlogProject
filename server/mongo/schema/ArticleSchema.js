const mongoose = require('mongoose')

module.exports = new mongoose.Schema({
  rank: Number,
  articleTitle: String,
  created: Number,
  online: Boolean,
  lastModified: Number,
  hits: Number,
  tag: String,
  summary: String,
  content: String
});
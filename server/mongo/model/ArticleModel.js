const mongoose = require('mongoose')
const ArticleSchema = require('../schema/ArticleSchema.js')

module.exports = mongoose.model('Article', ArticleSchema)
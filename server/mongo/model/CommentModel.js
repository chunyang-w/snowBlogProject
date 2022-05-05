const mongoose = require('mongoose')
const CommentSchema = require('../schema/CommentSchema')

module.exports = mongoose.model('Comment', CommentSchema)
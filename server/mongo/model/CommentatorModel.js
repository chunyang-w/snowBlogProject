const mongoose = require('mongoose')
const CommentatorSchema = require('../schema/CommentatorSchema')

module.exports = mongoose.model('Commentator', CommentatorSchema)
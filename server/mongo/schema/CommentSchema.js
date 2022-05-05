const mongoose = require('mongoose')
// const CommentatorSchema = require('./CommentatorSchema')

const CommentSchema = new mongoose.Schema({
  content: {
    type: String,
    default: undefined
  },
  created: {
    type: Number,
    default: undefined
  },
  parentId: {
    type: String,
    default: undefined
  },
  ownerArticleId: {
    type: String,
    default: undefined
  },
  commentatorName: {
    type: String,
    default: undefined
  },
  commentatorEmail: {
    type: String,
    default: undefined
  },
  commentatorHomePage: {
    type: String,
    default: undefined
  }
  // commentator: {
  //   type: CommentatorSchema,
  //   default: undefined
  // }
})

module.exports = CommentSchema
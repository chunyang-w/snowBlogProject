const express = require('express')
const router = express.Router()
const CommentModel = require('../../mongo/model/CommentModel')
const Response = require('../../response/response')
const config = require('../../../config/config')

router.post('/', async(req, res) => {
  console.log('in open/comment.post',
  {
    payload: req.body
  })
  const commentData = req.body
  commentData['created'] = new Date().getTime()
  commentData['content'] = commentData.commentValue
  await new CommentModel(commentData).save()
  res.send(new Response({
    code: 0,
    data: null,
    message: 'new comment saved'
  }))
})

router.get('/', async(req, res) => {
  console.log('in open/comment.get', {
    payload: req.query
  })
  const filter = req.query
  const commentData = await CommentModel.find(filter)
    .sort({ created: -1 })
  res.send(new Response({
    code: 0,
    data: commentData,
    message: 'commentData found'
  }))
})

module.exports = router
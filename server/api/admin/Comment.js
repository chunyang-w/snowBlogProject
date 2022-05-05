const express = require('express')
const router = express.Router()
const CommentModel = require('../../mongo/model/CommentModel')
const Response = require('../../response/response')

router.delete('/', async(req, res) => {
  console.log('in /admin/comment.delete', {
    filter: req.query
  })
  const filter = req.query
  await CommentModel.deleteMany({
    parentId: filter._id
  }).exec()
  await CommentModel.deleteOne(filter).exec()
  res.send(new Response({
    code: 0,
    data: null,
    message: 'comment deleted.'
  }))
})

module.exports = router
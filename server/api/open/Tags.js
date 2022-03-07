const express = require('express')

const ArticleModel = require('../../mongo/model/ArticleModel')
const Response = require('../../response/response')
const router = express.Router()

router.get('/', async (req, res) => {
  console.log('in open/tag.get')
  const tagCollection = await ArticleModel.find({}, 'tag')
  res.send(new Response({
    code: 0,
    data: tagCollection,
    message: ''
  }))
})

module.exports = router
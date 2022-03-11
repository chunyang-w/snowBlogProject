const express = require('express')

const ArticleModel = require('../../mongo/model/ArticleModel')
const Response = require('../../response/response')
const router = express.Router()

router.get('/', async (req, res) => {
  console.log('in open/articleContent.get', req.query)
  const articleId = req.query.articleId
  const articleList = await ArticleModel.find({ _id: articleId })
  res.send(new Response({
    code: 0,
    data: articleList,
    message: ''
  }))
})

module.exports = router
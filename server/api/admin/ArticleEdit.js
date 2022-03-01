const express = require('express')

const ArticleModel = require('../../mongo/model/ArticleModel')
const Response = require('../../response/response')
const router = express.Router()

router.get('/', async (req, res) => {
  console.log('in articleEdit.get')
  console.log('params data:', req.query)
  const articleId = req.query.articleId
  console.log('articleId', articleId)
  const article = await ArticleModel.findOne({ _id: articleId })
  console.log('articleFound:', article)
  res.send( new Response({
    code: 0,
    data: article,
    message: ''
  }))
})

router.put('/', async (req, res) => {
  console.log('in articleEdit.put')

})

module.exports = router
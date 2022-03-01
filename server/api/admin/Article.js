const express = require('express')

const ArticleModel = require('../../mongo/model/ArticleModel')
const Response = require('../../response/response')
const router = express.Router()


router.post('/', async (req, res) => {
  console.log('in article.post :', req.body)
  const newArticle = new ArticleModel({
    articleTitle: req.body.articleTitle,
    created: new Date().getTime(),
    online: false,
    lastModified: new Date().getTime(),
    hits: 0,
    content: '',
    tag: req.body.tag
  })
  await newArticle.save()
  res.send(new Response({
    code: 0,
    data: null,
    message: 'created'
  }))
})

router.get('/', async (req, res) => {
  console.log('in article.get')
  const ans = await ArticleModel.find()
  res.send(new Response({
    code: 0,
    data: ans,
    message: ''
  }))
})

router.delete('/', async (req, res) => {
  console.log('in article.delete', req.body)
  const articleId = req.body.articleId
  await ArticleModel.deleteOne({ _id: articleId })
  res.send(new Response({
    code: 0,
    data: null,
    message: 'delete success'
  }))
})

router.put('/', async (req,res) => {
  console.log('in article.put:', req.body)
  // console.log('article.put, articleTitle:', articleTitle)
  ArticleModel.findByIdAndUpdate(
    req.body.articleId, req.body
  )
  .then(() => {
    res.send(new Response({
      code: 0,
      data: null,
      message: 'update success'
    }))
  })
})

module.exports = router
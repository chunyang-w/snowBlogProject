const express = require('express')
const { v4: uuidv4 } = require('uuid')

const ArticleModel = require('../mongo/model/ArticleModel')
const Response = require('../response/response')
const router = express.Router()
const config = require('../../config/config')

router.post('/', async (req, res) => {
  console.log(req.body)
  const newArticle = new ArticleModel({
    articleTitle: req.body.articleTitle,
    created: new Date().getTime(),
    online: false,
    lastModified: new Date().getTime(),
    hits: 0,
    content: ''
  })
  await newArticle.save()
  res.send(new Response({
    code: 0,
    data: null,
    message: 'created'
  }))
})

router.get('/', async (req, res) => {
  const ans = await ArticleModel.find()
  res.send(new Response({
    code: 0,
    data: ans,
    message: ''
  }))
})

router.delete('/', async (req, res) => {

})

router.put('/', async (req,res) => {
  console.log(req.params)
})

module.exports = router
const express = require('express')

const ArticleModel = require('../../mongo/model/ArticleModel')
const Response = require('../../response/response')
const router = express.Router()
const config = require('../../../config/config')
const ARTICLE_BATCH = config.server.articleBatch
const returnAttrs = ['articleTitle', 'created', 'lastModified', 'hits', 'tag', 'summary']

router.get('/', async (req, res) => {
  console.log('in open/article.get', JSON.parse(req.query.filter))
  const filterRaw = JSON.parse(req.query.filter)
  const filter = {
    articleTitle: { $regex: new RegExp(filterRaw.articleTitle) },
    created: { $lt: filterRaw.created },
    tag: filterRaw.tag === '' ? { $regex: /.*/ } : filterRaw.tag,
    online: true
  }
  const articleList = await ArticleModel.find(filter, returnAttrs.join(' '))
    .limit(ARTICLE_BATCH)
    .sort({ created: -1 })
  res.send(new Response({
    code: 0,
    data: articleList,
    message: ''
  }))
})

module.exports = router
const express = require('express')

const ArticleModel = require('../../mongo/model/ArticleModel')
const Response = require('../../response/response')
const router = express.Router()

router.put('/', async (req, res) => {
  console.log('in open/hits.put', req.body)
  const articleId = req.body.articleId
  const article = await ArticleModel.findOneAndUpdate({
    _id: articleId
  }, {
    $inc: {
      hits: 1
    }
  }).exec()
  // const filterRaw = JSON.parse(req.query.filter)
  // const filter = {
  //   articleTitle: { $regex: new RegExp(filterRaw.articleTitle) },
  //   created: { $lt: filterRaw.created },
  //   tag: filterRaw.tag === '' ? { $regex: /.*/ } : filterRaw.tag,
  //   online: true
  // }
  // const articleList = await ArticleModel.find(filter, returnAttrs.join(' '))
  //   .limit(ARTICLE_BATCH)
  //   .sort({ created: -1 })
  // res.send(new Response({
  //   code: 0,
  //   data: articleList,
  //   message: ''
  // }))
  res.send(new Response({
    code: 0,
    data: article,
    message: 'increment done'
  }))
})

module.exports = router
const express = require('express')

const articleRouter = require('./Article')
const articleEditRouter = require('./ArticleEdit')

const router = express.Router()

router.use('/article', articleRouter)
router.use('/articleEdit', articleEditRouter)

module.exports = router
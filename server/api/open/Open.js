const express = require('express')
const router = express.Router()

router.use('/article', require('./Article'))
router.use('/tags', require('./Tags'))
router.use('/articleContent', require('./ArticleContent'))
router.use('/pageDetail', require('./PageDetail'))

module.exports = router
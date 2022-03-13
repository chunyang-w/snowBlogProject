const express = require('express')
const router = express.Router()

router.use('/article', require('./Article'))
router.use('/articleEdit', require('./ArticleEdit'))
router.use('/asset', require('./Asset'))

module.exports = router
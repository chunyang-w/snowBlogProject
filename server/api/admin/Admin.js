const express = require('express')
const router = express.Router()

router.use('/article', require('./Article'))
router.use('/articleEdit', require('./ArticleEdit'))
router.use('/asset', require('./Asset'))
router.use('/pageDetail', require('./PageDetail'))
router.use('/textLink', require('./TextLink'))

module.exports = router
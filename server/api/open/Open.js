const express = require('express')
const router = express.Router()

router.use('/article', require('./Article'))
router.use('/tags', require('./Tags'))

module.exports = router
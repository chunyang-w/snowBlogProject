const express = require('express')
const articleRouter = require('./Article')

const router = express.Router()

router.use('/article', articleRouter)

module.exports = router
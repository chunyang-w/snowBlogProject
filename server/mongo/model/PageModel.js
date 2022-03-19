const mongoose = require('mongoose')
const IndexPageSchema = require('../schema/PageSchema')

module.exports = mongoose.model('Page', IndexPageSchema)
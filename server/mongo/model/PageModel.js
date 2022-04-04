const mongoose = require('mongoose')
const PageSchema = require('../schema/PageSchema')

module.exports = mongoose.model('Page', PageSchema)
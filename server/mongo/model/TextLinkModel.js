const mongoose = require('mongoose')
const TextLinkSchema = require('../schema/TextLinkSchema')

module.exports = mongoose.model('TextLink', TextLinkSchema)
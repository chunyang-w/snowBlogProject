const mongoose = require('mongoose')
const { mongo } = require('../mongo')
const AdminSchema = require('../schema/AdminSchema.js')

module.exports = mongoose.model('Admin', AdminSchema)
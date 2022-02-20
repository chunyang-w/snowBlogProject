const mongoose = require('mongoose')
const AdminSchema = require('../schema/AdminSchema.js')

module.exports = mongoose.model('Admin', AdminSchema)
const mongoose = require('mongoose')

module.exports = new mongoose.Schema({
    username: String,
    passwd: String,
    token: String,
    expireTime: Number
})
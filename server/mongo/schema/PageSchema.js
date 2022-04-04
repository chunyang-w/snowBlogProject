const mongoose = require('mongoose')
const TextLinkSchema = require('./TextLinkSchema')

module.exports = new mongoose.Schema({
    name: String,
    imageUrl: {
      type: String,
      default: '/asset/homePage/default.jpeg'
    },
    type: { // define PageType. possible value, contentPage, footerPage
      type: String,
      default: 'contentPage'
    },
    sort: Number,
    textLinkList: [ TextLinkSchema ],
    iconLinkList: [],
    extraInfo: {
      type: String,
      default: ''
    }
})
const mongoose = require('mongoose')
const TextLinkSchema = require('./TextLinkSchema')

module.exports = new mongoose.Schema({
    imageUrl: {
      type: String,
      default: '/asset/indexPage/indexPageImage.png'
    },
    type: { // define PageType. possible value: indexPage, contentPage, footerPage
      type: String,
      default: 'contentPage'
    },
    textLinkList: [ TextLinkSchema ],
    iconLinkList: []
})
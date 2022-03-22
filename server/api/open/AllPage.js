const express = require('express')
const router = express.Router()
const PageModel = require('../../mongo/model/PageModel')
const Response = require('../../response/response')
const config = require('../../../config/config')

const serverUrl= (
  process.env.NODE_ENV === 'dev' ? config.server.devURL :
  process.env.NODE_ENV === 'test' ? config.server.testURL : 
  config.server.prodURL
) + ':' + String(config.server.staticPort)

router.get('/', async(req, res) => {
  let pages = await PageModel.find({})
  pages = pages.sort((idx1, idx2) => idx1.sort - idx2.sort)
  pages.imageUrl = serverUrl + pages.imageUrl
  console.log('in /open/allPages.get', pages)
  res.send(new Response({
    code: 0,
    data: pages,
    message: ''
  }))
})
module.exports = router
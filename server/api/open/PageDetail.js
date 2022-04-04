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


router.get('/', async (req, res) => {
  console.log('in open/pageDetail.get')
  const filter = {
    type: req.query.type
  }
  if (req.query._id !== undefined) {
    filter._id = req.query._id
  }
  const ans = await PageModel.find(filter)
  console.log(ans)
  ans.imageUrl = serverUrl + ans.imageUrl
  res.send(new Response({
    code: 0,
    data: ans,
    message: ''
  }))
})

module.exports = router
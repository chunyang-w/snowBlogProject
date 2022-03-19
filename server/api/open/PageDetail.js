const express = require('express')
const router = express.Router()
const IndexPageModel = require('../../mongo/model/PageModel')
const Response = require('../../response/response')
const config = require('../../../config/config')

const serverUrl= (
  process.env.NODE_ENV === 'dev' ? config.server.devURL :
  process.env.NODE_ENV === 'test' ? config.server.testURL : 
  config.server.prodURL
) + ':' + String(config.server.staticPort)


router.get('/', async (req, res) => {
  console.log('in admin/indexPage.get')
  const ans = await IndexPageModel.findOne({
    type: 'indexPage'
  })
  console.log(ans)
  ans.imageUrl = serverUrl + ans.imageUrl
  res.send(new Response({
    code: 0,
    data: ans,
    message: ''
  }))
})

module.exports = router
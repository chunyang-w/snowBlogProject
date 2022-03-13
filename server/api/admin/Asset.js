const express = require('express')
const formidable = require('formidable')
const Response = require('../../response/response')
const router = express.Router()
const path = require('path')
const ASSET_PATH = path.resolve(__dirname, '../../public')
const { v4:uuidv4, v4 } = require('uuid')
const config = require('../../../config/config')
const { node } = require('webpack')

const serverUrl= (
  process.env.NODE_ENV === 'dev' ? config.server.devURL :
  process.env.NODE_ENV === 'test' ? config.server.testURL : 
  config.server.prodURL
) + ':' + String(config.server.staticPort)

router.post('/', async (req, res) => {
  console.log('in admin/asset.post', req.query)
  let uploadPath
  switch (req.query.type) {
    case 'articleImage':
      uploadPath = ASSET_PATH + '/articleImage'
      break
    default:
      uploadPath = ASSET_PATH
  }
  console.log('uploadToPath:', uploadPath)
  const form = formidable({
    uploadDir: uploadPath,
    filename: (name , ext, part) => {
      const formatString = part.originalFilename.split('.').pop().toLocaleLowerCase()
      return v4() + part.originalFilename.replace(/[^a-zA-Z0-9-_]/g, '') + '.' + formatString
    }
  })
  form.parse(req, (err, fields, files) => {
    if (err) {
      res.send(new Response({
        code: 4,
        data: null,
        message: 'data failed to save'
      }))
    } else {
      const pathArr = files.image.filepath.split('/')
      const assetPath = pathArr.slice(pathArr.length - 2, pathArr.length).join('/')
      console.log('assetPath', assetPath)
      res.send(new Response({
        code: 0,
        data: {
          url: serverUrl + '/asset/' + assetPath,
        },
        message: ''
      }))
    }
  })
})

module.exports = router
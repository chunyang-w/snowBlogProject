const express = require('express')
const router = express.Router()
const TextLinkModel = require('../../mongo/model/TextLinkModel')
const Response = require('../../response/response')

router.post('/', async (req, res) => {
  console.log('in admin/textLink.post')
  const newTextLink = new TextLinkModel()
  newTextLink.save()
  console.log('new textLink created:', newTextLink)
  res.send(new Response({
    code: 0,
    data: newTextLink,
    message: ''
  }))
})

router.delete('/', async (req, res) => {
  await TextLinkModel.findOneAndDelete({
    _id: req.query.id
  })
  res.send(new Response({
    code: 0,
    data: null,
    message: ''
  }))
})

module.exports = router
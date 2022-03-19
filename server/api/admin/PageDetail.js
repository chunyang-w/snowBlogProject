const express = require('express')
const router = express.Router()
const PageModel = require('../../mongo/model/PageModel')
const Response = require('../../response/response')
const TextLinkModel = require('../../mongo/model/TextLinkModel')

router.put('/', async (req, res) => {
  const { pageId, indexImageList, textLinkData, iconLinkData } = req.body
  console.log('in admin/pageDetail.get', indexImageList, textLinkData)
  const textLinkList = []
  const Page = await PageModel.findOne({ _id: pageId })

  // save textLink
  for (let i = 0; i < textLinkData.length; i++) {
    const elem = textLinkData[i]
    console.log('elem to update:', elem)
    await TextLinkModel.findOneAndUpdate({ _id: elem._id }, elem)
    const tempLink = await TextLinkModel.findOne({ _id: elem._id })
    textLinkList.push(tempLink)
    console.log('tempLink', tempLink)
  }
  console.log('temp link list:', textLinkList)

  // save Array
  Page.textLinkList = textLinkList

  // save PageImage

  console.log('pageId', pageId, indexImageList[0].url)
  const pageImagePath = indexImageList[0].url
  const pathList = pageImagePath.split('/')
  const pathPure = '/asset/indexPage/' + pathList[pathList.length - 1]
  Page.imageUrl = pathPure

  // savePage

  await Page.save()

  res.send(new Response({
    code: 0,
    data: null,
    message: ''
  }))
})

router.post('/', async(req, res) => {
  console.log('in admin/pageDetail.post')
  
})

module.exports = router
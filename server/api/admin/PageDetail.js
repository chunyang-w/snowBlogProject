const express = require('express')
const router = express.Router()
const PageModel = require('../../mongo/model/PageModel')
const Response = require('../../response/response')
const TextLinkModel = require('../../mongo/model/TextLinkModel')

router.put('/', async (req, res) => {
  const { pageId, indexImageList, textLinkData, iconLinkData, pageName, pageSort, pageExtraInfo } = req.body
  console.log('in admin/pageDetail.put', indexImageList, textLinkData)
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
  if (indexImageList !== undefined) {
    console.log('pageId', pageId, indexImageList[0].url)
    const pageImagePath = indexImageList[0].url
    const pathList = pageImagePath.split('/')
    const pathPure = '/asset/homePage/' + pathList[pathList.length - 1]
    Page.imageUrl = pathPure
  }


  // save PageName
  if (pageName !== undefined) {
    Page.name = pageName
  }

  // save PageSort
  if (pageSort !== undefined) {
    Page.sort = pageSort
  }

  // save PageExtraInfo
  if (pageExtraInfo !== undefined) {
    Page.extraInfo = pageExtraInfo
  }

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
  await new PageModel({
    type: 'contentPage',
    sort: req.body.sort,
    name: req.body.name
  }).save()
  res.send(new Response({
    code: 0,
    data: null,
    message: 'contentPage created'
  }))
})

router.delete('/', async(req, res) => {
  console.log('in admin/pageDetail.delete')
  await PageModel.deleteOne({
    _id: req.body._id
  })
  res.send(new Response({
    code: 0,
    data: null,
    message: 'delete success'
  }))
})

module.exports = router
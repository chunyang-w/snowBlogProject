const express = require('express')
const { v4: uuidv4 } = require('uuid')

const AdminModel = require('../mongo/model/AdminModel')
const Response = require('../response/response')
const router = express.Router()
const config = require('../../config/config')

router.post('/', async (req, res) => {
  let match
  const [username, passwd] = [req.body.username, req.body.passwd]
  console.log('[login]: login request received')

  const admin = await AdminModel.findOne({
    username: username
  }).exec()

  if (admin === null) {
    match = false
  } else {
    console.log(admin.passwd, passwd)
    match = admin.passwd === passwd ? true : false
  }
  if (match === false) {
    res.send(new Response({
      code: 1,
      data: null,
      message: 'Account or passwd incorrect'
    }))
  } else {
    const token = uuidv4()
    const expireTime = (new Date()).getTime() + config.server.tokenExpireTime
    const ans = await AdminModel.updateOne({
      username: admin.username
    }, {
      token,
      expireTime
    })
    if (ans.acknowledged) {
      res.send(new Response({
        code: 0,
        data: {
          username: admin.username,
          token
        }
      }))
    } else {
      res.send(new Response({
        code: 1,
        data: null,
        message: 'Mongo error'
      }))
    }
  }
})

module.exports = router
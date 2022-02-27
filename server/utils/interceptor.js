const AdminModel = require('../mongo/model/AdminModel')
const Response = require('../response/response')

module.exports = async function interceptor (req, res, next) {
  console.log('[interceptor]: request from domain:', req.path,'received')
  if (/^\/admin/.test(req.path)){
    console.log('[interceptor] admin privileged only, checking access...')
    const token = req.headers['authtoken']
    const username = req.headers['username']
    const admin = await AdminModel.findOne({
      username: username
    }).exec()
    const currentTime = new Date().getTime()
    if (currentTime > admin.expireTime) {
      console.log('[interceptor] token outdated:', currentTime, admin.expireTime)
      res.send(new Response({
        code: 2,
        data: null,
        message: 'Token expire, redirect to login page...'
      }))
      return
    }
    if (admin.token !== token) {
      console.log('[interceptor] token not valid:', token)
      res.send(new Response({
        code: 3,
        data: null,
        message: 'Token not valid'
      }))
      return
    }
    console.log('[interceptor]: access granted')
  }
  next()
}
const AdminModel = require('../mongo/model/AdminModel')
const Response = require('../response/response')

module.exports = async function interceptor (req, res, next) {
  console.log('[interceptor]: request from domain:', req.path,'received')
  if (/^\/admin/.test(req.path)){
    const token = req.headers['authtoken']
    const username = req.headers['username']
    const admin = await AdminModel.findOne({
      username: username
    }).exec()
    const currentTime = new Date().getTime()
    if (currentTime > admin.expireTime) {
      res.send(new Response({
        code: 2,
        data: null,
        message: 'Token expire, redirect to login page...'
      }))
    }
    if (admin.token !== token) {
      res.send(new Response({
        code: 3,
        data: null,
        message: 'Token not valid'
      }))
    }
  }
  next()
}
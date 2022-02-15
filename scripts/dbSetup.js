const AdminModel = require('../server/mongo/model/AdminModel')
const config = require('../config/config')

async function mongoSetUp() {
  const admin = await AdminModel.exists()
  if (admin === null) {
    console.log('Creating Admin Account')
    new AdminModel({
      username: config.admin.login.username,
      passwd: config.admin.login.passwd
    }).save()
  } else {
    console.log('Admin exist:', admin)
  }
}

module.exports = {
  mongoSetUp
}
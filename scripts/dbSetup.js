const AdminModel = require('../server/mongo/model/AdminModel')
const PageModel = require('../server/mongo/model/PageModel')
const config = require('../config/config')

async function mongoSetUp() {
  // find init Admin object
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

  // find and init IndexPage
  const indexPage = await PageModel.findOne({
    type: 'indexPage'
  })
  if (indexPage === null) {
    console.log('Create Index Page')
    new PageModel({
      type: 'indexPage',
      sort: -Number.MAX_SAFE_INTEGER
    }).save()
  } else {
    console.log('Index Page already exist: ', indexPage)
  }

  // find and init IndexPage
  const footerPage = await PageModel.findOne({
    type: 'footerPage'
  })
  if (footerPage === null) {
    console.log('Create Index Page')
    new PageModel({
      type: 'footerPage',
      sort: Number.MAX_SAFE_INTEGER
    }).save()
  } else {
    console.log('footerPage already exist: ', footerPage)
  }
}

module.exports = {
  mongoSetUp
}
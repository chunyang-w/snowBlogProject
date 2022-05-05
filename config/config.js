const config = {
  blog: {
    blogName: '狸花猫 snow 的博客'
  },
  admin: {
    login: {
      username: 'admin',
      passwd: 'admin666'
    }
  },
  browserWindow: {
    limit: 600
  },
  style: {
  },
  server: {
    staticPort: 3300,
    apiPort: 3310,
    mongoPort: 3320,
    devURL: 'http://localhost',
    testURL: 'http://localhost',
    prodURL: 'http://localhost',
    tokenExpireTime: 5000000,
    articleBatch: 10,
  }
}

module.exports = config
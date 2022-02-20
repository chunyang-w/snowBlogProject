const config = {
  blog: {
    blogName: 'snow2512\'s blog'
  },
  admin: {
    login: {
      username: 'admin',
      passwd: 'admin666'
    }
  },
  browserWindow: {
    limit: 950
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
    tokenExpireTime: 100000,
  }
}

module.exports = config
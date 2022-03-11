const express =  require('express')
const { spawn } = require('child_process')
const path = require('path')
const config = require('../config/config.js')
const cors = require('cors')

// Static Server
const staticServer = express()
const connectHistoryApiFallback = require('connect-history-api-fallback')
staticServer.use(connectHistoryApiFallback())

// API Server
const apiServer = express()
const interceptor = require('./utils/interceptor')
apiServer.set('query parser', 'extended')
apiServer.use(express.json({limit: '50mb'}))
apiServer.use(express.urlencoded({limit: '50mb'}))
apiServer.use(cors())
apiServer.use(interceptor)
apiServer.use('/login', require('./api/Login'))
apiServer.use('/admin', require('./api/admin/Admin'))
apiServer.use('/open', require('./api/open/Open'))

// Mongod Server
const dbPath = path.resolve(__dirname, '../database/data')
const logPath = path.resolve(__dirname, '../database/log/blog.log')
const mongodConnection = spawn(
  'mongod',
  [
    '--dbpath', dbPath, 
    '--logpath', logPath,
    '--port', config.server.mongoPort
  ]
)

module.exports = {
  staticServer,
  apiServer,
  mongodConnection
}
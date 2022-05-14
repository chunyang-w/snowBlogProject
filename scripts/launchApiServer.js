// Server import:
const { apiServer, mongodConnection } = require('../server/servers')

// Config import:
const config = require('../config/config')

// Mongo:
const { mongo } = require('../server/mongo/mongo')
const { mongoSetUp } = require('./dbSetup')

// API Server Start
mongodConnection.addListener('spawn', async () => {
  console.log('MongoDB service started')
  console.log('Initiating MongoDB connection...')

  await mongo
  await mongoSetUp()
  console.log('Mongo connected')
  apiServer.listen(config.server.apiPort,
    (err) => {
      if (err) {
        console.error(err)
      } else {
        console.log('api server started')
      }
  })
})

// Mongod Error Reporter
mongodConnection.on('error', (e) => {
  console.log(e)
})

// Close Mongod before exit
process.on('beforeExit', () => {
  mongodConnection.kill()
})

// mongoConnection.stdout.on('data', (d) => {
//   console.log('data output')
//   console.log(String(d))
// })
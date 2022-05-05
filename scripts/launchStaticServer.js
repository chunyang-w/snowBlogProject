// Package import:
const path = require('path')
const express = require('express')
const CFonts = require('cfonts')

CFonts.say('SNOW \n BLOG', {
  font: 'simple',
  colors: ['cyan', 'yellow'],
  align: 'center'
})
// Server import:
const { staticServer  } = require('../server/servers')

// Config import:
const config = require('../config/config')

// Set public path:
staticServer.use('/asset',express.static(path.join(__dirname, '..', 'server', 'public')))

// Pack FrontEnd Code:
if (process.env.NODE_ENV === 'dev') {
  // enable HMR function and Front-end devServer, then start server
  const webpack = require('webpack')
  const webpackConfig = require('../webpack.dev.js')
  const WebpackDevMiddleware = require('webpack-dev-middleware')
  const WebpackHotMiddleware = require('webpack-hot-middleware')
  const compiler = webpack(webpackConfig)
  staticServer.use(WebpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    stats: 'errors-only',
  }))
  staticServer.use(WebpackHotMiddleware(compiler, {
    log: console.log,
    heartbeat: 2 * 1000,
  }))
} else if (process.env.NODE_ENV ==='prod' | process.env.NODE_ENV === 'test') {
  // bundle up all resources and launch server
  const webpack = require('webpack')
  const webpackConfig = require('../webpack.prod.js')
  const compiler = webpack(webpackConfig)
  compiler.run(() => {
    console.log('application packed')
    staticServer.use('/',express.static(path.join(__dirname, '..', 'dist')))
  })
}

// Static Server Start
staticServer.listen(config.server.staticPort, (err) => {
  if (err) {
    console.error(err)
  } else {
    console.log('static server started')
  }
})

const webpack = require('webpack')
const path = require('path')
const appDate = require('./data.json')
const seller = appDate.seller
const goods = appDate.goods
const ratings = appDate.ratings

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': [
          './src/theme'
        ]
      }
    }
  },
  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: true
    }
  },
  devServer: {
    before(app) {
      app.get('/api/seller', function (req, res) {
        res.json({
          error: 0,
          date: seller
        })
      }),
      app.get('/api/goods', function (req, res) {
        res.json({
          error: 0,
          date: goods
        })
      }),
      app.get('/api/ratings', function (req, res) {
        res.json({
          error: 0,
          date: ratings
        })
      })
    }
  },
  chainWebpack(config) {
    config.resolve.alias
      .set('components', resolve('src/components'))
      .set('common', resolve('src/common'))
      .set('api', resolve('src/api'))

    config.plugin('context')
      .use(webpack.ContextReplacementPlugin,
        [/moment[/\\]locale$/, /zh-cn/])
  }
}

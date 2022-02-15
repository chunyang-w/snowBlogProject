## webpack 生产/开发环境配置

根据不同环境 （开发/ 生产） 来打包产物是有必要的，这可以帮助项目在各个阶段根据目标环境优化打包策略。比如，在开发环境下我们不一定需要压缩代码，但是需要一个 source map 工具； 然而在开发环境下，一个完备的 source map 工具会占用太大的体积，影响加载速度，所以我们最好剔除它，并压缩代码。

所以我们需要对不同的环境配置不同的打包行为。

为了践行 DRY （Don't Repeat Yourself）原则，我们使用 webpack-merge 工具，方便我们从一个 `webpack.config.common.js` 拓展出开发环境和生产环境的配置

### 安装 webpack-merge

`npm install --save-dev webpack-merge`

然新建三个文件：

```
|-webpack.common.js
|-webpack.dev.js
|-webpack.prod.js
```

在 webpack.dev.js 和 webpack.prod.js 中引入

```javascript
// webpack.dev.js
const { merge } = require('webpack-merge');
 const common = require('./webpack.common.js');

module.exports = merge(common, {
   mode: 'development',
   devtool: 'inline-source-map',
   devServer: {
     static: './dist',
   },
})
```

```javascript
// webpack.prod.js
const { merge } = require('webpack-merge');
 const common = require('./webpack.common.js');

module.exports = merge(common, {
   mode: 'production'
})
```

### 分割原则：

原则上公用的配置应该写在 webpack.common.js 中, 在 dev 与 prod 中单独编写各自所需的配置。

## webpack 美化输出

很多时候我们并不想看到 webpack 控制台中输出的杂乱信息，通过 3 个办法可以美化输出：

1. [webpackbar](https://www.npmjs.com/package/webpackbar) 插件
   1. 这是一个显示 webpack 打包进度的插件。许多知名开源项目中就集成了这个插件，如 vue-cli
2. 通过配置 [stats](https://webpack.docschina.org/configuration/stats/) 字段可以控制控制台输出的信息。
3. [Friendly-errors-webpack-plugin](https://www.npmjs.com/package/friendly-errors-webpack-plugin)


## webpack 树摇
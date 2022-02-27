# 项目踩坑记录

## 静态资源无法访问

在 webpack 的 output 配置中设置 `publicPath: /` 即可解决问题。

如果不这么写的话，请求的资源会基于当前路径。比如在 'http://localhost/admin/article' 下请求的文件会自动在 'http://localhost/admin' 这个路径下寻找。但是 webpack 打包的文件中并没有 admin 这个文件夹，所以很自然也就无法访问。

在加了这个配置项之后，文件访问链接会从 
`<script defer src="main.bundle.js"></script><link href="/main.css" rel="stylesheet"></head>
`
变为：
`<script defer src="/main.bundle.js"></script><link href="/main.css" rel="stylesheet"></head>
`
**注意 main.bundle.js 之前的斜线！**。 这样以来，对于js 资源的请求都会转到 `/` 下。

还有另外一种解决的方法：

在 HTML 模版文件中加入：  `<base href="/">`

## 加载 antd 样式出错

今天在引入 antd 样式的时候发生了一些问题：样式已经引入了，但是却无法正确显示，这是为什么呢？

这其中的原因是：在加载 css 的时候，在本地项目中开启了 css 模块模式。

```javascript
{
  test: /\.css$/i,
  use: [
    { loader: 'style-loader' },
    {
      loader: 'css-loader',
      options: {
        modules: true
      }
    }
  ],
  exclude: /node_modules/
},
```
这样的话会使将本地文件中的 css 类名进行自动转换。但是我们引入的 antd 组件所应用的类并不知道类名转换机制，所以无法找到自己所需样式被转换后的类名。

所以，我们需要对 antd 样式关闭类名转换功能。通过关闭 css 模块模式就可以做到。所以我们单独为 node_modules 内的模块配置一下：

```javascript
{
  test: /\.css$/i,
  use: [
    { loader: 'style-loader' },
    {
      loader: 'css-loader',
      options: {
        modules: false
      }
    }
  ],
  include: /node_modules/
}
```

这时候再运行项目就可以了。
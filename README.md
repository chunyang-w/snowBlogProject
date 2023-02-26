# SnowBlogProject

![demo_img](https://github.com/chunyang-w/snowBlogProject/blob/master/demo/demo.png)

📒 A user-friendly and simple-to-install blog app based on JavaScript
一个基于`JS`用户友好、易于安装的博客系统

🌻 snowBlogProject aims to provide you a blog system that cost minimal code and re-development.
致力于为你提供小而美的、易于部署的博客系统

## 🚀 To Use This App/使用: 

0. download project and run code 
   下载项目并运行
``` shell
npm install
```

1. Install [MongoDB](https://www.mongodb.com/try/download/community) on your machine
   安装MongoDB

2. Override style sheet: 
   覆盖原有样式
```
paste /custom/quill.snow.css -> /node_modules/quill/dist
```
3. run following code:
运行以下代码:
```shell
npm run prod
``` 

Now the project runs at http://localhost:3300 and http://localhost:3300/admin

项目及其管理系统将运行在本地服务器3300端口

## 💻 Development & Maintenance / 开发与维护

+ Configuration files 配置文件：
  + all configuration files are kept under /config/config.js
  所有配置选线包括在 /config/config.js 文件中。
  + common config options: Blog name, Admin account, Admin password, ports...
  常见配置项：博客名称，管理账号以及密码，端口设置...
+ Activate dev mode 启动开发者模式：
  + run `npm run dev`
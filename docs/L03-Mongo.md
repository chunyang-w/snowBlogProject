# MongoDB 学习手册: 从 Node.js 的角度出发

## 安装 mongoDB

### macOS 环境下安装

1. 从官网下载安装包[下载链接](https://www.mongodb.com/try/download/community)
2. 解压安装包并重命名为 `mongodb`
3. 将该文件夹复制到 `/usr/local/var` 下
4. 配置环境变量：

```bash
#>>> MongoDB Path
MONGODB_PATH="/usr/local/var/mongodb/bin"
#<<<

#>>> Path Export
PATH=$JAVA_HOME/bin:$PATH:$MONGODB_PATH:.
CLASSPATH=$JAVA_HOME/lib/tools.jar:$JAVA_HOME/lib/dt.jar:.
```
### 启动 mongoDB

启动 mongo，其实就是启动 mongod 服务。所有的操作必须在连接到服务之后才能操作。下载的二进制文件中，mongod 就是服务，而 mongo 只是用于连接这个服务的工具而已，并不是数据库系统本身。

mongod 命令用于启动一个 mongo 服务进程。该命令有以下几个常见选项，用于控制启动的服务：

+ --dbpath: 数据库文件路径
+ --logpath: 日志打印路径
+ --port: 指定服务的端口，默认是 27017
+ --fork: 后台执行，以守护进程方式执行

经过验证，一台机器上可以通过 mongod 同时启动多个 mongod 服务

### 连接 mongo 服务



# 封装 React 路由

React Router 中并没有像 Vue 一样提供许多用于控制路由的钩子函数
所以如果我们希望能够像使用 Vue 一样使用 React Router，就需要自行对路由进行封装。

总的来说，封装后的路由最好能够提供以下功能:

1. 在单个文件中配置路由结构（包括使用嵌套的对象结构来表示嵌套路由）
2. 提供拦截方法
3. 代码分割
4. 懒加载

那么我们就来看看怎么做到这三项功能吧！

## 单个文件中配置路由结构

借助 React Router 6 中提供的 useRoutes 钩子我们不难做到这一点。其实这一点在官方的文档中也有体现。 这里不妨引用[官方的例子](https://reactrouter.com/docs/en/v6/api#useroutes)：

```javascript
import * as React from "react";
import { useRoutes } from "react-router-dom";

function App() {
  let element = useRoutes([
    {
      path: "/",
      element: <Dashboard />,
      children: [
        {
          path: "messages",
          element: <DashboardMessages />
        },
        { path: "tasks", element: <DashboardTasks /> }
      ]
    },
    { path: "team", element: <AboutPage /> }
  ]);

  return element;
}
```

然后我们只需要在全局的 `<BrowserRouter/>` 标签下引用封装好的这个组建就可以了

## 提供拦截方法

想要实现这个功能就需要自己动手编写一些代码了。

总而言之，这个功能的实现基本上的思路是这样的：

1. 首先实现一个包裹性的组件`<Guard/>`，用于包裹所有需要在路由中直接应用的组建
   1. 这个组建接受一个 prop，用于制定需要被包裹的元素：`<Guard element= { element }/>`
2. 这个组件会先判断一些逻辑，如果不需要跳转则返回被包裹的原先的组建，否则根据逻辑进行跳转

之后需要改动的文件是:

+ 在文件中引用组件的时候不直接引用组件，而是引用被 `<Guard/>`包裹后的组建
+ 如果有必要的话可以将用于判断逻辑的函数单独抽取出来进行一个封装

## 代码分割和懒加载

### 纪录：

优化前：
+ 打包时间：3792 ms
+ 
代码分割：

## 懒加载

主要使用 React 中提供的方法`lazy` 和 `<Suspens/>` 来进行


// Package import:
import React from 'react'
import { message } from 'antd'

// Helper function import:
import { load, loadAsync } from './loader'
import { setRouteInterceptor } from './interceptor'

// Static Components imports:
import App from '../components/app/App.jsx'
import store from '@client/store'
import { setNeedLogin } from '@client/store/adminLogin/adminLogin'

// route object:
const routes = [
  {
    path: '/',
    element: <App/>,
    children: [
      {
        index: true,
        element: loadAsync(() => import( /* webpackChunkName: "homePage" */ '../components/homepage/HomePage.jsx'), {
          title: 'homePage',
        })
      },
      {
        path: 'articles',
        element: loadAsync(() => import( /* webpackChunkName: "articles" */ '../components/articleList/ArticleList.jsx'), {
          title: 'articles',
        })
      },
      {
        path: 'blackBoard',
        element: loadAsync(() => import( /* webpackChunkName: "blackBoard" */ '../components/blackBoard/BlackBoard.jsx'), {
          title: 'blackBoard',
        })
      }
    ]
  },
  {
    path: '/admin',
    element: loadAsync(() => import( /* webpackChunkName: "admin" */ '../components/admin/Admin.jsx'), {
      title: 'Admin',
    }),
    children: [
      {
        path: '/article',
        element: load(() => import( /* webpackChunkName: "admin/article" */ '../components/admin/Admin.jsx' ), {
          title: '文章管理'
        })
      },
      {
        path: '/message',
        element: load(() => import( /* webpackChunkName: "admin/message" */ '../components/admin/Admin.jsx' ), {
          title: '留言管理'
        })
      }
    ]
  },
  {
    path: '/adminLogin',
    element: loadAsync(() => import( /* webpackChunkName: "adminLogin" */ '../components/admin/login/Login.jsx'), {
      title: 'Login'
    })
  }
]

function routeInterceptor({ pathname, meta })  {
  console.log('pathName: ', pathname)
  if (meta.title === 'Admin') {
    console.log('1', window.navigateFunc)
  }
  if (!/^\/admin/.test(pathname)) {
    store.dispatch(setNeedLogin(false))
  } else {
    if (store.getState().adminLogin.token === '') {
      if (!/^\/adminLogin$/.test(pathname)) message.warning('Need Login')
      return '/adminLogin'
    }
  }
}

setRouteInterceptor(routeInterceptor)

export default routes
// Package import:
import React from 'react'

// Helper function import:
import { loadAsync } from './loader'
import { setRouteInterceptor } from './interceptor'

// Static Components imports:
import App from '../components/app/App.jsx'

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
    })
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
    return '/adminLogin'
  }
}

setRouteInterceptor(routeInterceptor)

export default routes
// Package import:
import React from 'react'
import { message } from 'antd'

// Helper function import:
import { load, loadAsync } from './loader'
import { setRouteInterceptor } from './interceptor'

// Static Components imports:
import App from '../components/app/App.jsx'
import Article from '@client/components/admin/article/Article.jsx'
import store from '@client/store'
import { setNeedLogin } from '@client/store/adminLogin/adminLogin'

// router icon:
import {
  FormOutlined,
  MessageOutlined,
  HomeOutlined,
} from '@ant-design/icons'


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
        path: 'articlePage/:articleId',
        element: loadAsync(() => import( /* webpackChunkName: "articlePage" */ '../components/articlePage/ArticlePage.jsx') , {
          title: 'articlePage'
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
        path: 'homePages',
        title: '主页管理',
        icon: <HomeOutlined/>,
        children: [
          {
            path: 'index',
            title: '首页管理',
            index: true,
            showInMenu: true,
            element: loadAsync(() => import( /* webpackChunkName: "adminHomePagesIndexPage" */ '../components/admin/homePages/indexPage/IndexPage.jsx' ), {
              title: '首页管理'
            })
          },
          {
            path: 'content',
            title: '内容页管理',
            index: true,
            showInMenu: true,
            element: loadAsync(() => import( /* webpackChunkName: "adminHomePagesHomePagesContentPage" */ '../components/admin/homePages/contentPage/ContentPage.jsx' ), {
              title: '内容页管理'
            })
          },
          {
            path: 'contentDetail/:pageId',
            title: '内容页具体管理',
            index: true,
            showInMenu: false,
            element: loadAsync(() => import( /* webpackChunkName: "adminHomePagesHomePagesContentPageDetail" */ '../components/admin/homePages/contentPageDetail/ContentPageDetail.jsx' ), {
              title: '内容页具体管理'
            })
          },
          {
            path: 'footer',
            title: '末页管理',
            index: true,
            showInMenu: true,
            element: loadAsync(() => import( /* webpackChunkName: "adminHomePagesFooterPage" */ '../components/admin/homePages/footerPage/FooterPage.jsx' ), {
              title: '末页管理'
            })
          },
        ]
      },
      {
        path: 'article',
        title: '文章管理',
        icon: <FormOutlined />,
        children: [
          {
            path: 'index',
            title: '文章管理',
            index: true,
            showInMenu: true,
            element: loadAsync(() => import( /* webpackChunkName: "adminArticle" */ '../components/admin/article/Article.jsx' ), {
              title: '文章管理'
            }),
          },
          {
            path: 'edit/:articleId',
            title: '文章管理',
            showInMenu: false,
            element: loadAsync(() => import( /* webpackChunkName: "adminArticle" */ '../components/admin/article/articleEditor/ArticleEditor.jsx' ), {
              title: '文章管理'
            })
          }
        ]
      },
      {
        path: 'message',
        title: '留言管理',
        icon: <MessageOutlined />,
        element: loadAsync(() => import( /* webpackChunkName: "adminMessage" */ '../components/admin/message/Message.jsx' ), {
          title: '留言管理'
        })
      },
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
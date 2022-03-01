import React from 'react'
import { useNavigate } from 'react-router-dom'

import { Menu } from 'antd'
import routes from '@client/router/routes'

const { SubMenu } = Menu
const ADMIN_ROUTE = '/admin'

export default function SideBar() {

  const navigate = useNavigate()

  const adminRoutes = routes.find((route) => {
    return route.path === ADMIN_ROUTE
  })

  function jumpToLink(routeArr) {
    const linkToJump = [ADMIN_ROUTE, ...routeArr].join('/')
    navigate(linkToJump)
  }

  const routesElem = adminRoutes.children.map((route, idx) => {
    let childList
    if (route.children === undefined) {
      childList = []
    } else {
      childList = route.children.filter( (e) => e.showInMenu)
    }
    if (childList.length === 0) {
      return (
        <Menu.Item
          key = { String(idx) }
          icon = { route.icon }
          onClick = { () => jumpToLink([route.path]) }
        >
          { route.title }
        </Menu.Item>
      )
    } else {
      return (
        <SubMenu
          key = { String(idx) }
          icon = { route.icon }
          title = { route.title }
        >
          {
            childList.map((subRoute, subIdx) => {
              return (
                <Menu.Item
                  key = { String(idx) + String(subIdx) }
                  icon = { subRoute.icon }
                  onClick = { () => jumpToLink([route.path, subRoute.path]) }
                >
                  { subRoute.title }
                </Menu.Item>
              )
            })
          }
        </SubMenu>
      )
    }
  })

  return (
    <Menu
      theme="dark"
      defaultSelectedKeys={['0']}
      mode="inline"
    >
      { routesElem }
    </Menu>
  )
}
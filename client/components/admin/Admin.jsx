import React from 'react'
import { Outlet } from "react-router-dom"

import style from './Admin.css'

import { Layout, Button, message } from 'antd'
import SideBar from './sideBar/SideBar.jsx'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined
} from '@ant-design/icons'

const { Header, Content, Sider } = Layout

import store from '@client/store/index'
import { setLoginState } from '@client/store/adminLogin/adminLogin'
 
export default class SiderDemo extends React.Component {

  state = {
    collapsed: false,
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  logout = () => {
    store.dispatch(setLoginState({
      username: '',
      needLogin: true,
      token: ''
    }))
    message.success('Logout Success')
  }

  render() {
    return (
      <Layout className = { style.container }>

        <Sider
          collapsible
          collapsed = {this.state.collapsed}
          trigger = { null }
          >
          <SideBar></SideBar>
        </Sider>
  
        <Layout className= { style.mainLayout }>
          <Header className= { style["header"] }>
            <div>
              {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                className: style['trigger'],
                onClick: this.toggle,
              })}
            </div>
            <div>
              <Button
                className = {style.logoutButton}
                size = 'small'
                onClick = { () => {this.logout()} }
                > Logout
              </Button>
            </div>
          </Header>

          <Content className= { style.content }>
            <Outlet/>
          </Content>
        </Layout>

      </Layout>
    );
  }
}
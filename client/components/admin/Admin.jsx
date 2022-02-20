import React from 'react'

import style from './Admin.css'
import { Layout, Button, message } from 'antd'
import SideBar from './sideBar/SideBar.jsx'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined
} from '@ant-design/icons'

const { Header, Content, Sider } = Layout

import herald from '@client/herald/herald.js'
import store from '@client/store/index'
import { setLoginState } from '@client/store/adminLogin/adminLogin'
 
export default class SiderDemo extends React.Component {
  state = {
    collapsed: false,
  }

  toggle = () => {
    setState({
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
      <Layout style={{ minHeight: '100vh' }}>

        <Sider collapsible collapsed={this.state.collapsed} trigger = { null }>
          <SideBar></SideBar>
        </Sider>
  
        <Layout className= { style["site-layout"] }>
          <Header className= { style["header"] } style={{ padding: 0 }}>
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
          <Content
            className= { style["site-layout-background"] }
            style={{
              margin: '10px 10px',
              padding: 24,
              minHeight: 280,
            }}
          >
            Content
          </Content>
        </Layout>

      </Layout>
    );
  }
}
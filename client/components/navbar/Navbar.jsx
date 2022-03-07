import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Item from './item/Item.jsx'
import style from './Navbar.css'
import { Menu, Dropdown, Button } from 'antd'
import { UnorderedListOutlined } from '@ant-design/icons'

export class NavBar extends React.Component {
  render () {
    const linkArr = [
      {
        name: '主页',
        path: '/'
      },
      {
        name: '文章归档',
        path: '/articles'
      },
      {
        name: '留言黑板',
        path: '/blackBoard'
      }
    ]
    const type = this.props.deviceType
    const menu = (
      <Menu>
        {
          linkArr.map((e, idx) => {
            console.log('index:', idx)
            return (   
                <Menu.Item key = {idx}>
                  <Link to = { e.path }>
                    { e.name } 
                  </Link>
                </Menu.Item>
            )
          })
        }
      </Menu>
    )

    const crumb = type === 'mobile' ? 
      <Dropdown overlay={ menu } placement='bottomCenter'>
        <Button icon={ <UnorderedListOutlined /> }></Button>
      </Dropdown> :
      <div className={ style.itemContainer }>
        {
          linkArr.map((e, idx) => {
            return (
              <Item
                itemName = { e.name }
                linkPath = { e.path }
                key = { idx }
                />
            )
          })
        }
      </div>

    return (
      <div className={ style.container }>
        <div className={ style.title }>
          { this.props.blogName }
        </div>
        <div className={ style.itemContainer }>
          { crumb }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    deviceType: state.window.deviceType
  }
}

export default connect(mapStateToProps)(NavBar)
import React from 'react'
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import style from './Loading.css'
const antIcon = <LoadingOutlined style={{ fontSize: 86}} spin />;

export default function Loading() {
  return (
  <div className = { style.container }>
    <Spin
    class = { style.loading }
    indicator={ antIcon } />
  </div>
  )
}

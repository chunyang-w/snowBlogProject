import style from './InfoBar.css'
import React from 'react'

// props:
// 1. lastModified
// 2. clicks

export default function InfoBar(props) {
  return (
    <div class = { style.container }>
      <p class = { style.infoFont }>最后编辑与「{new Date(props.lastModified).toLocaleDateString()}」 点击量: 「{props.hits}」</p>
    </div>
  )
}
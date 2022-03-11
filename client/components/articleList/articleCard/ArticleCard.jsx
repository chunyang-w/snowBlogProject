import React, {
  useEffect
} from 'react'
import style from './ArticleCard.css'
import {
  Tag
} from 'antd'
import string2color from '@client/util/string2color'

export default function ArticleCard(props) {
  return (
    <div
      className = { style.container }
      onClick = { props.onClick }
      >
      <div className = {style.headerBar}>
        <div className = { style.created}>
          { new Date(props.article.created).toLocaleDateString() }
        </div>
        <div className = { style.leftArea }>
          <Tag color = { string2color(props.article.tag) }> { props.article.tag } </Tag>
        </div>
      </div>
      <div className = {style.mainArea}>
        <div className  = { style.title }>
          <h3> { props.article.articleTitle } </h3>
        </div>
        <div className = { style.summary }>
          {props.article.summary}
        </div>
      </div>
    </div>
  )
}

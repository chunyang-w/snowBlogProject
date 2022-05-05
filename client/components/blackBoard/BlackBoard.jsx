import React from 'react'
import Comment from '../comment/Comment.jsx'

export default class ArticleList extends React.Component {
  render() {
    return (
      <div>
        <Comment
          ownerArticleId = { -1 }
        />
      </div>
    )
  }
}
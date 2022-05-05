import React, {
  useState,
  useEffect
} from 'react'
import { Avatar, Comment } from 'antd'
import style from './CommentItem.css'
import {
  useSelector,
} from 'react-redux'
import CommentSubmit from '../commentSubmit/CommentSubmit.jsx'
import herald from '@client/herald/herald'

// props:
// 1. parentId
// 2. comment
export default function CommentList(props) {
  
  const clientType = useSelector((state) => state.window.deviceType)
  
  const [showReply, setShowReply] = useState(false)
  const [reference, setReference] = useState(null)

  useEffect(() => {
    console.log('in CommentItem', props)
    if (props.comment.parentId !== undefined) {
      console.log('parentId not undefined, comment:', props.comment)
      herald.get('/open/comment', {
        params: {
          _id: props.comment.parentId
        }
      })
      .then(res => {
        console.log('parent comment found:', res)
        setReference(res.data[0])
      })
    }
  }, [])

  function replyClicked() {
    console.log('replyClicked')
    setShowReply(!showReply)
  }
  return (
    <div className = { clientType === 'client' ? style.container : style.containerMobile }>
      <Comment
        avatar = {
          <Avatar
            size = { 50 }
          >
            { props.comment.commentatorName }
          </Avatar>
        }
        content = {
          <div className = { style.commentContent }>
            {
              reference !== null ?
              <div 
                className = { style.reference }
              > @ { reference.commentatorName } : { reference.content }
              </div>
              : null
            }
            <div className = { style.commentContentBox }>
              {
                props.comment.content
              }
            </div>
          </div>
        }/>

        <a
          className = { style.reply }
          onClick = { replyClicked }
        >回复</a>
        {
          showReply ?
          <CommentSubmit
            ownerArticleId = { props.ownerArticleId }
            getCommentListFunc = { props.getCommentListFunc }
            parentId = { props.comment._id }
          />
          : 
          null
        }
    </div>
  )
}
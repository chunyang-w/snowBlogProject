import React, {
  useState,
  useEffect
} from "react";
import { useSelector } from "react-redux"
import style from './Comment.css'
import CommentSubmit from './commentSubmit/CommentSubmit.jsx'
import CommentItem from './commentList/CommentItem.jsx'
import herald from "@client/herald/herald";

// props
// 1.ownerArticleId
export default function Comment(props) {

  const clientType = useSelector((state) => state.window.deviceType)

  const [commentList, setCommentList] = useState([])

  // TODO: get commentList and pass them into commentItem
  useEffect(() => {
    getCommentList()
  }, [])

  function getCommentList() {
    console.log('getCommentList called')
    herald.get('/open/comment', {
      params: {
        ownerArticleId: props.ownerArticleId
      }
    })
    .then(res => {
      console.log('getCommentList response:', res)
      const commentData = res.data
      setCommentList(commentData)
    })
  }

  return (
    <div className = { style.container }>
      <div className = { style.containerSubmit }>
        <div className = { clientType === 'client' ? style.submitContainer : style.submitContainerMobile }>
          <div className = { clientType === 'client' ? style.commentContainer : style.commentContainerMobile }>
            <CommentSubmit
              ownerArticleId = { props.ownerArticleId }
              getCommentListFunc = { getCommentList }
            />
          </div>
        </div>
      </div>

      <div className = { style.commentList }>
        {
          commentList.map((comment) => {
            return <CommentItem
              key = { comment._id }
              ownerArticleId = { props.ownerArticleId }
              getCommentListFunc = { getCommentList }
              comment = { comment }
            />
          })
        }
      </div>
    </div>
  )
}
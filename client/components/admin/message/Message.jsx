import React, {
  useState,
  useEffect
} from 'react'
import style from './Message.css'
import { useParams } from 'react-router-dom'
import {
  Table,
  Space,
  message
} from 'antd'
import herald from '@client/herald/herald'

export default function Message(props) {

  const columns = [
    {
      title: '评论者',
      dataIndex: 'commentatorName',
      key: 'commentatorName',
    },
    {
      title: '创建时间',
      key: 'created',
      render: (text, record) => (
        new Date(record.created).toLocaleString()
      )
    },
    {
      title: 'Email',
      dataIndex: 'commentatorEmail',
      key: 'commentatorEmail',
    },
    {
      title: '主页',
      dataIndex: 'commentatorHomePage',
      key: 'commentatorHomePage',
    },
    {
      title: '内容',
      dataIndex: 'content',
      key: 'content',
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a
            onClick = { () => deleteComment(record._id) }
          >删除
          </a>
        </Space>
      ),
    },
  ]

  const params = useParams()
  const [articleId, setArticleId] = useState(params.articleId)
  const [commentData, setCommentData] = useState([])

  function getCommentList() {
    herald.get('/open/comment', {
      params: {
        ownerArticleId: articleId
      }
    })
    .then(res => {
      console.log('comment response from server:', res)
      setCommentData(res.data)
    })
  }

  function deleteComment(commentId) {
    console.log('in deleteComment', { articleId })
    herald.delete('/admin/comment', {
      params: {
        _id: commentId
      }
    })
    .then(res => {
      console.log('response from article.delete', res)
      getCommentList()
      message.success('删除成功')
    })
  }

  useEffect(() => {
    console.log('in admin/Message', { articleId })
    if (articleId === ':articleId') {
      setArticleId('-1')
    }
  }, [ params ])

  useEffect(() => {
    console.log('articleId resolved:', { articleId })
    getCommentList()
  }, [ articleId ])

  return (
    <div>
      <Table
        columns = { columns }
        dataSource = { commentData }
      />
    </div>
  )
}


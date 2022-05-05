import React, {
  useState
} from "react";
import style  from "./CommentSubmit.css"

import {
  Comment,
  Avatar,
  Form,
  Button,
  List,
  Input,
  Modal,
  message
} from 'antd'
import herald from "@client/herald/herald";

const { TextArea } = Input

// props:
// 1. ownerArticleId
// 2. getCommentListFunc

export default function CommentSubmit(props) {

  const [commentValue, setCommentValue] = useState('')
  const [commentatorName, setCommentatorName] = useState('Someone')
  const [commentatorEmail, setCommentatorEmail] = useState('')
  const [commentatorHomePage, setCommentatorHomePage] = useState('')
  const [commentatorNameTemp, setCommentatorNameTemp] = useState('Someone')
  const [commentatorEmailTemp, setCommentatorEmailTemp] = useState('')
  const [commentatorHomePageTemp, setCommentatorHomePageTemp] = useState('')
  
  const [submitting, setSubmitting] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)

  function handleChange(e) {
    console.log('handleChange')
    setCommentValue(e.target.value)
  }
  function avatarClicked() {
    console.log('avatar Clicked')
    setCommentatorEmailTemp(commentatorEmail)
    setCommentatorNameTemp(commentatorName)
    setCommentatorHomePageTemp(commentatorHomePage)
    setModalVisible(true)
  }
  function modalOkClicked() {
    console.log('modalOkClicked')
    setCommentatorEmail(commentatorEmailTemp)
    setCommentatorName(commentatorNameTemp)
    setCommentatorHomePage(commentatorHomePageTemp)
    setModalVisible(false)
  }
  function modalCancelClicked() {
    console.log('modalCancelClicked')
    setModalVisible(false)
  }
  // TODO:
  function handleSubmit() {
    setSubmitting(true)
    const commentData = {
      commentatorName,
      commentatorEmail,
      commentatorHomePage,
      commentValue,
      ownerArticleId: props.ownerArticleId,
    }
    if (props.parentId !== undefined) {
      console.log('in submit, parentId not undefined')
      commentData['parentId'] = props.parentId
    }
    console.log('handleSubmit',
      commentData
    )
    herald.post('/open/comment', commentData)
    .then(res => {
      console.log(res.data)
      setSubmitting(false)
      props.getCommentListFunc()
      message.success('留言发表成功')
      setCommentValue('')
    })
  }

  return (
    <div className = { style.container }>
        <Comment
          avatar = {
            <Avatar
              size = { 64 }
              onClick = { avatarClicked }>
                { commentatorName }
              </Avatar>
          }
          content = {
            <Editor
              onChange = { handleChange }
              onSubmit = {handleSubmit}
              submitting = {submitting}
              value = {commentValue}
            />
          }
      />
      <Modal
        title = '个人信息'
        visible = { modalVisible }
        okText = '确认'
        cancelText = '取消'
        onOk = { modalOkClicked }
        onCancel = { modalCancelClicked }
        >
        <Form
          labelCol = {{ span: 5 }}>
          <Form.Item
            label = '昵称'
            >
            <Input
              defaultValue = { commentatorNameTemp }
              onChange = {e => setCommentatorNameTemp(e.target.value)}/>
          </Form.Item>
          <Form.Item
            label = '邮箱'
            >
            <Input
              defaultValue = { commentatorEmailTemp }
              onChange = {e => setCommentatorEmailTemp(e.target.value)}/>
          </Form.Item>
          <Form.Item
            label = '主页'
            >
            <Input
              defaultValue = { commentatorHomePageTemp }
              onChange = {e => setCommentatorHomePageTemp(e.target.value)}/>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <>
    <Form.Item>
      <TextArea
        autoSize = {{
          minRows: 4,
          maxRows: 6
        }}
        onChange = { onChange }
        value={ value } />
    </Form.Item>
    <Form.Item>
      <Button
        htmlType = "submit"
        loading = { submitting }
        onClick = { onSubmit }
        type = "primary">
        发表
      </Button>
    </Form.Item>
  </>
)
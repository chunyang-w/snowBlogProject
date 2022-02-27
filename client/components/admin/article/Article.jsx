import React from 'react'
import style from './Article.css'

import {
  Button,
  Space,
  Table,
  Modal,
  Input,
  message,
} from 'antd'
const { Column, ColumnGroup } = Table

import {
  PlusOutlined
} from '@ant-design/icons'

import herald from '@client/herald/herald'

export default class Article extends React.Component {
  constructor(props) {
    super(props) 
    this.getArticles = this.getArticles.bind(this)
    this.setForm = this.setForm.bind(this)
    this.updateArticle = this.updateArticle.bind(this)
    this.state = {
      articleData: [],
      formVisible: false,
      articleTitle: '',
      articleId: '',
      method: 'no method'
    }
  }

  getArticles() {
    console.log('get Articles')
    herald.get('/admin/article')
      .then((res) => {
        console.log(res)
        this.setState({
          articleData: res.data
        })
      })
  }

  setForm(data) {
    console.log('new Article', data)
    this.setState({
      formVisible: true
    })
    const method = data === undefined ? 'POST' : 'PUT'
    this.setState({
      method
    })
    console.log(method)
    if (method === 'POST') {
      this.setState({
        articleTitle: ''
      })
    } else if (method === 'PUT') {
      this.setState({
        articleTitle: data.articleTitle,
        articleId: data.articleId
      })
    }
    console.log(this.state.form)
  }

  updateArticle() {
    console.log('updateArticle')
    this.setState({
      formVisible: false
    })
    console.log(this.state.method)
    herald({
      url: 'admin/article',
      method: this.state.method,
      params: {
        articleTitle: this.state.articleTitle,
        articleId: this.state.articleId
      },
      data: {
        articleTitle: this.state.articleTitle,
        articleId: this.state.articleId
      }
    })
      .then((res) => {
        console.log(res)
        this.getArticles()
        message.success('新建文章成功')
      })
  }
  componentDidMount() {
    this.getArticles()
  }
  render() {
    return (
      <div className = { style.container }>
        <div>

        </div>
        <div className = { style.header }>
          <Button
            className = { style.newArticle }
            icon = { <PlusOutlined/> }
            onClick = { () => this.setForm() }
          ></Button>
        </div>
        <div className = { style.main }>
          <Table dataSource = { this.state.articleData }>
            <Column
              title = '文章名称'
              dataIndex = 'articleTitle'
              key = 'articleTitle'
            ></Column>
            <Column
              title = '点击量'
              dataIndex = 'hits'
              key = 'hits'
            ></Column>
            <Column
              title = '评论'
              dataIndex = 'comments'
              key = 'comments'
            ></Column>
            <Column
              title = '上线状态'
              key = 'online'
              render = {(_, record) => (
                record.online ?
                  <p>已上线</p>
                  :
                  <p>未上线</p>
              )}
            ></Column>
            <Column
              title = '操作'
              key = 'action'
              render = {(_, record) => (
                <Space size = 'middle'>
                  <a>modify</a>
                  <a onClick = { () => {
                    console.log(record)
                    this.setForm({
                    articleTitle: record.articleTitle,
                    articleId: record._id
                  })} }>edit</a>
                  <a>delete</a>
                </Space>
              )}
            ></Column>
          </Table>

          <Modal
            title = '文章'
            visible = { this.state.formVisible }
            onOk = { this.updateArticle }
            onCancel = { () => this.setState({ formVisible: false }) }
          >
            <Input
              placeholder='文章名称'
              value = { this.state.articleTitle }
              onChange = { (e) => {
                this.setState({
                  articleTitle: e.target.value
                })
              }}
            ></Input>
          </Modal>
        </div>
      </div>
    )
  }
}
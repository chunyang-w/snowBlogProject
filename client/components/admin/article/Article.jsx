import React from 'react'
import { Link } from 'react-router-dom'
import style from './Article.css'

import {
  Button,
  Space,
  Table,
  Modal,
  Input,
  message,
  Tag
} from 'antd'
const { Column } = Table

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
    this.deleteArticle = this.deleteArticle.bind(this)
    this.changeOnlineStatus = this.changeOnlineStatus.bind(this)
    this.state = {
      articleData: [],
      formVisible: false,
      articleTitle: '',
      articleId: '',
      articleTag: '',
      method: 'no method'
    }
  }

  changeOnlineStatus(id, onlineStatus) {
    herald.put('/admin/article', {
      articleId: id,
      online: !onlineStatus
    })
    .then(res => {
      message.success('更新状态成功')
      this.getArticles()
    })
  }

  deleteArticle(articleId) {
    console.log('deleteArticle toggled', articleId)
    herald.delete('admin/article', {
      data: {
        articleId
      }
    })
      .then(res => {
        this.getArticles()
        message.success('文章删除成功')
      })
  }

  getArticles() {
    console.log('get Articles')
    herald.get('/admin/article')
      .then((res) => {
        for (let i = 0; i < res.data.length; i++) {
          res.data[i].key = res.data[i]._id
        }
        console.log(res.data)
        res.data.sort((elem1, elem2) => elem2.created - elem1.created)
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
        articleTitle: '',
        articleTag: ''
      })
    } else if (method === 'PUT') {
      this.setState({
        articleTitle: data.articleTitle,
        articleTag: data.articleTag,
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
      data: {
        articleTitle: this.state.articleTitle,
        articleId: this.state.articleId,
        tag: this.state.articleTag
      }
    })
      .then((res) => {
        console.log(res)
        this.getArticles()
        message.success('文章操作成功')
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
          <Table
            dataSource = { this.state.articleData }
            >
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
              title = '创建时间'
              dataIndex = 'created'
              key = 'created'
              render = {(_, record) => (
                <p> { (new Date(record.created)).toLocaleDateString() } </p>
              )}
            ></Column>
            <Column
              title = '最后修改时间'
              dataIndex = 'lastModified'
              key = 'lastModified'
              render = {(_, record) => (
                <p> { (new Date(record.lastModified)).toLocaleDateString() } </p>
              )}
            ></Column>
            <Column
              title = '上线状态'
              key = 'online'
              render = {(_, record) => (
                <span onClick = { () => { this.changeOnlineStatus(record._id, record.online) } }>
                {
                    record.online ?
                    <a>已上线</a>
                    :
                    <a>未上线</a>
                }
                </span>
              )}
            ></Column>
            <Column
              title = '标签'
              key = 'tag'
              render = {(_, record) => (
                <Tag
                  color = 'blue'
                  key={ record.tag }
                  >
                  { record.tag }
                </Tag>
              )}
            ></Column>
            <Column
              title = '操作'
              key = 'action'
              render = {(_, record) => (
                <Space size = 'middle'>
                  <Link
                    to = { `/admin/article/edit/${record._id}` }
                    >编辑文章
                  </Link>
                  <a onClick = { () => {
                    console.log(record)
                    this.setForm({
                      articleTitle: record.articleTitle,
                      articleTag: record.tag,
                      articleId: record._id
                  })} }>修改</a>
                  <a
                    onClick = { () => this.deleteArticle(
                      record._id
                    ) }
                    >删除
                  </a>
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
              className = { style.modalInput }
              placeholder='文章名称'
              value = { this.state.articleTitle }
              onChange = { (e) => {
                this.setState({
                  articleTitle: e.target.value
                })
              }}
            ></Input>
            <Input
              className = { style.modalInput }
              placeholder='分类'
              value = { this.state.articleTag }
              onChange = { (e) => {
                this.setState({
                  articleTag: e.target.value
                })
              }}
            ></Input>
          </Modal>
        </div>
      </div>
    )
  }
}
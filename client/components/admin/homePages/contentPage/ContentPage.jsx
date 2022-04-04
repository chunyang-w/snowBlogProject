import React, {
  useEffect,
  useState
} from 'react'
import { useNavigate } from 'react-router-dom'
import style from './ContentPage.css'
import {
  Button,
  Table,
  message
} from 'antd'
import herald from '@client/herald/herald'
import { PlusOutlined } from '@ant-design/icons'

export default function ContentPage() {

  const [pageData, setPageData] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    getPages()
  }, [])

  function getPages() {
    herald.get('/open/pageDetail', {
      params: {
        type: 'contentPage'
      }
    })
    .then(res => {
      setPageData(res.data)
    })
  }

  function createNewPage() {
    let sort
    if (pageData.length === 0) {
      sort = 0
    } else {
      let max = -Number.MAX_SAFE_INTEGER
      pageData.forEach((page) => {
        if(page.sort > max) {
          max = page.sort
        }
      })
      sort = max + 1
    }
    herald.post('/admin/pageDetail', {
      name: '新建内容页',
      sort
    })
    .then(res => {
      console.log(res)
      getPages()
      message.success('新建成功')
    })
  }

  function deletePage(record) {
    console.log('in deletePage, record, id', record, record._id)
    herald.delete('/admin/pageDetail', {
      data: {
        _id: record._id
      }
    })
    .then((res) => {
      console.log(res)
      getPages()
      message.success('删除成功')
    })
  }

  function editPage(record) {
    console.log('in editPage, redirecting')
    navigate(`/admin/homePages/contentDetail/${record._id}`)
  }

  const columns = [
    {
      title: '内容页名称',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '排序值',
      dataIndex: 'sort',
      key: 'sort'
    },
    {
      title: '操作',
      key: 'op',
      render: (text, record) => {
        return (
          <div className = { style.operationArea }>
            <a onClick = { () => editPage(record) }> 编辑 </a>
            <a onClick = { () => deletePage(record) }> 删除 </a>
          </div>
        )
      }
    }
  ]

  return (
    <div className = { style.container }>
      <div className = { style.header }>
        <div>
          <h2>内容页管理</h2>
        </div>
        <div>
          <Button
            onClick = { createNewPage }
            icon = { <PlusOutlined/> }
          ></Button>
        </div>
      </div>

      <div className = { style.main }>
        <Table
          rowKey = '_id'
          dataSource = { pageData }
          columns = { columns }
        ></Table>
      </div>
    </div>
  )
}
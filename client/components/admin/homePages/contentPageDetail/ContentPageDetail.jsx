import React, {
  useEffect,
  useState
} from 'react'
import { useParams } from 'react-router-dom'
import {
  SaveOutlined,
  UploadOutlined,
  PlusSquareOutlined
} from '@ant-design/icons'
import {
  Table,
  Button,
  Upload,
  Space,
  Select,
  Input,
  message,
} from 'antd'
import style from './ContentPageDetail.css'
import herald from '@client/herald/herald'
import config from '../../../../../config/config'

const serverUrl= (
  process.env.NODE_ENV === 'dev' ? config.server.devURL :
  process.env.NODE_ENV === 'test' ? config.server.testURL : 
  config.server.prodURL
) + ':' + String(config.server.staticPort)

const { Column } = Table
const { Option } = Select

export default function ContentPageDetail() {

  const params = useParams()
  const pageId = params.pageId
  const [pageName, setPageName] = useState('')
  const [pageSort, setPageSort] = useState(undefined)
  const [indexImageList, setIndexImageList] = useState([])
  const [textLinkData, setTextLinkData] = useState([])
  const [iconLinkData, setIconLinkData] = useState([])

  useEffect(() => {
    console.log('contentPageDetailLoaded', params, params.pageId)
  }, [params])

  async function uploadForm() {
    console.log('in uploadForm')
    console.log('indexImageList & textLinkData:', indexImageList, textLinkData, pageName, pageSort)
    const res = await herald.put('/admin/pageDetail', {
      pageId,
      pageSort,
      pageName,
      indexImageList,
      textLinkData,
      iconLinkData,
    })
    message.success('保存成功')
    console.log(res)
  }

  function uploadImage(req) {
    console.log('in uploadImage', req)
    const fd = new FormData()
    fd.append('image', req.file)
    herald.post('/admin/asset', fd, {
      params: {
        type: 'indexPageImage'
      }
    })
    .then((res) => {
      console.log('response from asset.post:', res)
      const url = res.data.url
      const fileNameRawArr = url.split('/')
      const fileNameRaw = fileNameRawArr[fileNameRawArr.length - 1]
      const fileName = fileNameRaw.length > 36 ? fileNameRaw.slice(36, fileNameRaw.length) : fileNameRaw
      console.log('indexPage.get res:', res)
      setIndexImageList([
        {
          uid: res.data._id,
          percent: 100,
          status: 'success',
          name: fileName,
          url: res.data.url,
          thumbUrl: res.data.url
        }
      ])
    })
  }

  function onFileChange(obj) {
    if (obj.fileList.length === 0) {
      console.log(serverUrl)
      setIndexImageList([
        {
          percent: 100,
          status: 'success',
          name: 'default.jpeg',
          url: serverUrl + '/asset/homePage/default.jpeg',
          thumbUrl: serverUrl + '/asset/homePage/default.jpeg'
        }
      ])
    } else {
      console.log('onChange:', obj)
      setIndexImageList(obj.fileList)
    }
  }

  async function addRow() {
    console.log('addRow clicked')
    let tempTextLink 
    await herald.post('/admin/textLink')
    .then(res => {
      console.log('res from /admin/textLink.post', res)
      tempTextLink = res.data
      tempTextLink.key = tempTextLink._id
      setTextLinkData([...textLinkData, tempTextLink])
    })
  }

  async function deleteRow(record) {
    console.log(record)
    const id = record._id
    setTextLinkData((textLinkData.filter((elem) => {
      return elem._id !== id
    })))
  }

  function handleRowChange(id, key, val) {
    console.log('in handleRowChange, key, val:', [id, key, val])
    const tempTextLinkData = textLinkData
    tempTextLinkData.forEach(elem => {
      if (elem._id === id) {
        elem[key] = val
      }
    })
    setTextLinkData(tempTextLinkData)
  }

  function getPageInfo() {
    herald.get('/open/pageDetail', {
      params: {
        type: 'contentPage',
        _id: pageId
      }
    })
    .then((res) => {
      res.data = res.data[0]
      const url = res.data.imageUrl
      const fileNameRawArr = url.split('/')
      const fileNameRaw = fileNameRawArr[fileNameRawArr.length - 1]
      const fileName = fileNameRaw.length > 36 ? fileNameRaw.slice(36, fileNameRaw.length) : fileNameRaw
      console.log('indexPage.get res:', res)
      setIndexImageList([
        {
          uid: res.data._id,
          percent: 100,
          status: 'success',
          name: fileName,
          url: res.data.imageUrl,
          thumbUrl: res.data.imageUrl
        }
      ])
      setTextLinkData(res.data.textLinkList)
      console.log('ready to set name and sort', res.data.name, res.data.sort)
      setPageName(res.data.name)
      setPageSort(res.data.sort)
    })
    .catch(err => {
      console.log('upload failed', err)
    })
  }

  useEffect(() => {
    console.log('in Admin/IndexPage')
    getPageInfo()
  }, [])

  return (
    <div className = { style.container }>
      <div className = { style.toolBar }>
        <div className = { style.toolBarLeft }></div>
        <div className = { style.toolBarRight }>
          <Button
            onClick = { uploadForm }
            icon = { <SaveOutlined/> }
          ></Button>
        </div>
      </div>

      <div className = { style.mainArea }>
        <div className = { style.uploadArea }>
          <div>
            <Upload
              key = {'123'}
              maxCount = { 1 }
              customRequest = { uploadImage }
              fileList = { [...indexImageList] }
              onChange = { onFileChange }
            >
              <Button icon={<UploadOutlined />}>上传内容页图片</Button>
            </Upload>
          </div>

          <div>
            <span>内容页名称</span>
            <Input
              value = { pageName }
              onChange = { (e) => {
                setPageName(e.target.value)
              } }
            ></Input>
          </div>
            
          <div>
            <span>内容页排序</span>
            <Input
              type = 'number'
              value = { pageSort }
              onChange = { (e) => {
                setPageSort(e.target.value)
              } }
            ></Input>
          </div>
        </div>

        <div className = { style.textLinkArea }>
          <div className = { style.textLinkAreaToolBar }>
            <div>
              <h3>内容页文字（链接配置）</h3>
            </div>
            <Button
              icon = { < PlusSquareOutlined/>}
              onClick = { addRow }
            >
            </Button>
          </div>

          <Table
            dataSource = { textLinkData }
            rowKey = '_id'
            >
            <Column
              title="是否可点击"
              dataIndex="clickable"
              key="clickable" 
              render = {(text, record) => {
                return (
                  <Select
                    defaultValue = { record.clickable }
                    onChange = { (val) => handleRowChange(record._id, 'clickable', val) }
                    >
                    <Option value = { false }>否</Option>
                    <Option value= { true }>是</Option>
                  </Select>
                )
              }}
            />
            <Column
              title=" 字体大小"
              dataIndex="fontSize"
              key="fontSize" 
              render = {(text, record) => {
                return (
                  <Select
                    defaultValue = { record.fontSize }
                    onChange = { (val) => handleRowChange(record._id, 'fontSize', val) }
                    >
                    <Option value="extraLarge">特大</Option>
                    <Option value="large">大</Option>
                    <Option value="medium">中</Option>
                    <Option value="small">小</Option>
                    <Option value="extraSmall">特小</Option>
                  </Select>
                )
              }}
            />
            <Column
              title="内容"
              dataIndex="content"
              key="content"
              render={(text, record) => (
                <div>
                  <Input
                    defaultValue = { record.content }
                    onChange = { (e) => handleRowChange(record._id, 'content', e.target.value) }
                    placeholder = '文字内容'
                  ></Input>
                </div>
              )}
            />
            <Column
              title="链接地址"
              key="linkTarget"
              render={(text, record) => (
                <div>
                  <Input
                    defaultValue = { record.linkTarget }
                    onChange = { (e) => handleRowChange(record._id, 'linkTarget', e.target.value) }
                    placeholder = '链接地址'
                  ></Input>
                </div>
              )}
            />
            <Column
              title="备注"
              key="comment"
              render={(text, record) => (
                <div>
                  <Input
                    defaultValue = { record.comment }
                    onChange = { (e) => handleRowChange(record._id, 'comment', e.target.value) }
                    placeholder = '内容'
                  ></Input>
                </div>
              )}
            />
            <Column
              title="操作"
              key="action"
              render={(text, record) => {
                  return (
                    <Space size="middle">
                      <a
                        onClick = { () => deleteRow(record) }
                      >删除
                      </a>
                    </Space>
                  )
                }
              }
            />
          </Table>
        </div>
      </div>
    </div>
  )
}

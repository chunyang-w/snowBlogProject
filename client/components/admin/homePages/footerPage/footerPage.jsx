import React, {
  useEffect,
  useState
} from 'react'
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
import style from './FooterPage.css'
import herald from '@client/herald/herald'
import config from '../../../../../config/config'

const serverUrl= (
  process.env.NODE_ENV === 'dev' ? config.server.devURL :
  process.env.NODE_ENV === 'test' ? config.server.testURL : 
  config.server.prodURL
) + ':' + String(config.server.staticPort)

const { Column } = Table
const { Option } = Select


export default function() {

  const [pageId, setPageId] = useState('')
  const [pageExtraInfo, setPageExtraInfo] = useState('')
  const [textLinkData, setTextLinkData] = useState([])
  const [iconLinkData, setIconLinkData] = useState([])

  async function uploadForm() {
    console.log('in uploadForm')
    const res = await herald.put('/admin/pageDetail', {
      pageId,
      textLinkData,
      iconLinkData,
      pageExtraInfo
    })
    message.success('保存成功')
    console.log(res)
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
        type: 'footerPage'
      }
    })
    .then((res) => {
      res.data = res.data[0]
      console.log('indexPage.get res:', res)
      setPageId(res.data._id)
      setTextLinkData(res.data.textLinkList)
      setPageExtraInfo(res.data.extraInfo)
    })
    .catch(err => {
      console.log('upload failed', err)
    })
  }

  useEffect(() => {
    console.log('in Admin/FooterPage')
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

      <div className = { style.uploadArea }>
          <div className = { style.uploadAreaLabel }><h3>版权/备案信息</h3></div>
          <div className = { style.uploadAreaVal }>
            <Input
              value = { pageExtraInfo }
              onChange = { (e) => {
                setPageExtraInfo(e.target.value)
              } }
            ></Input>
          </div>
      </div>

      <div className = { style.mainArea }>

        <div className = { style.textLinkArea }>
          <div className = { style.textLinkAreaToolBar }>
            <div>
              <h3>尾页链接配置</h3>
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
                    disabled
                    defaultValue = { true }
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
                    onChange = { (val) => handleRowChange(record._id, 'fontSize', val) }
                    disabled
                    defaultValue = 'medium'
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
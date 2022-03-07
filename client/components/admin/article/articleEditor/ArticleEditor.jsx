import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import style from './ArticleEditor.css'

import { 
  Button, message
} from 'antd'

import {
  SaveOutlined
} from '@ant-design/icons'

import Quill from 'quill'

import herald from '@client/herald/herald'

export default function ArticleEditor() {

  const params = useParams()
  const [articleData, setArticleData] = useState({})
  const [editor, setEditor] = useState()
  const [articleId, setArticleId] = useState()

  useEffect(async () => { // initialize Quill Editor
    let articleRaw
    let article
    let editorInstance
    // fetch params:
    const id = params.articleId
    setArticleId(id)
    console.log('articleId:', id)
    // create Quill instance
    editorInstance = new Quill('#admin-editor-content', editorOptions)
    console.log('QuillEditor created:',editorInstance)
    // fetch context
    articleRaw = await getArticle(id)
    article = articleRaw.data
    setArticleData(article)
    console.log('Editor Context:', article)
    // setContent:
    if (article.content !== '') {
      console.log('parsing:', article.content)
      const content = JSON.parse(article.content)
      console.log('setting content', content)
      editorInstance.setContents(content)
    }
    // setEditor
    setEditor(editorInstance)
  }, [])

  return (
    <div className = { style.container }>
      <div className = { style.header }>
        <div className = { style.left }>
          <h1> { articleData.articleTitle } </h1>
        </div>
        <div className = { style.right}>
          <Button
            icon = { <SaveOutlined/> }
            onClick = {() => {
              const content = editor.getContents()
              const plainText = editor.getText()
              console.log('content got:', content, plainText, articleId)
              setContent(articleId, JSON.stringify(content), plainText)
              .then(() => {
                message.success('保存成功')
              })
            }}
            >
          </Button>
        </div>
      </div>
      <div className = {style.editor} >
        <div id = 'admin-editor-toolbar' className = { style.toolbar }></div>
        <div id = 'admin-editor-content' className = { style.content }></div>
      </div>
    </div>
  )
}

const editorOptions = {
  modules: {
    toolbar: [
      // [{ container: 'admin-editor-toolbar' }],
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline'],
      ['image', 'code-block']
    ],
  },
  scrollingContainer: '.ql-editor',
  placeholder: 'Compose an epic...',
  theme: 'snow'
}

async function getArticle(articleId) {
  console.log('in getArticle, articleId', articleId)
  return herald.get('/admin/articleEdit', {
    params: {
      articleId: articleId
    }
  })
}

async function setContent(articleId, content, plainText) {
  const summary = (plainText.length < 200 ? plainText : plainText.slice(200)).replace(/\n/g, ' ')
  return herald.put('admin/article', {
    articleId: articleId,
    content: content,
    lastModified: new Date().getTime(),
    summary: summary
  })
}
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import style from './ArticlePage.css'
import Quill from 'quill'
import herald from '@client/herald/herald'
import hljs from 'highlight.js/lib/common'
import Comment from '../comment/Comment.jsx'

export default function ArticleEditor() {

  const clientType = useSelector((state) => state.window.deviceType)
  const params = useParams()
  const articleId = params.articleId
  const [articleContent, setArticleContent] = useState(null)
  const [editor, setEditor] = useState()

  useEffect(() => {
    document.querySelectorAll('pre').forEach((el) => {
      hljs.highlightElement(el);
    })
  }, [articleContent])

  useEffect(() => {
    // get content
    getArticle(articleId)
    .then((res) => {
      console.log('content got:', res.data[0].content)
      const editorInstance = new Quill('#open-editor-content', editorOptions)
      console.log('editorInstance, content:', editorInstance, JSON.parse(res.data[0].content))
      editorInstance.setContents(JSON.parse(res.data[0].content))
      setEditor(editorInstance)
      setArticleContent(res.data[0].content)
    })
  }, [])

  return (
    <div className = { style.container }>
      <div className = { style.header }>

      </div>
      <div className = {style.editor} >
        <div className = {clientType === 'client' ? style.contentWrapperClient : style.contentWrapperMobile}>
          <div
            id = 'open-editor-content'
            className = { style.content }
            style = { {border: 0} }
            >
          </div>
        </div>
      </div>
      <Comment
        ownerArticleId = { articleId.toString() }
      />
    </div>
  )
}

const editorOptions = {
  modules: {
    toolbar: false
  },
  readOnly: true,
  scrollingContainer: '.ql-editor',
  placeholder: 'Compose an epic...',
  theme: 'snow'
}

function getArticle(articleId) {
  console.log('in getArticle, articleId', articleId)
  return herald.get('/open/articleContent', {
    params: {
      articleId: articleId
    }
  })
}
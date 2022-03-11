import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import style from './ArticlePage.css'
import Quill from 'quill'
import herald from '@client/herald/herald'

export default function ArticleEditor() {
  const params = useParams()
  const articleId = params.articleId
  const [articleContent, setArticleContent] = useState(null)
  const [editor, setEditor] = useState()

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
      <button
        onClick = {
          () => console.log(editor.root.innerHTML)
        }
      > sfsdfssf ds</button>
      <div className = {style.editor} >
        <div
          id = 'open-editor-content'
          className = { style.content }
          style = { {border: 0} }
          >
        </div>
      </div>
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
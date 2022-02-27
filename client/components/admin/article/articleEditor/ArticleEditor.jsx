import React from 'react'
import style from './Article.css'

import Quill from 'quill'

export default class ArticleEditor extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    const options = {
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
    const editor = new Quill('#admin-editor-content', options)
    console.log(editor)
  }
  render() {
    return (
      <div className = { style.container }>
        <div className = { style.header }>

        </div>
        <div className = {style.editor} >
          <div id = 'admin-editor-toolbar' className = { style.toolbar }></div>
          <div id = 'admin-editor-content' className = { style.content }></div>
        </div>
      </div>

    )
  }
}
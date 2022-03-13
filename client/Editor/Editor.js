import Quill from 'quill'

const CodeBlock = Quill.import('formats/code-block')
CodeBlock.className = 'hljs'
Quill.register(CodeBlock, true)
export default Quill
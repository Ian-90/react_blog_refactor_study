import { useState, useEffect, useRef } from 'react'
import classNames from 'classnames/bind'
import styles from './EditorPane.module.scss'
import CodeMirror from 'codemirror'
import 'codemirror/mode/markdown/markdown'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/jsx/jsx'
import 'codemirror/mode/css/css'
import 'codemirror/mode/shell/shell'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/monokai.css'

const cx = classNames.bind(styles)

const EditorPane = ({
  title,
  tags,
  markdown,
  onChangeInput,
}) => {
  const editor = useRef()
  const [codeMirror, setCodeMirror] = useState(null)
  const [cursor, setCursor] = useState(null)

  const handleChange = ({ target: { value, name }}) => onChangeInput({ name, value })

  const handleChangeMarkdown = (doc) => {
    setCursor(doc.getCursor())
    onChangeInput({
      name: 'markdown',
      value: doc.getValue()
    })
  }

  const initializeEditor = () => {
    const codeMirrorEditor = CodeMirror(editor.current, {
      mode: 'markdown',
      theme: 'monokai',
      lineNumbers: true,
      lineWrapping: true,
    })
  
    codeMirrorEditor.on('change', handleChangeMarkdown)
    setCodeMirror(codeMirrorEditor)
  }

  useEffect(() => {
    initializeEditor()
  }, [])

  useEffect(() => {
    if (markdown) {
      if (codeMirror) {
        codeMirror.setValue(markdown)
      }

      if (cursor) {
        codeMirror.setCursor(cursor)
      }
    }
  }, [markdown])

  return (
    <div className={cx('editor-pane')}>
      <input
        className={cx('title')}
        placeholder="제목을 입력하세요"
        name="title"
        value={title}
        onChange={handleChange}
      />
      <div className={cx('code-editor')} ref={editor}></div>
      <div className={cx('tags')}>
        <div className={cx('description')}>태그</div>
        <input
          name="tags"
          placeholder="태그를 입력하세요 (쉼표로 구분)"
          value={tags}
          onChange={handleChange}
        />
      </div>
    </div>
  )
}

export default EditorPane

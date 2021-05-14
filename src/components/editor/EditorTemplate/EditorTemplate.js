import { useState } from 'react'
import classNames from 'classnames/bind'
import styles from './EditorTemplate.module.scss'

const cx = classNames.bind(styles)

const EditorTemplate = ({ header, editor, preview}) => {
  const [leftPercentage, setLeftPercentage] = useState(0.5)

  const handleMouseMove = (e) => setLeftPercentage(e.clientX / window.innerWidth)
  const handleMouseUp = (e) => {
    document.body.removeEventListener('mousemove', handleMouseMove)
    window.removeEventListener('mouseup', handleMouseUp)
  }

  const handleSeparatorMouseDown = (e) => {
    document.body.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
  }

  const leftStyle = {
    flex: leftPercentage
  }

  const rightStyle = {
    flex: 1 - leftPercentage
  }

  const separatorStyle = {
    left: `${leftPercentage * 100}%`
  }

  return (
    <div className={cx('editor-template')}>
      {header}
      <div className={cx('panes')}>
        <div className={cx('pane', 'editor')} style={leftStyle}>
          {editor}
        </div>
        <div className={cx('pane', 'preview')} style={rightStyle}>
          {preview}
        </div>
        <div
          className={cx('separator')}
          style={separatorStyle}
          onMouseDown={handleSeparatorMouseDown}
        />
      </div>
    </div>
  )
}

export default EditorTemplate

// import React, { Component } from 'react'
import { useState, useEffect } from 'react'
import classNames from 'classnames/bind'
import styles from './MarkdownRender.module.scss'
import marked from 'marked'
import Prism from 'prismjs'
import 'prismjs/themes/prism-okaidia.css'
import DOMPurify from 'dompurify'

const cx = classNames.bind(styles)

const MarkdownRender = ({ markdown }) => {
  const [html, setHtml] = useState('')

  const renderMarkdown = () => {
    if (!markdown) {
      setHtml('')
      return
    }

    setHtml(DOMPurify.sanitize(marked(markdown, {
      breaks: true,
    })))
  }

  useEffect(() => {
    renderMarkdown()
  }, [markdown])

  useEffect(() => {
    Prism.highlightAll()
  }, [html])

  const markup = {
    __html: html
  }

  return (
    <div className={cx('markdown-render')} dangerouslySetInnerHTML={markup} />
  )
}

export default MarkdownRender

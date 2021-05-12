import { useEffect } from 'react'
import EditorHeader from 'components/editor/EditorHeader'
import { useSelector, useDispatch } from 'react-redux'
import { withRouter } from 'react-router-dom'
import * as editorActions from 'store/modules/editor'
import queryString from 'query-string'

const EditorHeaderContainer = ({ history, location }) => {
  const { id } = queryString.parse(location.search)
  const { title, markdown, tags } = useSelector(state => state.editor)
  const dispatch = useDispatch()
  const handleGoBack = () => history.goBack()
  const handleSubmit = async () => {
    const post = {
      title,
      body: markdown,
      tags: tags === "" ? [] : [...new Set(tags.split(',').map(tag => tag.trim()))]
    }

    try {
      if (id) {
        await editorActions.editPost({ id, ...post })
        history.push(`/post/${id}`)
        return
      }

      dispatch(editorActions.writePost(post, history))
    } catch(e) {
      console.log(e)
    }
  }

  useEffect(() => {
    dispatch(editorActions.initialize())
    if (id) {
      dispatch(editorActions.getPost(id))
    }
  }, [id, dispatch])
  
  return (
    <EditorHeader
      onGoBack={handleGoBack}
      onSubmit={handleSubmit}
      isEdit={id ? true : false}
    />
  )
}

export default withRouter(EditorHeaderContainer)

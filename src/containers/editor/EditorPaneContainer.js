import EditorPane from 'components/editor/EditorPane'
import { useDispatch, useSelector } from 'react-redux'
import * as editorActions from 'store/modules/editor'

const EditorPaneContainer = () => {
  const { title, markdown, tags } = useSelector(state => state.editor)
  const dispatch = useDispatch()
  const handleChangeInput = ({ name, value }) => dispatch(editorActions.changeInput({ name, value }))

  return (
    <EditorPane
      title={title}
      markdown={markdown}
      tags={tags}
      onChangeInput={handleChangeInput}
    />
  )
}

export default EditorPaneContainer

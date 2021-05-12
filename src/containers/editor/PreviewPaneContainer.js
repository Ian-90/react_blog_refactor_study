import { useSelector } from 'react-redux'
import PreviewPane from 'components/editor/PreviewPane'

const PreviewPaneContainer = () => {
  const { title, markdown } = useSelector(state => state.editor)
  return (
    <PreviewPane
      title={title}
      markdown={markdown}
    />
  )  
}

export default PreviewPaneContainer

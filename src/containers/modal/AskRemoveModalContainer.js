import { useSelector, useDispatch } from 'react-redux'
import * as baseActions from 'store/modules/base'
import * as postActions from 'store/modules/post'
import AskRemoveModal from 'components/modal/AskRemoveModal'
import { useHistory, useParams } from 'react-router-dom'

const AskRemoveModalContainer = () => {
  const history = useHistory()
  const { id } = useParams()
  const { visible } = useSelector(state => ({
    visible: state.base.modal.remove
  }))
  const dispatch = useDispatch()

  const handleCancel = () => dispatch(baseActions.hideModal('remove'))

  const handleConfirm = async () => {
    try {
      await postActions.removePost(id)
      dispatch(baseActions.hideModal('remove'))
      history.push('/')
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <AskRemoveModal
      visible={visible}
      onCancel={handleCancel}
      onConfirm={handleConfirm}
    />
  )
}

export default AskRemoveModalContainer

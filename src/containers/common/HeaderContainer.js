import Header from 'components/common/Header'
import { useParams } from 'react-router-dom'
import * as baseActions from 'store/modules/base'
import { useSelector, useDispatch } from 'react-redux'

const HeaderContainer = () => {
  const { logged } = useSelector(state => state.base)
  const dispatch = useDispatch()
  const { id } = useParams()
  const handleRemove = () => dispatch(baseActions.showModal('remove'))
  return (
    <Header
      postId={id}
      logged={logged}
      onRemove={handleRemove}
    />
  )
}

export default HeaderContainer

import Footer from 'components/common/Footer'
import { useSelector, useDispatch } from 'react-redux'
import * as baseActions from 'store/modules/base'

const FooterContainer = () => {
  const { logged } = useSelector(state => state.base)
  const dispatch = useDispatch()
  const handleLoginClick = async () => {
    if (logged) {
      try {
        await baseActions.logout()
        localStorage.removeItem('logged')
        window.location.reload()
      } catch(e) {
        console.log(e)
      }
      return
    }
    dispatch(baseActions.showModal('login'))
    dispatch(baseActions.initializeLoginModal())
  }
  return (
    <Footer onLoginClick={handleLoginClick} logged={logged} />
  )
}

export default FooterContainer

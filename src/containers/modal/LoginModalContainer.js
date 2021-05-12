import LoginModal from 'components/modal/LoginModal'
import { useSelector, useDispatch } from 'react-redux'
import * as baseActions from 'store/modules/base'

const LoginModalContainer = () => {
  const { visible, password, error } = useSelector(state => ({
    visible: state.base.modal.login,
    password: state.base.loginModal.password,
    error: state.base.loginModal.error,
  }))
  const dispatch = useDispatch()
  const handleLogin = async () => {
    try {
      dispatch(baseActions.login(password))
      dispatch(baseActions.hideModal('login'))
      localStorage.setItem('logged', true)
    } catch(e) {
      console.log(e)
    }
  }

  const handleCancel = () => dispatch(baseActions.hideModal('login'))

  const handleChange = (e) => dispatch(baseActions.changePasswordInput(e.target.value))

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      return handleLogin()
    }
  }

  return (
    <LoginModal
      visible={visible}
      error={error}
      password={password}
      onLogin={handleLogin}
      onCancel={handleCancel}
      onChange={handleChange}
      onKeyPress={handleKeyPress}
    />
  )
}

export default LoginModalContainer

import { useEffect } from 'react'
import LoginModalContainer from 'containers/modal/LoginModalContainer'
import { useDispatch } from 'react-redux'
import * as baseActions from 'store/modules/base'

const Base = () => {
  const dispatch = useDispatch()
  const initialize = async () => {
    if (localStorage.getItem('logged') === "true") {
      dispatch(baseActions.tempLogin())
    }
    dispatch(baseActions.checkLogin())
  }

  useEffect(() => {
    initialize()
  }, [])

  return (
    <div>
      <LoginModalContainer />
    </div>
  )
}

export default Base

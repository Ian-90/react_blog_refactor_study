import produce from 'immer'
import * as api from 'lib/api'

const SHOW_MODAL = 'base/SHOW_MODAL'
const HIDE_MODAL = 'base/HIDE_MODAL'
const LOGIN = 'base/LOGIN'
const LOGIN_SUCCESS = 'base/LOGIN_SUCCESS'
const LOGIN_ERROR = 'base/LOGIN_ERROR'
const LOGOUT = 'base/LOGOUT'
const CHECK_LOGIN = 'base/CHECK_LOGIN'
const CHECK_LOGIN_SUCCESS = 'base/CHECK_LOGIN_SUCCESS'
const CHECK_LOGIN_ERROR = 'base/CHECK_LOGIN_ERROR'
const CHANGE_PASSWORD_INPUT = 'base/CHANGE_PASSWORD_INPUT'
const INITIALIZE_LOGIN_MODAL = 'base/INITIALIZE_LOGIN_MODAL'
const TEMP_LOGIN = 'base/TEMP_LOGIN'

const initialState = {
  modal: {
    remove: false,
    login: false,
  },
  loginModal: {
    password: '',
    error: false,
  },
  logged: false,
  loading: false,
  error: null,
}

export const showModal = (modalName) => ({ type: SHOW_MODAL, payload: modalName })
export const hideModal = (modalName) => ({ type: HIDE_MODAL, payload: modalName })
export const initializeLoginModal = () => ({ type: INITIALIZE_LOGIN_MODAL} )
export const changePasswordInput = (value) => ({ type: CHANGE_PASSWORD_INPUT, payload: value })
export const login = (password) => async (dispatch) => {
  dispatch({ type: LOGIN })
  try {
    const { data } = await api.login(password)
    dispatch({ type: LOGIN_SUCCESS, payload: data.success })
  } catch (error) {
    dispatch({ type: LOGIN_ERROR, payload: error })
  }
}
export const checkLogin = () => async (dispatch) => {
  dispatch({ type: CHECK_LOGIN })
  try {
    const { logged } = await api.checkLogin()
    dispatch({ type: CHECK_LOGIN_SUCCESS, payload: logged })
  } catch (error) {
    dispatch({ type: CHECK_LOGIN_ERROR, payload: error })
  }
}
export const tempLogin = () => ({ type: TEMP_LOGIN })
export const logout = api.logout

const loginReducer = produce((state, action) => {
  switch(action.type) {
    case SHOW_MODAL:
      state.modal[action.payload] = true
      return state
    case HIDE_MODAL:
      state.modal[action.payload] = false
      return state
    case INITIALIZE_LOGIN_MODAL:
      state.loginModal = {
        password: '',
        error: false,
      }
      return state
    case CHANGE_PASSWORD_INPUT:
      state.loginModal.password = action.payload
      return state
    case LOGIN:
      state.loading = true
      return state
    case LOGIN_SUCCESS:
      state.loading = false
      state.logged = action.payload
      return state
    case LOGIN_ERROR:
      state.loading = false
      state.error = action.payload
      return state
    case CHECK_LOGIN:
      state.loading = true
      return state
    case CHECK_LOGIN_SUCCESS:
      state.loading = false
      state.logged = action.payload
      return state
    case CHECK_LOGIN_ERROR:
      state.loading = false
      state.error = action.payload
      return state
    case TEMP_LOGIN:
      state.logged = true
      return state
    default:
      return state
  }
}, initialState)

export default loginReducer

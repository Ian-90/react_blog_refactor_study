import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import produce from 'immer'
import * as api from 'lib/api'

const loginPost = async (password) => {
  try {
    const res = await api.login(password)
    return res.data.success
  } catch (err) {
    console.error(err)
  }
}

export const login = createAsyncThunk('LOGIN', loginPost)

const getCheckLogin = async () => {
  try {
    const res = await api.checkLogin()
    return res.data.logged
  } catch (err) {
    console.error(err)
  }
}

export const checkLogin = createAsyncThunk('CHECK_LOGIN', getCheckLogin)

export const logout = api.logout

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

const baseSlice = createSlice({
  name: 'base',
  initialState,
  reducers: {
    showModal: (state, action) => {
      state.modal[action.payload] = true
    },
    hideModal: (state, action) => {
      state.modal[action.payload] = false
    },
    initializeLoginModal: (state, action) => {
      state.loginModal = {
        password: '',
        error: false,
      }
    },
    changePasswordInput: (state, action) => {
      state.loginModal.password = action.payload
    },
    tempLogin: (state, action) => {
      state.logged = true
    }
  },
  extraReducers: {
    [login.pending]: (state, action) => {
      state.loading = true
    },
    [login.fulfilled]: (state, action) => {
      state.loading = false
      state.logged = action.payload
    },
    [login.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    [checkLogin.pending]: (state, action) => {
      state.loading = true
    },
    [checkLogin.fulfilled]: (state, action) => {
      state.loading = false
      state.logged = action.payload
    },
    [checkLogin.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
  },
})

export const { showModal, hideModal, initializeLoginModal, changePasswordInput, tempLogin } = baseSlice.actions
export default baseSlice.reducer

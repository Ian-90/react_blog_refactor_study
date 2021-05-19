import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as api from 'lib/api'

export const removePost = api.removePost

const fetchPost = async (id) => {
  try {
    const res = await api.getPost(id)
    return res.data
  } catch (err) {
    console.error(err)
  }
}

export const getPost = createAsyncThunk('post/GET_POST',fetchPost)

const initialState = {
  loading: false,
  post: {},
  error: null
}

const postSlice = createSlice({
  name: 'post',
  initialState,
  extraReducers: {
    [getPost.pending]: (state, action) => {
      state.loading = true
    },
    [getPost.fulfilled]: (state, action) => {
      state.loading = false
      state.post = action.payload
    },
    [getPost.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
  }
})

export default postSlice.reducer

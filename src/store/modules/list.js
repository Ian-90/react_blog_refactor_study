import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as api from 'lib/api'

const fetchPostList = async ({ page, tag }) => {
  try {
    const res = await api.getPostList({ page, tag })
    return {
      posts: res.data,
      lastPage: res.headers['last-page']
    }
  } catch (err) {
    console.error(err)
  }
}

export const getPostList = createAsyncThunk('list/GET_POST_LIST', fetchPostList)

const initialState = {
  loading: false,
  posts: [],
  error: null,
  lastPage: null,
}

const listSlice = createSlice({
  name: 'list',
  initialState,
  extraReducers: {
    [getPostList.pending]: (state, action) => {
      state.loading = true
    },
    [getPostList.fulfilled]: (state, action) => {
      state.loading = false
      state.posts = action.payload.posts
      state.lastPage = Number(action.payload.lastPage)
    },
    [getPostList.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload
    }
  }
})

export default listSlice.reducer

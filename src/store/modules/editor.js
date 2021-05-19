import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as api from 'lib/api'

const writePostPush = async (post, history) => {
  try {
    const res = await api.writePost(post)
    history.push(`/post/${res.data._id}`)
    return res.data._id
  } catch (err) {
    console.error(err)
  }
}

export const writePost = createAsyncThunk('WRITE_POST', writePostPush)

const fetchPost = async (id) => {
  try {
    const res = await api.getPost(id)
    return res.data
  } catch (err) {
    console.error(err)
  }
}

export const getPost = createAsyncThunk('GET_POST', fetchPost)

export const editPost = api.editPost

const initialState = {
  loading: false,
  title: '',
  markdown: '',
  tags: '',
  postId: null,
  error: null,
}

const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    initialize: (state) => initialState,
    changeInput: (state, action) => {
      const { name, value } = action.payload
      state[name] = value
    }
  },
  extraReducers: {
    [writePost.pending]: (state, action) => {
      state.loading = true
    },
    [writePost.fulfilled]: (state, action) => {
      state.loading = false
      state.postId = action.payload
    },
    [writePost.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    [getPost.pending]: (state, action) => {
      state.loading = true
    },
    [getPost.fulfilled]: (state, action) => {
      const { title, tags, body } = action.payload
      state.loading = false
      state.title = title
      state.markdown = body
      state.tags = tags.join(',')
    },
    [getPost.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
  }
})

export const { initialize, changeInput } = editorSlice.actions

export default editorSlice.reducer

import produce from 'immer'
import * as api from 'lib/api'

const GET_POST_LIST = 'list/GET_POST_LIST'
const GET_POST_LIST_SUCCESS = 'list/GET_POST_LIST_SUCCESS'
const GET_POST_LIST_ERROR = 'list/GET_POST_LIST_ERROR'

export const getPostList = ({ page, tag }) => async dispatch => {
  dispatch({ type: GET_POST_LIST })
  try {
    const { data: posts, headers } = await api.getPostList({ page, tag })
    const lastPage = headers['last-page']
    dispatch({ type: GET_POST_LIST_SUCCESS, payload: { posts, lastPage } })
  } catch (error) {
    dispatch({ type: GET_POST_LIST_ERROR, payload: error })
  }
}

const initialState = {
  loading: false,
  posts: [],
  error: null,
  lastPage: null,
}

const listReducer = produce((state, action) => {
  switch (action.type) {
    case GET_POST_LIST:
      state.loading = true
      return state
    case GET_POST_LIST_SUCCESS:
      state.loading = false
      state.posts = action.payload.posts
      state.lastPage = Number(action.payload.lastPage)
      return state
    case GET_POST_LIST_ERROR:
      state.loading = false
      state.error = action.payload
      return state
    default:
      return state
  }
}, initialState)

export default listReducer

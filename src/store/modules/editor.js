import produce from 'immer'
import * as api from 'lib/api'

const INITIALIZE = 'editor/INITIALIZE'
const CHANGE_INPUT = 'editor/CHANGE_INPUT'
const WRITE_POST = 'editor/WRITE_POST'
const WRITE_POST_SUCCESS = 'editor/WRITE_POST_SUCCESS'
const WRITE_POST_ERROR = 'editor/WRITE_POST_ERROR'
const GET_POST = 'editor/GET_POST'
const GET_POST_SUCCESS = 'editor/GET_POST_SUCCESS'
const GET_POST_ERROR = 'editor/GET_POST_ERROR'

export const initialize = () => ({ type: INITIALIZE })
export const changeInput = ({ name, value }) => ({ type: CHANGE_INPUT, payload: { name, value }})
export const writePost = (post, history) => async (dispatch) => {
  dispatch({ type: WRITE_POST })
  try {
    const { data } = await api.writePost(post)
    dispatch({ type: WRITE_POST_SUCCESS, payload: data._id })
    history.push(`/post/${data._id}`)
  } catch (error) {
    dispatch({ type: WRITE_POST_ERROR, payload: error })
  }
}
export const getPost = (id) => async (dispatch) => {
  dispatch({ type: GET_POST })
  try {
    const { data } = await api.getPost(id)
    dispatch({ type: GET_POST_SUCCESS, payload: data})
  } catch (error) {
    dispatch({ type: GET_POST_ERROR, payload: error})
  }
}
export const editPost = api.editPost

const initialState = {
  loading: false,
  title: '',
  markdown: '',
  tags: '',
  postId: null,
  error: null,
}

const editorReducer = produce((state, action) => {
  switch(action.type) {
    case INITIALIZE:
      return initialState
    case CHANGE_INPUT:
      const { name, value } = action.payload
      state[name] = value
      return state
    case WRITE_POST:
      state.loading = true
      return state
    case WRITE_POST_SUCCESS:
      state.loading = false
      state.postId = action.payload
      return state
    case WRITE_POST_ERROR:
      state.loading = false
      state.error = action.payload
      return state
    case GET_POST:
      state.loading = true
      return state
    case GET_POST_SUCCESS:
      const { title, tags, body } = action.payload
      state.loading = false
      state.title = title
      state.markdown = body
      state.tags = tags.join(',')
      return state
    case GET_POST_ERROR:
      state.loading = false
      state.error = action.payload
      return state

    default:
      return state
  }
}, initialState)

export default editorReducer

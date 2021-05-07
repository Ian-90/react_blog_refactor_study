import produce from 'immer'
import * as api from 'lib/api'

const GET_POST = 'post/GET_POST'
const GET_POST_SUCCESS = 'post/GET_POST_SUCCESS'
const GET_POST_ERROR = 'post/GET_POST_ERROR'

// TODO: REMOVE modal 연동 필요
const REMOVE_POST = 'post/REMOVE_POST'

export const getPost = (id) => async (dispatch) => {
  dispatch({ type: GET_POST})
  try {
    const { data } = await api.getPost(id)
    dispatch({ type: GET_POST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: GET_POST_ERROR, payload: error })
  }
}

const initialState = {
  loading: false,
  post: {},
  error: null
}

const postReducer = produce((state, action) => {
  switch(action.type) {
    case GET_POST:
      state.loading = true
      return state
    case GET_POST_SUCCESS:
      state.loading = false
      state.post = action.payload
      return state
    case GET_POST_ERROR:
      state.loading = false
      state.error = action.payload
      return state
    default:
      return state
  }
}, initialState)

export default postReducer

// export default handleActions({
//   ...pender({
//     type: GET_POST,
//     onSuccess: (state, action) => {
//       const { data: post } = action.payload
//       return state.set('post', fromJS(post))
//     }
//   })
// }, initiaState)

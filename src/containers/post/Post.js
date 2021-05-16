import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PostInfo from 'components/post/PostInfo'
import PostBody from 'components/post/PostBody'
import { getPost } from 'store/modules/post'
import { initialize } from 'store/modules/editor'

const Post = ({ id }) => {
  const { loading, post, error } = useSelector((state) => state.post)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initialize())
    dispatch(getPost(id))
  }, [dispatch, id])

  if (loading) {
    return <div>loading...</div>
  }

  if (error) {
    return <div>error!!</div>
  }

  const { title, body, pulishedDate, tags } = post
  return (
    <div>
      <PostInfo
        title={title}
        pulishedDate={pulishedDate}
        tags={tags}
      />
      <PostBody body={body} />
    </div>
  )
}

export default Post

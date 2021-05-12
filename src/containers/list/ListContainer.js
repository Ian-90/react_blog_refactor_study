import React, { useEffect } from 'react'
import PostList from 'components/list/PostList'
import Pagination from 'components/list/Pagination'
import { useSelector, useDispatch } from 'react-redux'
import { getPostList } from 'store/modules/list'

const ListContainer = ({ tag, page }) => {
  const { loading, posts, lastPage } = useSelector(state => state.list)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getPostList({ page, tag }))
    document.documentElement.scrollTop = 0
  }, [page, tag, dispatch])

  if (loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <PostList posts={posts} />
      <Pagination page={page} lastPage={lastPage} tag={tag} />
    </div>
  )
}

export default ListContainer

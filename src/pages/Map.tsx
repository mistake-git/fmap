import React, { Fragment, useEffect, useState, useContext } from 'react'
import Template from '../components/layouts/Template'
import GoogleMap from '../components/map/GoogleMap'
import PostModel from '../models/PostModel'
import Loading from '../components/layouts/Loading'
import SearchForm from '../components/layouts/SearchForm'
import { Box } from '@material-ui/core'
import PostsRepository from '../repositories/PostsRepository'
import { CurrentUserContext } from '../CurrentUser'

const Map = () => {
  const [posts, setPosts] = useState<PostModel[] | null>(null)
  const placeHolder = '釣りたい魚を検索 例 タイ'
  const { currentUser } = useContext(CurrentUserContext)

  //非同期で投稿をAPIから取得
  const getPosts = async () => {
    try {
      await PostsRepository.getMapPosts().then((results) => {
        console.log(results)
        setPosts(results)
      })
    } catch (error) {
      console.log(error.message)
    }
  }

  const search = async (search: string) => {
    try {
      PostsRepository.search(search).then((results) => {
        console.log(results)
        setPosts(results)
      })
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    getPosts()
  }, [setPosts])

  return (
    <Fragment>
      {posts ? (
        <Template>
          <Box my={3}>
            <SearchForm placeHolder={placeHolder} search={search} />
          </Box>
          <GoogleMap posts={posts} currentUser={currentUser} />
        </Template>
      ) : (
        <Loading />
      )}
    </Fragment>
  )
}

export default Map

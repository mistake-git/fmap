import React, { Fragment, useEffect, useState } from 'react'
import Template from '../components/layouts/Template'
import GoogleMap from '../components/map/GoogleMap'
import PostModel from '../models/PostModel'
import SearchForm from '../components/layouts/SearchForm'
import { Box, makeStyles, Typography } from '@material-ui/core'
import PostsRepository from '../repositories/PostsRepository'
import ContentsLoading from '../components/layouts/ContentsLoading'

const useStyles = makeStyles(() => ({
  countText: {
    fontWeight: 'bold',
    color: '#3f51b5;',
    fontSize: '1.3rem',
  },
}))

const Map = () => {
  const [posts, setPosts] = useState<PostModel[] | null>(null)
  const placeHolder = '魚を検索 例 タイ'
  const classes = useStyles()

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
    <Template>
      <Box my={3}>
        <SearchForm placeHolder={placeHolder} search={search} />
      </Box>
      {posts ? (
        <Fragment>
          <Typography>
            現在<span className={classes.countText}>{posts.length}</span>
            件の釣果
          </Typography>
          <GoogleMap posts={posts} />
        </Fragment>
      ) : (
        <ContentsLoading />
      )}
    </Template>
  )
}

export default Map

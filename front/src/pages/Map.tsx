import React, { Fragment, useEffect, useState } from 'react'
import Template from '../components/layouts/Template'
import GoogleMap from '../components/map/GoogleMap'
import PostModel from '../models/PostModel'
import Loading from '../components/layouts/Loading'
import { myHttpClient } from '../plugins/axios'

const Home = () => {
  const [posts, setPosts] = useState<PostModel[] | null>(null)
  const [loading, setLoading] = useState(true)
  //非同期で投稿をAPIから取得
  const getPosts = async () => {
    try {
      await myHttpClient.get('/posts').then((results) => {
        console.log(results)
        setPosts(results.data)
      })
    } catch (error) {
      alert(error.message)
    }
    setLoading(false)
  }

  useEffect(() => {
    getPosts()
  }, [setPosts])

  return (
    <Fragment>
      {loading && <Loading />}
      {posts && (
        <Template>
          <GoogleMap posts={posts} />
        </Template>
      )}
    </Fragment>
  )
}

export default Home

import React, { Fragment, useEffect } from "react";
import { Container, Grid } from "@material-ui/core";
import Template from "../../components/layouts/Template";
import PostCard from "../../components/posts/PostCard"
import axios from 'axios'
import PostModel from "../../models/PostModel";
import Loading from "../../components/layouts/Loading";

interface State {
  posts: PostModel[]
  post: PostModel
}
const Posts = (props: any) => {
 
  const [posts, setPosts] = React.useState<PostModel[]>([])
  const [loading, setLoading] = React.useState(true);
　
  //非同期で投稿をAPIから取得
  const getPosts = async() => {
    try { 
    await
      axios.get('http://localhost:3000/api/v1/posts')
      .then((results) => {
        console.log(results)
        setPosts(results.data)
      })
    }
    catch (error) {
      alert(error.message);
    }
  　setLoading(false);
  }

  useEffect(() => {
    getPosts();
  },[setPosts]);

  return (
    <Fragment>
      {loading &&
       <Loading />
      }
      <Template>
        <Container maxWidth="md">
          <Grid container style={{ marginTop: "3em" }}>
          {posts.map((post) => {
            return(
              <Grid item xs={12} sm={6} md={4} style={{ marginTop: "1em" }}>
                <PostCard post={ post } key={post.id}/>
              </Grid>
            )
          })}
          </Grid>
        </Container>
        </Template>
    </Fragment>
  );
};
export default Posts;




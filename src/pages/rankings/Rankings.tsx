import React, { Fragment, useEffect, useState } from "react";
import { Box, Container, Divider, Grid, Typography } from "@material-ui/core";
import Template from "../../components/layouts/Template";
import PostCard from "../../components/posts/PostCard"
import PostModel from "../../models/PostModel";
import Loading from "../../components/layouts/Loading";
import * as H from 'history';
import PostsRepository from "../../repositories/PostsRepository";

interface Props {
  history: H.History;
  handleFlash: (message: string, severity: 'success'|'error') => void
  match: any
}

const Rankings = (props: Props) => {
const [posts, setPosts] = useState<PostModel[] | null>(null)

  useEffect(() => {
    //非同期で投稿をAPIから取得
    const getPosts = async() => {
      try { 
      await
        PostsRepository.getRankingPosts(props.match.params.id)
        .then((results) => {
          console.log(results)
          setPosts(results)
        })
      }
      catch (error) {
        console.log(error.message);
      }
    }
    getPosts();
  },[setPosts,props.match.params.id]);

  return (
    <Fragment>
      {posts ?
        <Template>
          <Container maxWidth="md">
            <Typography variant="h6" align="center" gutterBottom>
              サイズランキング(上位8件)
            </Typography>
            <Box mb={3}>
              <Divider/>
            </Box>
            <Grid container spacing={2}>
              {posts &&
                posts.map((post) => {
                  return(
                    <Grid item xs={12} sm={6} md={4}>
                      <PostCard post={post} key={post.id}/>
                    </Grid>
                  )
                })
              }
            </Grid>
          </Container>
          </Template>:
        <Loading/>
      }
    </Fragment>
  );
};
export default Rankings;


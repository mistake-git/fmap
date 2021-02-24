import React, { Fragment, useState } from "react";
import { Box, Grid, makeStyles, Typography } from "@material-ui/core";
import Template from "../../components/layouts/Template";
import PostCard from "../../components/posts/PostCard"
import PostModel from "../../models/PostModel";
import SearchForm from "../../components/layouts/SearchForm"
import InfiniteScroll  from "react-infinite-scroller"
import ContentsLoading from "../../components/layouts/ContentsLoading";
import PostsRepository from "../../repositories/PostsRepository";
import * as H from 'history';

const useStyles = makeStyles(() => ({
  countText:{
    fontWeight: 'bold',
    color: '#3f51b5;',
    fontSize: '1.3rem',
  }
}));

interface Props {
  history: H.History;
  match: any;
}

const Rankings = (props: Props) => {
  const [posts, setPosts] = useState<PostModel[]>([])
  const [hasMore, setHasMore] = useState(true);
  const　placeHolder ="魚を検索 例 タイ"
  const classes = useStyles();

  //非同期で投稿をAPIから取得
  const getPosts = async(page: number) => {
    try { 
      await
      PostsRepository.getRankingPosts(props.match.params.id, page)
      .then((results) => {
        console.log(results)
        if (results.length < 1) {
          setHasMore(false);
          return;
        }
        const newPosts = posts.concat(results)
        setPosts(newPosts)
      })
    }catch (error){
      console.log(error.message);
    }
  }

  const loadMore = async (page: number) => {
    getPosts(page)    
  }

  const search = async(search: string) => {
    try { 
    await
      PostsRepository.search(search)
      .then((results) => {
        console.log(results)
        setPosts(results)
      })
    }
    catch (error) {
      console.log(error.message);
    }
  }

  return (
    <Fragment>
      <Template>
        <Grid 
          container 
          component="main" 
          direction="row"
          justify="center"
        >
          <Grid item xs={12} sm={11} md={10} lg={8} >
            <Box my={3}>
              <SearchForm
                search={search}
                placeHolder={placeHolder}
              />
            </Box>
            <Typography variant="h6" align="center">
              サイズの大きい順
            </Typography>
            <Typography>現在<span className={classes.countText}>{posts.length}</span>件の釣果</Typography>
            <InfiniteScroll
              loadMore={loadMore} 
              hasMore={hasMore}
              loader={<ContentsLoading key={0}/>}>
                <Grid container>
                {
                  posts && posts.map((post) => {
                    return(
                      <Grid xs={12} sm={6} md={4} style={{ marginTop: "1em" }} key={post.id} item>
                        <PostCard post={post}/>
                      </Grid>
                    )
                  })
                }
              </Grid>
            </InfiniteScroll>
          </Grid>
        </Grid>
      </Template>
    </Fragment>
  );
};
export default Rankings;



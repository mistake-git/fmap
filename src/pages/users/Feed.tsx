import React, { Fragment, useState, useContext} from "react";
import { Box, Container, Grid } from "@material-ui/core";
import Template from "../../components/layouts/Template";
import PostCard from "../../components/posts/PostCard"
import PostModel from "../../models/PostModel";
import SearchForm from "../../components/layouts/SearchForm"
import InfiniteScroll  from "react-infinite-scroller"
import LoadingDots from "../../components/layouts/ContentsLoading";
import PostsRepository from "../../repositories/PostsRepository";
import { AuthContext } from '../../Auth'
import UsersRepository from "../../repositories/UsersRepository";
import auth from "../../plugins/firebase";

const Feed = () => {
  const [posts, setPosts] = useState<PostModel[]>([])
  const [hasMore, setHasMore] = useState(true);
  const　placeHolder ="釣りたい魚を検索 例 タイ"
  const { firebaseAuthUser } = useContext(AuthContext)

  //非同期でFeedをAPIから取得
  const getUserFeed = async(currentUserUid: string, page: number) => {
    if (firebaseAuthUser !== null){
      try { 
        await
        UsersRepository.getUserFeed(currentUserUid, page)
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
  }

  const loadMore = async (page: number) => {
    auth.onAuthStateChanged((user) => {
      if (firebaseAuthUser !== null && user !== null) {
        getUserFeed(user?.uid, page)   
        .catch((data) =>{
          console.log(data.user)
        })
      }
    });
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

  const loader = <LoadingDots/>;

  return (
    <Fragment>
      <Template>
        <Container maxWidth="md">
          <Box my={3}>
            <SearchForm
              search={search}
              placeHolder={placeHolder}
            />
          </Box>
          <InfiniteScroll
            loadMore={loadMore} 
            hasMore={hasMore}
            loader={loader}>
              <Grid container>
              {
                posts ? posts.map((post) => {
                  return(
                    <Grid xs={12} sm={6} md={4} style={{ marginTop: "1em" }} >
                      <PostCard post={post} key={post.id}/>
                    </Grid>
                  )
                }):
                <div>釣果がありません</div>
              }
            </Grid>
          </InfiniteScroll>
        </Container>
      </Template>
    </Fragment>
  );
};
export default Feed;


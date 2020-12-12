import React, { useEffect, Fragment, useState } from "react";
import { Container, createStyles, Divider, Grid, makeStyles, Theme} from "@material-ui/core";
import Template from "../../components/layouts/Template";
import Box from '@material-ui/core/Box';
import PostButtons from "../../components/posts/PostButtons"
import PostData from "../../components/posts/PostData";
import PostChart from "../../components/posts/PostChart";
import UserBar from "../../components/users/UserBar";
import CommentContainer from "../../components/comments/CommentContainer";
import update from 'react-addons-update'
import auth from "../../plugins/firebase";
import PostModel from "../../models/PostModel";
import CommentModel from "../../models/CommentModel";
import UserModel from "../../models/UserModel";
import Loading from "../../components/layouts/Loading";
import LikeModel from "../../models/LikeModel";
import LikesUsersGroup from "../../components/likes/LikesUsersGroup";
import { Favorite } from "@material-ui/icons";
import { myHttpClient } from "../../plugins/axios";
import ShowGoogleMap from "../../components/map/ShowGoogleMap";
import LikeForm from "../../forms/LikeForm";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    image: {
      width: '100%',
      paddingBottom: theme.spacing(5)
    }
  }),
);

const PostsShow = (props: any) => {
  const classes = useStyles();
  const [user, setUser] = useState<UserModel | null>(null);
  const [post, setPost] = useState<PostModel | null>(null);
  const [feedData, setFeedData] = useState<any | null>(null);
  const [timeData, setTimeData] = useState<any | null>(null);
  const [dateData, setDateData] = useState<any | null>(null);
  const [sizeData, setSizeData] = useState<any | null>(null);
  const [postUser, setPostUser] = useState<UserModel | null>(null);
  const [comments, setComments] = useState<any>([]);
  const [likes, setLikes] = useState<any>([]);
  const [like, setLike] = useState<LikeModel | null>(null);
  const [likesUsers, setLikesUsers] = useState<UserModel[] | null>(null);

  const getPost = async() => {
    try { 
    await
      myHttpClient.get(`/posts/${props.match.params.id}`)
        .then((results) => {
        console.log(results)
        console.log('get post')
        setPost(results.data.post);
        setDateData(results.data.date_data)
        setTimeData(results.data.time_data)
        setFeedData(results.data.feed_data)
        setSizeData(results.data.size_data)
        setPostUser(results.data.user);
        setLikesUsers(results.data.likes_users);
        setLikes(results.data.likes);
      })
    }
    catch (error) {
      alert(error.message);
    }
  }

  useEffect(() => {
    getPost();
  },[setPost]);

  useEffect(() => {
    auth.onAuthStateChanged((user: any) => {
      myHttpClient.get(`/users/${user?.uid}`)
      .then((results) => {
        console.log(results)
        setUser(results.data.user)
      })
      .catch((data) =>{
        console.log(data.user)
      })
    });
  }, []);


  const getMyLike = () => {
    const mylike = likes.find((like: any) => {
    　return (like.user_id === user?.id);
    });
    setLike(mylike)
  }

  useEffect(() => {
    getMyLike();
  },[setLike]);


  const createLike = async(like: LikeForm ) => {
    try { 
      await
    　 myHttpClient.post(`/posts/${props.match.params.id}/likes`,{like: like} )
        .then((response) => {
        setLike(response.data.like)
        setLikesUsers(response.data.likes_users)
        console.log('create like')
        const message = 'いいねしました'
        const severity = 'success'
        props.handleFlash(message,severity)
      })
    }
    catch (error) {
      alert(error.message);
      const message = 'いいねに失敗しました'
      const severity = 'error'
      props.handleFlash(message,severity)
    }
  }

  const destroyLike = async(id: number) => {
    try { 
    await
    　 myHttpClient.delete(`/posts/${props.match.params.id}/likes/${id}`)
      .then((response) => {
        setLike(null)
        setLikesUsers(response.data.likes_users)
        console.log('destroy like')
        const message = 'いいねを取り消しました'
        const severity = 'success'
        props.handleFlash(message,severity)
      })
    }
    catch (error) {
      alert(error.message);
      const message = 'いいねの取り消しに失敗しました'
      const severity = 'error'
      props.handleFlash(message,severity)
    }
  }

  const getComments = async() => {
    try { 
    await
      myHttpClient.get(`/posts/${props.match.params.id}/comments`)
        .then((results) => {
        console.log(results)
        setComments(results.data);
      })
    }
    catch (error) {
      alert(error.message);
    }
  }

  useEffect(() => {
    getComments();
  },[setComments]);
  

  const createComment = async(comment: CommentModel) => {
    try { 
      await 
    　 myHttpClient.post(`/posts/${props.match.params.id}/comments`,{comment: comment} )
        .then((response) => {
        const newData = update(comments, {$unshift:[response.data]})
        setComments(newData)
        console.log('create comment')
        const message = 'コメントを投稿しました'
        const severity = 'success'
        props.handleFlash(message,severity)
      })
    }
    catch (error) {
      alert(error.message);
      const message = 'いいねの取り消しに失敗しました'
      const severity = 'error'
      props.handleFlash(message,severity)
    }
  }

  const updateComment = async(comment: CommentModel) => {
    try { 
      await
    　  myHttpClient.patch(`/posts/${props.match.params.id}/comments/${comment.id}`,{comment: comment})
      .then((response) => {
        const commentIndex = comments.findIndex((x: any) => x.id === comment.id)
        const updateComments = update(comments, {[commentIndex]: {$set: response.data}})
        setComments(updateComments)
        console.log('update comment')
        console.log(updateComments)
        const message = 'コメントを編集しました'
        const severity = 'success'
        props.handleFlash(message,severity)
      })
    }
    catch (error) {
      alert(error.message);
      const message = 'コメントの編集に失敗しました'
      const severity = 'error'
      props.handleFlash(message,severity)
  }
  }

  const destroyComment = async(id: number) => {
    try { 
    await
    　 myHttpClient.delete(`/posts/${props.match.params.id}/comments/${id}`)
      .then(() => {
        const commentIndex = comments.findIndex((x: any) => x.id === id)
        const deleteComments = update(comments, {$splice: [[commentIndex, 1]]})
        setComments(deleteComments)
        console.log('destroy comment')
        const message = 'コメントを削除しました'
        const severity = 'success'
        props.handleFlash(message,severity)
      })
    }
    catch (error) {
      alert(error.message);
      const message = ' コメントの削除に失敗しました'
      const severity = 'error'
      props.handleFlash(message,severity)
    }
  }

  const destroyPost = async(id: number) => {
    try { 
    await
    　 myHttpClient.delete(`/posts/${id}`)
      .then(() => {
        console.log('set')
        props.history.push("/posts");
        const message = '釣果を削除しました'
        const severity = 'success'
        props.handleFlash(message,severity)
      })
    }
    catch (error) {
      alert(error.message);
      const message = '釣果を削除しました'
      const severity = 'error'
      props.handleFlash(message,severity)
    }
  }

  return (
    <Fragment>
      {user && post && postUser ? 
      <Template>
        <Container maxWidth="lg">
          <Grid container spacing={1} style={{ marginTop: "1em" }}>
            <Grid item xs={12} md={1} style={{ marginTop: "1em" }}>
              <PostButtons 
                post={post}
                user={user}
                like={like}
                postUser={postUser}
                destroyPost={destroyPost} 
                createLike={createLike} 
                destroyLike={destroyLike} 
              />
            </Grid>
            <Grid xs={12} item md={8} style={{ marginTop: "1em" }}>
              <img src="../../fish.jpg" className={classes.image}/>
              <Box display="flex" justifyContent="flex-end" mb={3}>
                <Favorite color="secondary"/>
                {likesUsers &&
                  <LikesUsersGroup
                    likesUsers={likesUsers}
                  />
                }
              </Box>
              <PostData post={post}/>
              <Box fontWeight="fontWeightBold" mt={5} mb={2}　fontSize={16}>
                {post.name}のデータ分析
              </Box>
              {feedData && dateData && timeData && sizeData ?
              <PostChart 
                post={post} 
                feedData={feedData}
                dateData={dateData}
                timeData={timeData}
                sizeData={sizeData}
              />:
              <div>loading...</div>}
              <Divider/>
              <Box my={5}>
                <Box fontWeight="fontWeightBold" mt={5} mb={2}　fontSize={16}>
                  {post.name}の釣れた場所
                </Box>
                <ShowGoogleMap
                  post={post}
                />
              </Box>
              <UserBar user={postUser}/>
              {post.memo}
              { comments ?
              <CommentContainer
                post={post}
                user={user}
                comments={comments}
                createComment={createComment}
                updateComment={updateComment}
                destroyComment={destroyComment}
              />
              :<div>lording...</div>}
            </Grid>
          </Grid>
        </Container>
      </Template>: 
      <Loading/>
      }
    </Fragment>
    
  );
};
export default PostsShow;





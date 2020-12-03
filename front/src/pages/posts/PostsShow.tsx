import React, { useEffect, Fragment, useState } from "react";
import { Container, Divider, Grid} from "@material-ui/core";
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
import FlashAlert from "../../components/layouts/FlashAlert";
import { myHttpClient } from "../../plugins/axios";
import ShowGoogleMap from "../../components/map/ShowGoogleMap";



const PostsShow = (props: any) => {

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
  const [showFlash, setShowFlash] = useState(true);
  const [message, setMessage] = useState<string>('');
  const [severity, setSeverity] = useState<undefined | 'success' | 'error' >(undefined);



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

  // const getMyLike = ( user: any) =>{
  //   const like = likes.find((x: any) => x.user_id === user.id)
  //   console.log(likes)
  //   setLike(like)
  //   console.log('like')
  // }

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

  const createLike = async(like: LikeModel ) => {
    try { 
      await
    　 myHttpClient.post(`/posts/${props.match.params.id}/likes`,{like: like} )
        .then((response) => {
        setLike(response.data.like)
        setLikesUsers(response.data.likes_users)
        console.log('create like')
        setShowFlash(true)
        setMessage('いいねしました')
        setSeverity('success')
      })
    }
    catch (error) {
      alert(error.message);
      setShowFlash(true)
      setMessage('いいねに失敗しました')
      setSeverity('error')
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
        setShowFlash(true)
        setMessage('いいねを取り消しました')
        setSeverity('success')
      })
    }
    catch (error) {
      alert(error.message);
      setShowFlash(true)
      setMessage('いいねの取り消しに失敗しました')
      setSeverity('error')
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
        setShowFlash(true)
        setMessage('コメントを投稿しました')
        setSeverity('success')
      })
    }
    catch (error) {
      alert(error.message);
      setShowFlash(true)
      setMessage('コメントの投稿に失敗しました')
      setSeverity('error')
    }
  }

  const updateComment = async(id: number, comment: CommentModel) => {
    try { 
      await
    　  myHttpClient.patch(`/posts/${props.match.params.id}/comments/${id}`,{comment: comment})
      .then((response) => {
        const commentIndex = comments.findIndex((x: any) => x.id === id)
        const updateComments = update(comments, {[commentIndex]: {$set: response.data}})
        setComments(updateComments)
        console.log('update comment')
        console.log(updateComments)
        setShowFlash(true)
        setMessage('コメントを編集しました')
        setSeverity('success')
      })
    }
    catch (error) {
      alert(error.message);
      setShowFlash(true)
      setMessage('コメントの編集に失敗しました')
      setSeverity('error')
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
        setShowFlash(true)
        setMessage('コメントを削除しました')
        setSeverity('success')
      })
    }
    catch (error) {
      alert(error.message);
      setShowFlash(true)
      setMessage('コメントの削除に失敗しました')
      setSeverity('error')
    }
  }

  const destroyPost = async(id: number) => {
    try { 
    await
    　 myHttpClient.delete(`/posts/${id}`)
      .then(() => {
        console.log('set')
        props.history.push("/posts");
        setShowFlash(true)
      })
      .catch((data) =>{
        console.log(data)
        console.log('get post')
        setShowFlash(true)
        setMessage('投稿を削除しました')
        setSeverity('success')
      })
    }
    catch (error) {
      alert(error.message);
      setMessage('投稿の削除に失敗しました')
      setSeverity('error')
    }
  }

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setShowFlash(false);
  };

  return (
    <Fragment>
      {post && postUser && feedData && dateData && timeData && sizeData  ? 
      <Template>
        {showFlash && message && severity &&
          <FlashAlert
            handleClose={handleClose}
            message={message}
            severity={severity}
          />
        }     
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
              <Box display="flex" justifyContent="flex-end">
                <Favorite fontSize="large" color="secondary"/>
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
              <PostChart 
                post={post} 
                feedData={feedData}
                dateData={dateData}
                timeData={timeData}
                sizeData={sizeData}
              />
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
              { comments &&
              <CommentContainer
                post={post}
                user={user}
                comments={comments}
                createComment={createComment}
                updateComment={updateComment}
                destroyComment={destroyComment}
              />
              }
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





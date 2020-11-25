import React, { useEffect } from "react";
import { Container, Divider, Grid} from "@material-ui/core";
import Template from "../../components/layouts/Template";
import Box from '@material-ui/core/Box';
import PostButtons from "../../components/posts/PostButtons"
import axios from 'axios'
import PostData from "../../components/posts/PostData";
import PostChart from "../../components/posts/PostChart";
import UserBar from "../../components/users/UserBar";
import CommentContainer from "../../components/comments/CommentContainer";
import update from 'react-addons-update'
import auth from "../../plugins/firebase";
import GoogleMap from "../../components/map/GoogleMap";
import PostModel from "../../models/PostModel";
import CommentModel from "../../models/CommentModel";
import UserModel from "../../models/UserModel";
import Loading from "../../components/layouts/Loading";
import LikeModel from "../../models/LikeModel";
import LikesUsersGroup from "../../components/likes/LikesUsersGroup";
import { Favorite } from "@material-ui/icons";
import FlashAlert from "../../components/layouts/FlashAlert";



const PostsShow = (props: any) => {
  
  const [user, setUser] = React.useState<UserModel | null>(null);
  const [post, setPost] = React.useState<PostModel | null>(null);
  const [comments, setComments] = React.useState<any>([]);
  const [like, setLike] = React.useState<LikeModel | null>(null);
  const [likes, setLikes] = React.useState<any>([]);
  const [likesUsers, setLikesUsers] = React.useState<UserModel[] | null>(null);
  const [showFlash, setShowFlash] = React.useState(false);
  const [message, setMessage] = React.useState('');

  useEffect(() => {
    auth.onAuthStateChanged((user: any) => {
      axios.get(`http://localhost:3000/api/v1/users/${user?.uid}`)
      .then((results) => {
        console.log(results)
        setUser(results.data.user)
      })
      .catch((data) =>{
        console.log(data.user)
      })
    });
  }, []);

  //自分がいいねしていた場合、そのいいねを取得したい
  const getMyLike = (user: UserModel) =>{
    const myLike = likes.find((like: any) => like.user_id === user.id);
    setLike(myLike);
  }
  

  const getPost = async() => {
    try { 
    await
      axios.get(`http://localhost:3000/api/v1/posts/${props.match.params.id}`)
        .then((results) => {
        console.log(results)
        setPost(results.data);
        setLikesUsers(results.data.likes_users);
      })
    }
    catch (error) {
      alert(error.message);
    }
  }
  
  useEffect(() => {
    getPost();
  },[setPost]);

  const getComments = async() => {
    try { 
    await
      axios.get(`http://localhost:3000/api/v1/posts/${props.match.params.id}/comments`)
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

  const getLikes = async() => {
    try { 
    await
      axios.get(`http://localhost:3000/api/v1/posts/${props.match.params.id}/likes`)
        .then((results) => {
        console.log(results)
        console.log('get likes')
        setLikes(results.data);
      })
    }
    catch (error) {
      alert(error.message);
    }
  }
  useEffect(() => {
    getLikes();
  },[setLikes]);



  const createLike = async(like: LikeModel ) => {
    try { 
      await
    　 axios.post(`http://localhost:3000/api/v1/posts/${props.match.params.id}/likes`,{like: like} )
        .then((response) => {
        setLike(response.data)
        console.log('create like')
        setShowFlash(true)
        setMessage('いいねしました')
      })
    }
    catch (error) {
      alert(error.message);
      setShowFlash(true)
      setMessage('いいねに失敗しました')
    }
  }

  const destroyLike = async(id: number) => {
    try { 
    await
    　 axios.delete(`http://localhost:3000/api/v1/posts/${props.match.params.id}/likes/${id}`)
      .then(() => {
        setLike(null)
        console.log('destroy like')
        setShowFlash(true)
        setMessage('いいねを取り消しました')
      })
    }
    catch (error) {
      alert(error.message);
      setShowFlash(true)
      setMessage('いいねの取り消しに失敗しました')
    }
  }
 

  const createComment = async(comment: CommentModel) => {
    try { 
      await 
    　 axios.post(`http://localhost:3000/api/v1/posts/${props.match.params.id}/comments`,{comment: comment} )
        .then((response) => {
        const newData = update(comments, {$unshift:[response.data]})
        setComments(newData)
        console.log('create comment')
        setShowFlash(true)
        setMessage('コメントを投稿しました')
      })
    }
    catch (error) {
      alert(error.message);
      setShowFlash(true)
      setMessage('コメントの投稿に失敗しました')
    }
  }

  const destroyComment = async(id: number) => {
    try { 
    await
    　 axios.delete(`http://localhost:3000/api/v1/posts/${props.match.params.id}/comments/${id}`)
      .then(() => {
        const commentIndex = comments.findIndex((x: any) => x.id === id)
        const deleteComments = update(comments, {$splice: [[commentIndex, 1]]})
        setComments(deleteComments)
        console.log('destroy comment')
        setShowFlash(true)
        setMessage('コメントを削除しました')
      })
    }
    catch (error) {
      alert(error.message);
      setShowFlash(true)
      setMessage('コメントの削除に失敗しました')
    }
  }

  const destroyPost = async(id: number) => {
    try { 
    await
    　 axios.delete(`http://localhost:3000/api/v1/posts/${id}`)
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
      })
    }
    catch (error) {
      alert(error.message);
      setMessage('投稿の削除に失敗しました')
    }
  }

  return (
    <React.Fragment>
      {post ? 
      <Template>
        {showFlash &&
          <FlashAlert
            message={message}
          />
        }     
        <Container maxWidth="lg">
          <Grid container spacing={1} style={{ marginTop: "1em" }}>
            <Grid item xs={12} md={1} style={{ marginTop: "1em" }}>
              <PostButtons 
                post={post}
                user={user}
                like={like}
                postUser={post.user}
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
              <PostChart post={post} />
              <Divider/>
              <Box my={5}>
                <Box fontWeight="fontWeightBold" mt={5} mb={2}　fontSize={16}>
                  {post.name}の釣れた場所
                </Box>
                <GoogleMap/>
              </Box>
              <UserBar user={post.user}/>
              {post.memo}
              <CommentContainer
              post={post}
              user={user}
              comments={comments}
              createComment={createComment}
              destroyComment={destroyComment}
              />
            </Grid>
          </Grid>
        </Container>
      </Template>: 
      <Loading/>
      }
    </React.Fragment>
    
  );
};
export default PostsShow;





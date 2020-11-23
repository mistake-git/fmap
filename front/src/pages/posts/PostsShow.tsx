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

const PostsShow = (props: any) => {
  
  const [post, setPost] = React.useState<PostModel | null>(null);
  const [comments, setComments] = React.useState<any>([]);
  const [user, setUser] = React.useState<UserModel | null>(null);

  useEffect(() => {
    auth.onAuthStateChanged((user: any) => {
      axios.get(`http://localhost:3000/api/v1/users/${user?.uid}`)
      .then((results) => {
        console.log(results)
        setUser(results.data)
      })
      .catch((data) =>{
        console.log(data)
      })
    });
  }, []);

  const getPost = async() => {
    try { 
    await
      axios.get(`http://localhost:3000/api/v1/posts/${props.match.params.id}`)
        .then((results) => {
        console.log(results)
        setPost(results.data);
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
 

  const createComment = async(comment: CommentModel) => {
    try { 
      await 
    　 axios.post(`http://localhost:3000/api/v1/posts/${props.match.params.id}/comments`,{comment: comment} )
        .then((response) => {
        const newData = update(comments, {$unshift:[response.data]})
        setComments(newData)
        console.log('create comment')
      })
    }
    catch (error) {
      alert(error.message);
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
      })
    }
    catch (error) {
      alert(error.message);
    }
  }

  const destroyPost = async(id: number) => {
    try { 
    await
    　 axios.delete(`http://localhost:3000/api/v1/posts/${id}`)
      .then(() => {
        console.log('set')
        props.history.push("/posts");
      })
      .catch((data) =>{
        console.log(data)
        console.log('get post')
      })
    }
    catch (error) {
      alert(error.message);
    }
  }

  if (post === null){
    return <Loading/>
  }
  
  return (
    <Template>
      <Container maxWidth="lg">
        <Grid container spacing={1} style={{ marginTop: "1em" }}>
          <Grid item xs={12} md={1} style={{ marginTop: "1em" }}>
            <PostButtons 
              post={post}
              destroyPost={destroyPost} 
              user={post.user}
            />
          </Grid>
          <Grid xs={12} item md={8} style={{ marginTop: "1em" }}>
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
            { comments && 
            <CommentContainer
             post={post}
             user={user}
             comments={comments}
             createComment={createComment}
             destroyComment={destroyComment}
             />
            }
          </Grid>
        </Grid>
      </Container>
    </Template>
  );
};
export default PostsShow;
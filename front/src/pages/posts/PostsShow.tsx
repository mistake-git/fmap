import React, { Fragment, useContext, useEffect } from "react";
import { Container, Divider, Grid} from "@material-ui/core";
import { AuthContext } from "../../Auth";
import Template from "../../components/layouts/Template";
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import PostButtons from "../../components/posts/PostButtons"
import axios from 'axios'
import PostData from "../../components/posts/PostData";
import PostChart from "../../components/posts/PostChart";
import UserBar from "../../components/users/UserBar";
import CommentContainer from "../../components/comments/CommentContainer";
import update from 'react-addons-update'
import auth from "../../plugins/firebase";

const useStyles = makeStyles((theme) => ({
  control: {
    padding: theme.spacing(1.5),
  },
}));

const PostsShow = (props: any) => {
  
  const classes = useStyles();
  const [post, setPost] = React.useState<any>('')
  const [comments, setComments] = React.useState<any>([])
  const [user, setUser] = React.useState<any>('');

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
        setPost(results.data)
      })
    }
    catch (error) {
      alert(error.message);
    }
  }

  useEffect(() => {
    getPost();
  },[setPost]);

  const createComment = async(comment: any) => {
    try { 
      await 
    　 axios.post(`http://localhost:3000/api/v1/posts/${post.id}/comments`,{comment: comment} )
        .then((response) => {
        const newData = update(comments, {$unshift:[response.data]})
        setComments(newData)
      })
    }
    catch (error) {
      alert(error.message);
    }
  }

  const destroyComment = async(id: any) => {
    try { 
    await
    　 axios.delete(`http://localhost:3000/api/v1/posts/${post.id}/comments/${id}`)
      .then(() => {
        const commentIndex = comments.findIndex((x: any) => x.id === id)
        const deleteComments = update(comments, {$splice: [[commentIndex, 1]]})
        setComments(deleteComments)
        console.log('set')
      })
    }
    catch (error) {
      alert(error.message);
    }
  }

  const destroyPost = async(id: any) => {
    try { 
    await
    　 axios.delete(`http://localhost:3000/api/v1/posts/${id}`)
      .then(() => {
        console.log('set')
        props.history.push("/posts");
      })
      .catch((data) =>{
        console.log(data)
      })
    }
    catch (error) {
      alert(error.message);
    }
  }

  return (
    <Template>
      <Container maxWidth="lg">
        <Grid container spacing={1} style={{ marginTop: "1em" }}>
          <Grid item xs={12} md={1} style={{ marginTop: "1em" }}>
            <PostButtons post={post} destroyPost = {destroyPost} />
          </Grid>
          <Grid xs={12} item md={8} style={{ marginTop: "1em" }}>
            <PostData post={post}/>
            <PostChart post={post} />
            <UserBar/>
            {post.memo}
            <CommentContainer
             post={post}
             user={user}
             comments={comments}
             createComment={createComment}
             destroyComment={destroyComment}
             />
            <Box my={3}>
              <Divider/>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Template>
  );
};
export default PostsShow;
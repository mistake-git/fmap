import React, { Fragment, useContext, useEffect } from "react";
import { Button, Container, Divider, Grid, Typography } from "@material-ui/core";
import { AuthContext } from "../../Auth";
import auth from "../../plugins/firebase";
import Template from "../../components/layouts/Template";
import PostCard from "../../components/posts/PostCard"
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Box from '@material-ui/core/Box';
import EditIcon from '@material-ui/icons/Edit';
import PostButtons from "../../components/posts/PostButtons"
import UserCard from "../../components/users/UserMain"
import axios from 'axios'
import PostData from "../../components/posts/PostData";
import PostChart from "../../components/posts/PostChart";
import Comments from "../../components/comments/Comments";
import CommentFrom from "../../components/comments/CommentForm";
import UserBar from "../../components/users/UserBar";


const useStyles = makeStyles((theme) => ({
  control: {
    padding: theme.spacing(1.5),
  },
}));

const PostsShow = (props: any) => {
  
  const classes = useStyles();
  const [post, setPost] = React.useState<any>('')
  const [comments, setComments] = React.useState<any[]>([])
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    axios.get(`http://localhost:3000/api/v1/posts/${props.match.params.id}`)
		.then((results) => {
			console.log(results)
      setPost(results.data)
      setComments(results.data.comments)
		})
		.catch((data) =>{
			console.log(data)
		})
  },[setPost]);

  useEffect(() => {
    // if not logged in, redirect to login page
    currentUser === null && props.history.push("/signin");
  }, [currentUser]);

  const pushPost = () =>{
    props.history.push(`/posts/${post.id}`)
  }

  const deleatePost = (id: any) => {
    axios.delete(`http://localhost:3000/api/v1/posts/${id}`)
    .then((response) => {
      console.log('set')
      props.history.push("/posts");
    })
    .catch((data) =>{
      console.log(data)
    })
  }

  return (
    <Template>
      <Container maxWidth="lg">
        <Grid container spacing={1} style={{ marginTop: "1em" }}>
          <Grid item xs={12} md={1} style={{ marginTop: "1em" }}>
            <PostButtons post = {post} deletePost = {deleatePost} />
          </Grid>
          <Grid xs={12} item md={8} style={{ marginTop: "1em" }}>
            <PostData post={post}/>
            <PostChart post={post} />
            <UserBar/>
            <CommentFrom post={post} commentsCount={comments.length}/>
            <Comments comments={comments} post={post}/>
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
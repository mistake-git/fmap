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
import Comments from "../../components/comments/Comments";
import CommentFrom from "../../components/comments/CommentForm";
import UserBar from "../../components/users/UserBar";
import CommentContainer from "../../components/comments/CommentContainer";


const useStyles = makeStyles((theme) => ({
  control: {
    padding: theme.spacing(1.5),
  },
}));

const PostsShow = (props: any) => {
  
  const classes = useStyles();
  const [post, setPost] = React.useState<any>('')
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    axios.get(`http://localhost:3000/api/v1/posts/${props.match.params.id}`)
		.then((results) => {
			console.log(results)
      setPost(results.data)
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
            <CommentContainer post={post}/>
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
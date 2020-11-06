import React, { Fragment, useContext, useEffect } from "react";
import { Button, Container, Grid, Typography } from "@material-ui/core";
import { AuthContext } from "../../Auth";
import auth from "../../firebase";
import Template from "../../components/layouts/Template";
import PostCard from "../../components/posts/PostCard"
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Box from '@material-ui/core/Box';
import EditIcon from '@material-ui/icons/Edit';
import PostButtons from "../../components/posts/PostButtons"
import UserCard from "../../components/users/UserCard"
import axios from 'axios'
import Demo from "../../components/posts/Chart";

const useStyles = makeStyles((theme) => ({
  control: {
    padding: theme.spacing(1.5),
  },
}));

const PostsShow = (props: any) => {
  
  const classes = useStyles();
  const [post, setPost] = React.useState<any>('')

  useEffect(() => {
    axios.get(`http://localhost:3000/posts/${props.match.params.id}`)
		.then((results) => {
			console.log(results)
			setPost(results.data)
		})
		.catch((data) =>{
			console.log(data)
		})
  },[setPost]);

  const deleatePost = (id: any) => {
    axios.delete(`http://localhost:3000/posts/${id}`)
    .then((response) => {
      console.log('set')
      props.history.push("/posts");
    })
    .catch((data) =>{
      console.log(data)
    })
  }

  return (
    <div>
      <Template>
        <Container maxWidth="lg">
          <Grid container style={{ marginTop: "1em" }}>
            <Grid item md={1} style={{ marginTop: "1em" }}>
              <PostButtons post = {post} deletePost = {deleatePost} />
            </Grid>
            <Grid item md={8} style={{ marginTop: "1em" }}>
              {post.name}
            </Grid>
            <Grid item md={3} style={{ marginTop: "1em" }}>
              <UserCard/>
            </Grid>
          </Grid>
        </Container>
      </Template>
    </div>
  );
};
export default PostsShow;
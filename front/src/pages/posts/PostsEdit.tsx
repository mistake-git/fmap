import React, { Fragment, useContext, useEffect } from "react";
import { Button, Container, Grid, Typography } from "@material-ui/core";
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
import EditPostForm from "../../components/posts/NewPostForm"
import axios from 'axios'



const useStyles = makeStyles((theme) => ({
  control: {
    padding: theme.spacing(1.5),
  },
}));

const PostsEdit = (props: any) => {
  const [post, setPost] = React.useState<any>('')

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

  const { currentUser } = useContext(AuthContext);
  const classes = useStyles();

  useEffect(() => {
    // if not logged in, redirect to login page
    currentUser === null && props.history.push("/signin");
  }, [currentUser]);

  return (
    <Fragment>
      <Template>
        <Container maxWidth="md">
          <EditPostForm post={post}/>
        </Container>
      </Template>
    </Fragment>
  );
};
export default PostsEdit;
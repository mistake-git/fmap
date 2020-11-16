import React, { Fragment, useContext, useEffect } from "react";
import { Container} from "@material-ui/core";
import { AuthContext } from "../../Auth";
import Template from "../../components/layouts/Template";
import { makeStyles } from '@material-ui/core/styles';
import PostForm from "../../components/posts/PostForm"
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
  control: {
    padding: theme.spacing(1.5),
  },
}));

const PostsNew = (props: any) => {
  const { currentUser } = useContext(AuthContext);
  const classes = useStyles();

  useEffect(() => {
    // if not logged in, redirect to login page
    currentUser === null && props.history.push("/signin");
  }, [currentUser]);

  const createPost = (post: any) => {
    axios.post('http://localhost:3000/api/v1/posts',{post: post} );
  }

  return (
    <Fragment>
      <Template>
        <Container maxWidth="md">
          <PostForm action={createPost} />
        </Container>
      </Template>
    </Fragment>
  );
};
export default PostsNew;
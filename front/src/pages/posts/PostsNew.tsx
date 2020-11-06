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
import PostForm from "../../components/posts/PostForm"



const useStyles = makeStyles((theme) => ({
  control: {
    padding: theme.spacing(1.5),
  },
}));

const PostsNew = (props: any) => {
  const { currentUser } = useContext(AuthContext);
  const classes = useStyles();

  return (
    <Fragment>
      <Template>
        <Container maxWidth="md">
          <PostForm />
        </Container>
      </Template>
    </Fragment>
  );
};
export default PostsNew;
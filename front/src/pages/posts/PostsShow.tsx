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
const useStyles = makeStyles((theme) => ({
  control: {
    padding: theme.spacing(1.5),
  },
}));

const PostsShow = (props: any) => {
  const { currentUser } = useContext(AuthContext);
  const classes = useStyles();

  useEffect(() => {
    // if not logged in, redirect to login page
    currentUser === null && props.history.push("/login");
  }, [currentUser]);

  return (
    <Fragment>
      <Template>
        <Container maxWidth="lg">
          <Grid container style={{ marginTop: "1em" }}>
            <Grid item md={1} style={{ marginTop: "1em" }}>
              <PostButtons/>
            </Grid>
            <Grid item md={8} style={{ marginTop: "1em" }}>メイン</Grid>
            <Grid item md={3} style={{ marginTop: "1em" }}>
              <UserCard/>
            </Grid>
          </Grid>
        </Container>
      </Template>
    </Fragment>
  );
};
export default PostsShow;
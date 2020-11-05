import React, { Fragment, useContext, useEffect } from "react";
import { Button, Container, Grid, Typography } from "@material-ui/core";
import { AuthContext } from "../../Auth";
import auth from "../../firebase";
import Template from "../../components/layouts/Template";
import PostCard from "../../components/posts/PostCard"
import { makeStyles } from '@material-ui/core/styles';

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
            
          </Grid>
        </Container>
      </Template>
    </Fragment>
  );
};
export default PostsShow;
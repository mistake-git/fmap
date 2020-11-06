import React, { Fragment, useContext, useEffect } from "react";
import { Button, Container, Grid, Typography } from "@material-ui/core";
import { AuthContext } from "../Auth";
import auth from "../firebase";
import Template from "../components/layouts/Template";
import PostCard from "../components/posts/PostCard"
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios'
import PostModel from "../models/PostModel";



interface State {
  posts: PostModel[]
  post: PostModel
}

const useStyles = makeStyles((theme) => ({
  control: {
    padding: theme.spacing(1.5),
  },
}));

const Posts = (props: any) => {
 
  const classes = useStyles();
  const [posts, setPosts] = React.useState([])

  useEffect(() => {
    axios.get('http://localhost:3000/posts')
		.then((results) => {
			console.log(results)
			setPosts(results.data)
		})
		.catch((data) =>{
			console.log(data)
		})
  });

  return (
    <Fragment>
      <Template>
        <Container maxWidth="md">
          <Grid container style={{ marginTop: "1em" }}>
            <Grid item md={4} style={{ marginTop: "1em" }}>
            {posts.map((post) => {
              return(
                <PostCard post ={ post } />
              )
            })}
            </Grid>
          </Grid>
        </Container>
      </Template>
    </Fragment>
  );
};
export default Posts;

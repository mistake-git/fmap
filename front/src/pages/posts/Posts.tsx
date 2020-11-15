import React, { Fragment, useContext, useEffect } from "react";
import { Container, Grid } from "@material-ui/core";
import Template from "../../components/layouts/Template";
import PostCard from "../../components/posts/PostCard"
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios'
import PostModel from "../../models/PostModel";
import { AuthContext } from "../../Auth";


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
  const [posts, setPosts] = React.useState<PostModel[]>([])
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    // if not logged in, redirect to login page
    currentUser === null && props.history.push("/signin");
  }, [currentUser]);


  useEffect(() => {
    axios.get('http://localhost:3000/api/v1/posts')
		.then((results) => {
			console.log(results)
			setPosts(results.data)
		})
		.catch((data) =>{
			console.log(data)
		})
  },[setPosts]);

  return (
    <Fragment>
      <Template>
        <Container maxWidth="md">
          <Grid container style={{ marginTop: "3em" }}>
          {posts.map((post) => {
            return(
              <Grid item xs={12} sm={6} md={4} style={{ marginTop: "1em" }}>
                <PostCard post={ post } key={post.id}/>
              </Grid>
            )
          })}
          </Grid>
        </Container>
        </Template>
    </Fragment>
  );
};
export default Posts;

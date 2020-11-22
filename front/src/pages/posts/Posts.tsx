import React, { Fragment, useContext, useEffect } from "react";
import { Container, Grid } from "@material-ui/core";
import Template from "../../components/layouts/Template";
import PostCard from "../../components/posts/PostCard"
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios'
import PostModel from "../../models/PostModel";
import { AuthContext } from "../../Auth";
import CircularProgress from '@material-ui/core/CircularProgress';

interface State {
  posts: PostModel[]
  post: PostModel
}

const useStyles = makeStyles((theme) => ({
  control: {
    padding: theme.spacing(1.5),
  },
  loading: {
    position: "fixed", 
    top: 0, 
    left: 0, 
    width: "100%", 
    height: "100%", 
    display: "flex", 
    justifyContent: "center", 
    alignItems: "center",
  　background: 'rgba(0,0,0,0.15)'
  }
}));

const Posts = (props: any) => {
 
  const classes = useStyles();
  const [posts, setPosts] = React.useState<PostModel[]>([])
  const { currentUser } = useContext(AuthContext);
  const [loading, setLoading] = React.useState(true);
　
  //非同期で投稿をAPIから取得
  const getPosts = async() => {
    try { 
    await
      axios.get('http://localhost:3000/api/v1/posts')
      .then((results) => {
        console.log(results)
        setPosts(results.data)
      })
    }
    catch (error) {
      alert(error.message);
    }
  　setLoading(false);
  }

  useEffect(() => {
    getPosts();
  },[setPosts]);

  return (
    <Fragment>
      {loading &&
        <div className={classes.loading}>
          <img src="../../load.gif" />
        </div>
      }
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




import React, {useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import {
  Container,
  Grid,
  Box,
  CircularProgress,
} from "@material-ui/core";
import Template from "../../components/layouts/Template";
import UserMain from "../../components/users/UserMain";
import UserTab from "../../components/users/UserTab";
import PostCard from "../../components/posts/PostCard";
import axios from 'axios'
import PostModel from "../../models/PostModel";
import PieChart from "../../components/chart/PieChart";
import IntroductionForm from "../../components/users/IntroductionForm";

interface State {
  posts: PostModel[]
  post: PostModel
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    textAlign: "center"
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

const MyPage = (props: any) => {
  const [posts, setPosts] = React.useState<PostModel[]>([])
  const [user, setUser] = React.useState<any>('');

  const classes = useStyles();
  const [loading, setLoading] = React.useState(true);

  const getPosts = async() => {
    try { 
    await
      axios.get(`http://localhost:3000/api/v1/posts`)
      .then((results) => {
      console.log(results)
      setPosts(results.data);
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

  const getUser = async() => {
    try { 
    await
      axios.get(`http://localhost:3000/api/v1/users/${props.match.params.id}`)
      .then((results) => {
      console.log(results)
      setUser(results.data);
      })
    }
    catch (error) {
      alert(error.message);
    }
    　setLoading(false);
  }
  
  useEffect(() => {
   getUser();
  },[setUser]);

  return (
    <React.Fragment>
      {loading &&
        <div className={classes.loading}>
          <CircularProgress/>
        </div>
      }
       <Template>
        <Container maxWidth="md">
          <Grid container>
            <Grid item xs={12} sm={7}>
              <UserMain
                user={user}
              />
              <IntroductionForm/>
            </Grid>
        
            <Grid item xs={12} sm={5}>
              <PieChart/>
            </Grid>
            <Grid item xs={12} >
              <Box my={2}>
                <UserTab/>
              </Box>
            </Grid>
          </Grid>
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
    </React.Fragment>
  );
};

export default MyPage;
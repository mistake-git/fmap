import React, { Fragment, useContext, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Container,
  FormControl,
  Grid,
  Link,
  Typography,
  LinearProgress,
  Box,
  Card,
  CardContent
} from "@material-ui/core";
import Template from "../components/layouts/Template";
import UserCard from "../components/users/UserCard";
import PostCard from "../components/posts/PostCard";
import axios from 'axios'
import PostModel from "../models/PostModel";
import PieChart from "../components/chart/PieChart";

interface State {
  posts: PostModel[]
  post: PostModel
}

const useStyles = makeStyles({
	root: {
    width: "100%",
    textAlign: "center"
  }
});

const MyPage = (props: any) => {
  const [posts, setPosts] = React.useState<PostModel[]>([])

  const classes = useStyles();

  useEffect(() => {
    axios.get('http://localhost:3000/posts')
		.then((results) => {
			console.log(results)
			setPosts(results.data)
		})
		.catch((data) =>{
			console.log(data)
		})
  },[setPosts]);


  return (
    <Template>
      <Container maxWidth="xl">
        <Grid container spacing={1} style={{ marginTop: "1em" }}>
          <Grid item xs={12} md={3} style={{ marginTop: "1em" }}>
            <Card>
              <CardContent>
                <UserCard/>
                <Box mt={3}>
                  <PieChart/>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid xs={12} item md={8} style={{ marginTop: "1em" }}>
            <Grid container style={{ marginTop: "3em" }}>
              {posts.map((post) => {
                return(
                  <Grid item xs={12} sm={6} md={4} style={{ marginTop: "1em" }}>
                    <PostCard post={ post } key={post.id}/>
                  </Grid>
                )
              })}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Template>
   
  );
};

export default MyPage;
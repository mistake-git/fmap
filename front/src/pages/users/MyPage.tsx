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
  CardContent,
  Divider
} from "@material-ui/core";
import Template from "../../components/layouts/Template";
import UserCard from "../../components/users/UserMain";
import UserTab from "../../components/users/UserTab";
import PostCard from "../../components/posts/PostCard";
import axios from 'axios'
import PostModel from "../../models/PostModel";
import PieChart from "../../components/chart/PieChart";
import IntroductionForm from "../../components/users/IntroductionForm";
import { AuthContext } from "../../Auth";


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
  const [formOpen, setFormOpen]= React.useState(false);
  const { currentUser } = useContext(AuthContext);

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

  useEffect(() => {
    // if not logged in, redirect to login page
    currentUser === null && props.history.push("/signin");
  }, [currentUser]);

  return (
    <Template>
      <Container maxWidth="md">
        <Grid container>
          <Grid item xs={12} sm={7}>
            <UserCard/>
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
   
  );
};

export default MyPage;
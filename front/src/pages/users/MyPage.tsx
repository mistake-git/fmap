import React, {useEffect } from "react";
import {
  Container,
  Grid,
  Box
} from "@material-ui/core";
import Template from "../../components/layouts/Template";
import UserMain from "../../components/users/UserMain";
import UserTab from "../../components/users/UserTab";
import axios from 'axios'
import PostModel from "../../models/PostModel";
import PieChart from "../../components/chart/PieChart";
import IntroductionForm from "../../components/users/IntroductionForm";
import Loading from "../../components/layouts/Loading";
import UserModel from "../../models/UserModel";

interface State {
  posts: PostModel[]
  post: PostModel
}

const MyPage = (props: any) => {

  const [user, setUser] = React.useState<UserModel | null>(null);
  const [posts, setPosts] = React.useState<PostModel | null>(null);
  const [likesPosts, setLikesPosts] = React.useState<PostModel | null>(null);
  const [userData, setUserData] = React.useState<any | null>(null);
  const [loading, setLoading] = React.useState(true);

  const getUser = async() => {
    try { 
    await
      axios.get(`http://localhost:3000/api/v1/users/${props.match.params.id}`)
      .then((results) => {
      console.log(results)
      setUser(results.data.user);
      setPosts(results.data.posts);
      setLikesPosts(results.data.likes_posts)
      setUserData(results.data.user_data)
      })
    }
    catch (error) {
      alert(error.message);

    }
    　setLoading(false);
  }

  const updateUser = async(user: UserModel) => {
    try { 
    await
    axios.patch(`http://localhost:3000/api/v1/users/${props.match.params.id}`,{user: user} ) 
    .then((response) => {
      console.log(response)
      setUser(response.data);
      props.history.push(`/mypage/${response.data.uid}`);
    })
    }
    catch (error) {
      alert(error.message);
    }
  }
  
  useEffect(() => {
   getUser();
  },[setUser]);


  return (
    <React.Fragment>
      { loading &&
        <Loading/>
      }
      {user && posts && likesPosts &&
       <Template>
        <Container maxWidth="md">
          <Grid container>
            <Grid item xs={12}>
              <UserMain
                user={user}
              />
              {user.introduction}
              <IntroductionForm
                value={user.introduction}
                updateUser={updateUser}
              />
            </Grid>
            <Grid item xs={12} >
              <Box my={2}>
                <UserTab
                  posts={posts}
                  likesPosts={likesPosts}
                  UserData={userData}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Template>
      }
    </React.Fragment>
  );
};

export default MyPage;
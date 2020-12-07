import React, {useEffect, useContext, Fragment, useState } from "react";
import {
  Container,
  Grid,
  Box
} from "@material-ui/core";
import Template from "../../components/layouts/Template";
import UserMain from "../../components/users/UserMain";
import UserTab from "../../components/users/UserTab";
import PostModel from "../../models/PostModel";
import IntroductionForm from "../../components/users/IntroductionForm";
import Loading from "../../components/layouts/Loading";
import UserModel from "../../models/UserModel";
import { AuthContext } from '../../Auth'
import { myHttpClient } from "../../plugins/axios";

interface State {
  posts: PostModel[]
  post: PostModel
}

const MyPage = (props: any) => {

  const [user, setUser] = useState<UserModel | null>(null);
  const [posts, setPosts] = useState<PostModel | null>(null);
  const [likesPosts, setLikesPosts] = useState<PostModel | null>(null);
  const [userData, setUserData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useContext(AuthContext)


  const getUser = async() => {
    try { 
    await
      myHttpClient.get(`/users/${props.match.params.id}`)
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

  useEffect(() => {
    getUser();
   },[setUser]);

  const updateUser = async(user: UserModel) => {
    try { 
    await
    myHttpClient.patch(`/users/${props.match.params.id}`,{user: user} ) 
    .then((response) => {
      console.log(response)
      setUser(response.data);
      const message = '自己紹介を編集しました'
      const severity = 'success'
      props.handleFlash(message,severity)
    })
    }
    catch (error) {
      alert(error.message);
      const message = '自己紹介の編集に失敗しました'
      const severity = 'success'
      props.handleFlash(message,severity)
    }
  }

  const updateProfileImage = async(user: UserModel) => {
    try { 
    await
    myHttpClient.patch(`/user_images/${props.match.params.id}`,{user: user}) 
    .then((response) => {
      console.log(response)
      setUser(response.data);
    })
    }
    catch (error) {
      alert(error.message);
    }
  }

  return (
    <Fragment>
      { loading &&
        <Loading/>
      }
      {user && posts && likesPosts && userData && currentUser &&
       <Template>    
        <Container maxWidth="md">
          <Grid container>
            <Grid item xs={12}>
                <UserMain
                  user={user}
                  updateProfileImage={updateProfileImage}
                />
              <Box my={2}>
                {user.introduction}
                {user.uid === currentUser.uid &&
                  <IntroductionForm
                    value={user.introduction}
                    updateUser={updateUser}
                  />
                }
              </Box>
            </Grid>
            <Grid item xs={12} >
              <Box my={2}>
                <UserTab
                  posts={posts}
                  likesPosts={likesPosts}
                  userData={userData}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Template>
      }
    </Fragment>
  );
};

export default MyPage;
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
import * as H from 'history';

interface Props {
  history: H.History;
  handleFlash: (message: string, severity: 'success'|'error') => void
  match: any
}

const MyPage = (props: Props) => {

  const [user, setUser] = useState<UserModel | null>(null);
  const [posts, setPosts] = useState<PostModel[] | null>(null);
  const [likesPosts, setLikesPosts] = useState<PostModel[] | null>(null);
  const [userData, setUserData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useContext(AuthContext)

  const getUser = async() => {
    try { 
    await
      myHttpClient.get(`/users/${props.match.params.id}`)
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

  const getUserData = async() => {
    try { 
    await
      myHttpClient.get(`/users/${props.match.params.id}/data`)
      .then((results) => {
      console.log(results)
      setUserData(results.data);
      })
    }
    catch (error) {
      alert(error.message);
    }
    　setLoading(false);
  }

  useEffect(() => {
    getUserData();
   },[setUserData]);

   const getUserPosts = async() => {
    try { 
    await
      myHttpClient.get(`/users/${props.match.params.id}/posts`)
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
    getUserPosts();
   },[setPosts]);

   const getUserLikesPosts = async() => {
    try { 
    await
      myHttpClient.get(`/users/${props.match.params.id}/likes_posts`)
      .then((results) => {
      console.log(results)
      setLikesPosts(results.data);
      })
    }
    catch (error) {
      alert(error.message);
    }
    　setLoading(false);
  }

  useEffect(() => {
    getUserLikesPosts();
   },[setLikesPosts]);

  const updateUser = async(user: UserModel) => {
    try { 
    await
    myHttpClient.patch(`/users/${props.match.params.id}`,{user: user} ) 
    .then((response) => {
      console.log(response)
      setUser(response.data);
    })
    }
    catch (error) {
      alert(error.message);
    }
  }

  const updateProfileImage = async(image: File) => {
    try { 
      const formData = new FormData();
      formData.append("image", image)
    await
    myHttpClient.patch(`/user_images/${props.match.params.id}`, formData,
    {headers: {
      'content-type': 'multipart/form-data'
    }}) 
    .then((response) => {
      console.log(response)
      setUser(response.data);
      getUserPosts()
      getUserLikesPosts()
      const message = 'プロフィール画像を更新しました'
      const severity = 'success'
      props.handleFlash(message,severity)
    })
    }
    catch (error) {
      alert(error.message);
      const message = 'プロフィール画像の更新に失敗しました'
      const severity = 'error'
      props.handleFlash(message,severity)
    }
  }

  const destroyProfileImage = async() => {
    try { 
    await
    myHttpClient.delete(`/user_images/${props.match.params.id}`) 
    .then((response) => {
      console.log(response)
      setUser(response.data);
      getUserPosts()
      getUserLikesPosts()
      const message = 'プロフィール画像を削除しました'
      const severity = 'success'
      props.handleFlash(message,severity)
    })
    }
    catch (error) {
      alert(error.message);
      const message = 'プロフィール画像の削除に失敗しました'
      const severity = 'error'
      props.handleFlash(message,severity)
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
                  currentUser={currentUser}
                  updateProfileImage={updateProfileImage}
                  destroyProfileImage={destroyProfileImage}
                  updateUser={updateUser}
                  handleFlash={props.handleFlash}
                />
              <Box my={2}>
                {user.introduction}
                {user.uid === currentUser.uid &&
                  <IntroductionForm
                    value={user.introduction}
                    updateUser={updateUser}
                    handleFlash={props.handleFlash}
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
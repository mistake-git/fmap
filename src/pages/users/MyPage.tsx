import React, {useEffect, useContext, Fragment, useState, } from "react";
import {
  Container,
  Grid,
  Box,
} from "@material-ui/core";
import Template from "../../components/layouts/Template";
import UserMain from "../../components/users/UserMain";
import UserTab from "../../components/users/UserTab";
import PostModel from "../../models/PostModel";
import IntroductionForm from "../../components/users/IntroductionForm";
import Loading from "../../components/layouts/Loading";
import UserModel from "../../models/UserModel";
import { AuthContext } from '../../Auth'
import * as H from 'history';
import NotFound from "../NotFound";
import { useParams } from 'react-router-dom';
import UsersRepository from "../../repositories/UsersRepository";
import UserFormModel from "../../forms/UserFormModel";
import FollowModal from "../../components/users/FollowModal";
import FollowButton from "../../components/users/FollowButton";
import { CurrentUserContext } from "../../CurrentUser";

interface Props {
  history: H.History;
  handleFlash: (message: string, severity: 'success'|'error' | 'info') => void
  match: any
}

const MyPage = (props: Props) => {

  //マイページは必ずしも自分のユーザーデータをとってくるとは限らないので、変数名をcurrentUserではなくuserにする
  const [user, setUser] = useState<UserModel | null>(null);
  const [posts, setPosts] = useState<PostModel[] | null>(null);
  const [likesPosts, setLikesPosts] = useState<PostModel[] | null>(null);
  const [userData, setUserData] = useState<any | null>(null);
  const [followings, setFollowings] = useState<UserModel[] | null>(null);
  const [followers, setFollowers]  = useState<UserModel[] | null>(null);
  const [error, setError] = useState<Boolean>(false)
  const { firebaseAuthUser } = useContext(AuthContext)
  const {currentUser} = useContext(CurrentUserContext)
  const id  = useParams();

  //ユーザーのIDだけ変わった時にユーザー情報を取得
  useEffect(() => {
    getUser()
    getUserPosts()
    getUserData()
    getUserLikesPosts()
    getUserFollowers()
    getUserFollowings()
  }, [id]);

  const getUser = async() => {
    try { 
    await
      UsersRepository.getUser(props.match.params.id)
      .then((results) => {
      console.log(results)
      setUser(results);
      })
    }
    catch (error) {
      console.log(error.message);
      setError(true)
    }
  }

  useEffect(() => {
    getUser();
   },[setUser]);

  const getUserData = async() => {
    try { 
    await
      UsersRepository.getUserData(props.match.params.id)
      .then((results) => {
      console.log(results)
      console.log('getUserData')
      setUserData(results);
      })
    }
    catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    getUserData();
   },[setUserData]);

   const getUserPosts = async() => {
    try { 
    await
    UsersRepository.getUserPosts(props.match.params.id)
      .then((results) => {
      console.log(results)
      setPosts(results);
      })
    }
    catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    getUserPosts();
   },[setPosts]);

   const getUserLikesPosts = async() => {
    try { 
    await
      UsersRepository.getUserLikesPosts(props.match.params.id)
      .then((results) => {
      console.log(results)
      setLikesPosts(results);
      })
    }
    catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    getUserLikesPosts();
  },[setLikesPosts]);


  useEffect(() => {
    getUserFollowings();
  },[setFollowings]);

  const getUserFollowings = async() => {
    try { 
    await
      UsersRepository.getUserFollowings(props.match.params.id)
      .then((results) => {
      console.log(results)
      setFollowings(results);
      })
    }
    catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    getUserFollowers();
  },[setFollowers]);

  const getUserFollowers = async() => {
    try { 
    await
      UsersRepository.getUserFollowers(props.match.params.id)
      .then((results) => {
      console.log(results)
      setFollowers(results);
      })
    }
    catch (error) {
      console.log(error.message);
    }
  }

  const createRelationships = async(user_id: number, follow_id: number) => {
    if(currentUser === null ){
      props.history.push("/signin");
      const message = 'ログインしてください'
      const severity = 'info'
      props.handleFlash(message,severity)
      return;
    }
    try { 
    await
    　 UsersRepository.createRelationships(user_id, follow_id)
      .then(() => {
        console.log('create relationships')
        const message = 'ユーザーをフォローしました'
        const severity = 'success'
        props.handleFlash(message,severity)
        getUserFollowers()
      })
    }
    catch (error) {
      alert(error.message);
      const message = 'ユーザーのフォローに失敗しました'
      const severity = 'error'
      props.handleFlash(message,severity)
    }
  }

  const destroyRelationships = async(user_id: number, follow_id: number) => {
    try { 
    await
    　 UsersRepository.destroyRelationships(user_id, follow_id)
      .then(() => {
        console.log('destroy relationships')
        const message = 'フォローを解除しました'
        const severity = 'success'
        props.handleFlash(message,severity)
        getUserFollowers()
      })
    }
    catch (error) {
      alert(error.message);
      const message = 'フォローの解除に失敗しました'
      const severity = 'error'
      props.handleFlash(message,severity)
    }
  }

  const updateUser = async(user: UserFormModel) => {
    try { 
    await
    UsersRepository.updateUser(props.match.params.id, user)
    .then((response) => {
      console.log(response)
      setUser(response);
    })
    }
    catch (error) {
      console.log(error.message);
    }
  }

  const updateProfileImage = async(image: File) => {
    try { 
      const formData = new FormData();
      if(image)
      formData.append("image", image)
    await
      UsersRepository.updateProfileImage(props.match.params.id,formData)
      .then((response) => {
        console.log(response)
        setUser(response);
        getUserPosts()
        getUserLikesPosts()
        const message = 'プロフィール画像を更新しました'
        const severity = 'success'
        props.handleFlash(message,severity)
      })
    }
    catch (error) {
      console.log(error.message);
      const message = 'プロフィール画像の更新に失敗しました'
      const severity = 'error'
      props.handleFlash(message,severity)
    }
  }

  const destroyProfileImage = async() => {
    try { 
    await
    UsersRepository.destroyProfileImage(props.match.params.id)
    .then((response) => {
      console.log(response)
      setUser(response);
      getUserPosts()
      getUserLikesPosts()
      const message = 'プロフィール画像を削除しました'
      const severity = 'success'
      props.handleFlash(message,severity)
    })
    }
    catch (error) {
      console.log(error.message);
      const message = 'プロフィール画像の削除に失敗しました'
      const severity = 'error'
      props.handleFlash(message,severity)
    }
  }

  return (
    <Fragment>
      {error ? <NotFound/> :
       user && posts && likesPosts && userData?
       <Template>    
        <Container maxWidth="md">
          <Grid container>
            <Grid item xs={12}>
              <UserMain
                user={user}
                firebaseAuthUser={firebaseAuthUser}
                updateProfileImage={updateProfileImage}
                destroyProfileImage={destroyProfileImage}
                updateUser={updateUser}
                handleFlash={props.handleFlash}
              />
              <Box my={2}>
                {user.introduction}
                {firebaseAuthUser && user.uid === firebaseAuthUser.uid &&
                  <IntroductionForm
                    value={user.introduction}
                    updateUser={updateUser}
                    handleFlash={props.handleFlash}
                  />
                }
              </Box>
            </Grid>
            { followings && followers &&
              <Grid container>
                <Grid xs={3} md={2} item>
                  <FollowModal
                    modalTitle={`${user.name}がフォロー中`}
                    title={`フォロー中${followings.length}`}
                    users={followings}
                  />
                </Grid>
                <Grid xs={3} md={2}item>
                <FollowModal
                  　title={`フォロワー${followers.length}`}
                    modalTitle={`${user.name}のフォロワー`}
                    users={followers}
                  />
                </Grid>
                <Grid xs={false} md={6}/>
                <Grid xs={6} md={2} item>
                  <FollowButton
                    user={user}
                    currentUser={currentUser}
                    createRelationships={createRelationships}
                    destroyRelationships={destroyRelationships}
                  />
                </Grid>
              </Grid>
            }
            <Grid item xs={12} >
              <Box my={2}>
                <UserTab
                  user={user}
                  posts={posts}
                  likesPosts={likesPosts}
                  userData={userData}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Template>:
      <Loading/>
      }
    </Fragment>
  );
};

export default MyPage;
import React, {useEffect, useContext, Fragment, useState, } from "react";
import {
  Grid,
  Box,
} from "@material-ui/core";
import Template from "../../components/layouts/Template";
import UserMain from "../../components/users/UserMain";
import UserTab from "../../components/users/UserTab";
import PostModel from "../../models/PostModel";
import IntroductionForm from "../../components/users/IntroductionForm";
import UserModel from "../../models/UserModel";
import { AuthContext } from '../../Auth'
import * as H from 'history';
import NotFound from "../NotFound";
import { useHistory, useParams } from 'react-router-dom';
import UsersRepository from "../../repositories/UsersRepository";
import UserFormModel from "../../forms/UserFormModel";
import FollowModal from "../../components/users/FollowModal";
import FollowButton from "../../components/users/FollowButton";
import { CurrentUserContext } from "../../CurrentUser";
import auth from "../../plugins/firebase";
import ContentsLoading from "../../components/layouts/ContentsLoading";
import RelationshipsRepository from "../../repositories/RelationshipsRepository";
import { useDispatch } from "react-redux";
import { updateMessage, updateOpen, updateSeverity } from "../../actions/FlashActions";

interface Props {
  history: H.History;
  match: any
}

const MyPage = (props: Props) => {

  //マイページは必ずしも自分のユーザーデータをとってくるとは限らないので、変数名をcurrentUserではなくuserにする
  const [user, setUser] = useState<UserModel | null>(null);
  const [posts, setPosts] = useState<PostModel[] | null>(null);
  const [likesPosts, setLikesPosts] = useState<PostModel[] | null>(null);
  const [fishData, setFishData] = useState<any | null>(null);
  const [monthData, setMonthData] = useState<any | null>(null);
  const [followings, setFollowings] = useState<UserModel[] | null>(null);
  const [followers, setFollowers]  = useState<UserModel[] | null>(null);
  const [error, setError] = useState<Boolean>(false)
  const [isFollowed, setIsFollowed] = useState<boolean>(false)
  const { firebaseAuthUser } = useContext(AuthContext)
  const {currentUser} = useContext(CurrentUserContext)
  const id  = useParams();
  const history = useHistory();
  const dispatch = useDispatch()


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

  const getUserData = async() => {
    try { 
    await
      UsersRepository.getUserData(props.match.params.id)
      .then((results) => {
      console.log(results)
      console.log('getUserData')
      setFishData(results.fish_data);
      setMonthData(results.month_data);
      })
    }
    catch (error) {
      console.log(error.message);
    }
  }

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

  const createRelationships = async(follow_id: number) => {
    if(firebaseAuthUser === null ){
      history.push("/signin");
      dispatch(updateMessage('ログインしてください'))
      dispatch(updateSeverity('info'))
      dispatch(updateOpen(true))
      return;
    }
    try { 
    await
    　 RelationshipsRepository.createRelationships(follow_id)
      .then((results) => {
        console.log('create relationships')
        getUserFollowers()
        RelationshipsRepository.isFollowed(results.id)
        .then((results) => {
          setIsFollowed(results)
          console.log(results)
          dispatch(updateMessage('ユーザーをフォローしました'))
          dispatch(updateSeverity('success'))
          dispatch(updateOpen(true))
        })
      })
    }
    catch (error) {
      alert(error.message);
      dispatch(updateMessage('ユーザーのフォローに失敗しました'))
      dispatch(updateSeverity('error'))
      dispatch(updateOpen(true))
    }
  }

  const destroyRelationships = async(user_id: number, follow_id: number) => {
    try { 
    await
    　 RelationshipsRepository.destroyRelationships(follow_id)
      .then((results) => {
        console.log('destroy relationships')
        
        getUserFollowers()
        RelationshipsRepository.isFollowed(results.id)
        .then((results) => {
          setIsFollowed(results)
          console.log(results)
          dispatch(updateMessage('フォローを解除しました'))
          dispatch(updateSeverity('success'))
          dispatch(updateOpen(true))
        })
      })
    }
    catch (error) {
      alert(error.message);
      dispatch(updateMessage('フォローの解除に失敗しました'))
      dispatch(updateSeverity('error'))
      dispatch(updateOpen(true))
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

  const getThisUserId = async() => {
    try { 
    const followId = await
      UsersRepository.getUser(props.match.params.id)
        .then((results) => {
        return results.id
      })
      return followId;
    }
    catch (error) {
      console.log(error.message);
    }
    return 
  }

  const checkFollowd = (followId: number) => {
    RelationshipsRepository.isFollowed(followId).then((results) => {
      setIsFollowed(results)
    })
  }

  useEffect(() => {
    const check = async() => {
      const followId = await getThisUserId()
        auth.onAuthStateChanged((user) => {
          if (firebaseAuthUser !== null && user !== null) {
            checkFollowd(followId!) 
          }
        });
      }
    check();
  }, [firebaseAuthUser,]);

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
        dispatch(updateMessage('プロフィール画像を更新しました'))
        dispatch(updateSeverity('success'))
        dispatch(updateOpen(true))
      })
    }
    catch (error) {
      console.log(error.message)
      dispatch(updateMessage('プロフィール画像の更新に失敗しました'))
      dispatch(updateSeverity('error'))
      dispatch(updateOpen(true))
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
      dispatch(updateMessage('プロフィールを削除しました'))
      dispatch(updateSeverity('success'))
      dispatch(updateOpen(true))
    })
    }
    catch (error) {
      console.log(error.message);
      dispatch(updateMessage('プロフィール画像の削除に失敗しました'))
      dispatch(updateSeverity('error'))
      dispatch(updateOpen(true))
    }
  }

  //ユーザーのIDだけ変わった時にユーザー情報を取得
  useEffect(() => {
    getUser()
    getUserPosts()
    getUserData()
    getUserLikesPosts()
    getUserFollowers()
    getUserFollowings()
  }, [id]);

  useEffect(() => {
    getUser()
    getUserPosts()
    getUserData()
    getUserLikesPosts()
    getUserFollowers()
    getUserFollowings()
  }, []);

  return (
    <Fragment>
      {error ? <NotFound/> :
      
       <Template>    
        <Grid 
          container 
          component="main" 
          direction="row"
          justify="center"
         >
          <Grid item xs={12} sm={11} md={10} lg={8} >
            <Grid container>
              <Grid item xs={12}>
              { user ?
                <Fragment>
                  <UserMain
                    user={user}
                    firebaseAuthUser={firebaseAuthUser}
                    updateProfileImage={updateProfileImage}
                    destroyProfileImage={destroyProfileImage}
                    updateUser={updateUser}
                  />
                  <Box my={2}>
                    {user.introduction}
                    {firebaseAuthUser && user.uid === firebaseAuthUser.uid &&
                      <IntroductionForm
                        value={user.introduction}
                        updateUser={updateUser}
                      />
                    }
                  </Box>
                </Fragment>: <ContentsLoading/>
                }
              </Grid>
              { user && followers && followings &&
                <Grid container>
                  <Grid xs={4} md={2} item>
                    <FollowModal
                      modalTitle={`${user.name}がフォロー`}
                      title={`フォロー${followings.length}`}
                      users={followings}
                      noText={"フォローなし"}
                    />
                  </Grid>
                  <Grid xs={4} md={2}item>
                  <FollowModal
                    　title={`フォロワー${followers.length}`}
                      modalTitle={`${user.name}のフォロワー`}
                      users={followers}
                      noText={"フォロワーはいません"}
                    />
                  </Grid>
                  <Grid  xs={false} md={6} item/>
                  {user.id !== currentUser?.id &&
                    <Grid xs={4} md={2} item>
                      <FollowButton
                        user={user}
                        currentUser={currentUser}
                        createRelationships={createRelationships}
                        destroyRelationships={destroyRelationships}
                        isFollowed={isFollowed}
                      />
                    </Grid>
                  }
                </Grid>
              }            
              <Grid item xs={12} >
                <Box my={2}>
                  { user && posts && likesPosts ?
                  <UserTab
                    currentUser={currentUser}
                    user={user}
                    posts={posts}
                    likesPosts={likesPosts}
                    fishData={fishData}
                    monthData={monthData}
                  />:
                  <ContentsLoading/>
                  }
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Template>
      }
    </Fragment>
  );
};

export default MyPage;
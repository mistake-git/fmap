import React, {useEffect,useContext } from "react";
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
import FlashAlert from "../../components/layouts/FlashAlert";
import { myHttpClient } from "../../plugins/axios";

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
  const { currentUser } = useContext(AuthContext)
  const [showFlash, setShowFlash] = React.useState(true);
  const [message, setMessage] = React.useState<string>('');
  const [severity, setSeverity] = React.useState<undefined | 'success' | 'error' >(undefined);


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

  const updateUser = async(user: UserModel) => {
    try { 
    await
    myHttpClient.patch(`/users/${props.match.params.id}`,{user: user} ) 
    .then((response) => {
      console.log(response)
      setUser(response.data);
      props.history.push(`/mypage/${response.data.uid}`);
      setShowFlash(true)
      setMessage('自己紹介を更新しました')
      setSeverity('success')
    })
    }
    catch (error) {
      alert(error.message);
      setShowFlash(true)
      setMessage('自己紹介の更新に失敗しました')
      setSeverity('error')
    }
  }
  
  useEffect(() => {
   getUser();
  },[setUser]);

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setShowFlash(false);
  };

  return (
    <React.Fragment>
      { loading &&
        <Loading/>
      }
      {user && posts && likesPosts && userData &&
       <Template>
        {showFlash && message && severity &&
          <FlashAlert
            handleClose={handleClose}
            message={message}
            severity={severity}
          />
        }     
        <Container maxWidth="md">
          <Grid container>
            <Grid item xs={12}>
             
                <UserMain
                  user={user}
                />
              <Box my={2}>
                {user.introduction}
                {currentUser && user.uid === currentUser.uid &&
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
    </React.Fragment>
  );
};

export default MyPage;
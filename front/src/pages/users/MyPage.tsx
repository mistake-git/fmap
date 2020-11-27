import React, {useEffect,useContext } from "react";
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
import IntroductionForm from "../../components/users/IntroductionForm";
import Loading from "../../components/layouts/Loading";
import UserModel from "../../models/UserModel";
import { AuthContext } from '../../Auth'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { makeStyles, Theme } from '@material-ui/core/styles';

interface State {
  posts: PostModel[]
  post: PostModel
}

const useStyles = makeStyles((theme: Theme) => ({
  flash: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const MyPage = (props: any) => {

  const classes = useStyles();
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

  const Alert = (props: AlertProps) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
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
      {user && posts && likesPosts &&
       <Template>
        {showFlash && message && severity &&
          <div className={classes.flash}>
            <Snackbar open={showFlash} autoHideDuration={6000} onClose={handleClose}>
              <Alert onClose={handleClose} severity={severity}>
                {message}
              </Alert>
            </Snackbar>
          </div>
        }     
        <Container maxWidth="md">
          <Grid container>
            <Grid item xs={12}>
              <UserMain
                user={user}
              />
              {user.introduction}
              {currentUser && user.uid === currentUser.uid &&
                <IntroductionForm
                  value={user.introduction}
                  updateUser={updateUser}
                />
              }
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
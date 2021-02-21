import React, { useEffect, Fragment, useState, useContext } from "react";
import { createStyles, Divider, Grid, makeStyles, Theme} from "@material-ui/core";
import Template from "../../components/layouts/Template";
import Box from '@material-ui/core/Box';
import PostButtons from "../../components/posts/PostButtons"
import PostData from "../../components/posts/PostData";
import PostChart from "../../components/posts/PostChart";
import UserBar from "../../components/users/UserBar";
import CommentContainer from "../../components/comments/CommentContainer";
import update from 'react-addons-update'
import PostModel from "../../models/PostModel";
import UserModel from "../../models/UserModel";
import LikeModel from "../../models/LikeModel";
import LikesUsersGroup from "../../components/likes/LikesUsersGroup";
import { Favorite } from "@material-ui/icons";
import ShowGoogleMap from "../../components/map/ShowGoogleMap";
import CommentFormModel from "../../forms/CommentFormModel";
import * as H from 'history';
import NotFound from "../NotFound";
import PostsRepository from "../../repositories/PostsRepository";
import CommentsRepository from "../../repositories/CommentsRepository";
import LikessRepository from "../../repositories/LikesRepository";
import CommentModel from "../../models/CommentModel";
import { match } from "react-router-dom";
import { AuthContext } from "../../Auth";
import { CurrentUserContext } from "../../CurrentUser";
import auth from "../../plugins/firebase";
import UsersRepository from "../../repositories/UsersRepository";
import ContentsLoading from "../../components/layouts/ContentsLoading";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    image: {
      width: '100%',
      paddingBottom: theme.spacing(5)
    }
  }),
);

interface Props<Params extends { [K in keyof Params]?: string } = {id: any} >{
  history: H.History;
  handleFlash: (message: string, severity: 'success'|'error'| 'info') => void
  match: match<Params> | null;
}

const PostsShow = (props: Props) => {
  const classes = useStyles();
  const [post, setPost] = useState<PostModel | null>(null);
  const [feedData, setFeedData] = useState<any | null>(null);
  const [timeData, setTimeData] = useState<any | null>(null);
  const [dateData, setDateData] = useState<any | null>(null);
  const [sizeData, setSizeData] = useState<any | null>(null);
  const [comments, setComments] = useState<CommentModel[]>([]);
  const [like, setLike] = useState<LikeModel | null>(null);
  const [likesUsers, setLikesUsers] = useState<UserModel[] | null>(null);
  const [error, setError] = useState<boolean>(false)
  const postId = props.match?.params.id
  const { firebaseAuthUser } = useContext(AuthContext)
  const {currentUser} = useContext(CurrentUserContext)
  const [isFollowed, setIsFollowed] = useState<boolean>(false)
 
  useEffect(() => {
    const getPost = async() => {
      try { 
      await
        PostsRepository.getPost(postId)
          .then((results) => {
          console.log(results)
          console.log('get post')
          setPost(results);
        })
      }
      catch (error) {
        console.log(error.message);
        setError(true)
      }
    }
    getPost();
  },[setPost, postId]);

  const getPostLikesUsers = async() => {
    try { 
    await
      PostsRepository.getPostLikesUsers(postId)
        .then((results) => {
        setLikesUsers(results);
      })
    }
    catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    getPostLikesUsers();
  },[]);
  
  useEffect(() => {
    const getPostData = async() => {
      try { 
      await
        PostsRepository.getPostData(postId)
          .then((results) => {
          console.log(results)
          console.log('data')
          setDateData(results.date_data)
          setTimeData(results.time_data)
          setFeedData(results.feed_data)
          setSizeData(results.size_data)
        })
      }
      catch (error) {
        console.log(error.message);
      }
    }
    getPostData();
  },[setSizeData, postId]);

  const getPostLikes = async() => {
    try { 
    const likes = await
      PostsRepository.getPostLikes(postId)
        .then((results) => {
        return results
      })
      return likes;
    }
    catch (error) {
      console.log(error.message);
    }
    return [] as LikeModel[];
  }

  useEffect(() => {
    const f = async() => {
      const likes = await getPostLikes();
        auth.onAuthStateChanged((user) => {
          if (firebaseAuthUser !== null && user !== null) {
            UsersRepository.getUser(user!.uid)
            .then((results) => {
              console.log(results)
              const me = results
              getMyLike(likes, me)
            })
            .catch((data) =>{
              console.log(data.user)
            })
          }
        });
      }
    f();
  }, []);

  const getMyLike = (likes: LikeModel[], currentUser: UserModel) => {
    const mylike = likes.find((like: LikeModel) => {
    　return (like.user_id === currentUser?.id);
    });
    console.log('mylike')
    console.log(mylike)
    setLike(mylike || null)
  }

  const createLike = async() => {
    if(firebaseAuthUser === null ){
      props.history.push("/signin");
      const message = 'ログインしてください'
      const severity = 'info'
      props.handleFlash(message,severity)
      return;
    }
    try { 
      await
    　LikessRepository.createLike(postId)
        .then((response) => {
        setLike(response)
        getPostLikesUsers()
        console.log('create like')
        const message = 'いいねしました'
        const severity = 'success'
        props.handleFlash(message,severity)
      })
    }
    catch (error) {
      alert(error.message);
      const message = 'いいねに失敗しました'
      const severity = 'error'
      props.handleFlash(message,severity)
    }
  }

  const destroyLike = async() => {
    try { 
    await
    　 LikessRepository.destroyLike(postId, like!.id)
      .then(() => {
        setLike(null)
        getPostLikesUsers()
        console.log('destroy like')
        const message = 'いいねを取り消しました'
        const severity = 'success'
        props.handleFlash(message,severity)
      })
    }
    catch (error) {
      alert(error.message);
      const message = 'いいねの取り消しに失敗しました'
      const severity = 'error'
      props.handleFlash(message,severity)
    }
  }

  useEffect(() => {
    const getComments = async() => {
    try { 
      await
        PostsRepository.getPostComments(postId)
        .then((results) => {
        console.log(results)
        setComments(results);
        })
      }
      catch (error) {
        console.log(error.message);
      }
    }
    getComments();
  },[setComments, postId]);


  const createComment = async(comment: CommentFormModel) => {
    try { 
      await 
      CommentsRepository.createComment(postId, comment)
        .then((response) => {
        const newData = update(comments, {$unshift:[response]})
        setComments(newData)
        console.log('create comment')
        const message = 'コメントを投稿しました'
        const severity = 'success'
        props.handleFlash(message,severity)
      })
    }
    catch (error) {
      alert(error.message);
      const message = 'いいねの取り消しに失敗しました'
      const severity = 'error'
      props.handleFlash(message,severity)
    }
  }

  const updateComment = async(comment: CommentFormModel) => {
    try { 
      await
      CommentsRepository.updateComment(postId, comment.id!, comment)
      .then((response) => {
        const commentIndex = comments.findIndex((x: CommentModel) => x.id === comment.id)
        const updateComments = update(comments, {[commentIndex]: {$set: response}})
        setComments(updateComments)
        console.log('update comment')
        console.log(updateComments)
        const message = 'コメントを編集しました'
        const severity = 'success'
        props.handleFlash(message,severity)
      })
    }
    catch (error) {
      alert(error.message);
      const message = 'コメントの編集に失敗しました'
      const severity = 'error'
      props.handleFlash(message,severity)
    }
  }

  const destroyComment = async(commentId: number) => {
    try { 
    await
    　CommentsRepository.destroyComment(postId ,commentId)
      .then(() => {
        const commentIndex = comments.findIndex((x: CommentModel) => x.id === commentId)
        const deleteComments = update(comments, {$splice: [[commentIndex, 1]]})
        setComments(deleteComments)
        console.log('destroy comment')
        const message = 'コメントを削除しました'
        const severity = 'success'
        props.handleFlash(message,severity)
      })
    }
    catch (error) {
      alert(error.message);
      const message = ' コメントの削除に失敗しました'
      const severity = 'error'
      props.handleFlash(message,severity)
    }
  }

  const destroyPost = async(postId: number) => {
    try { 
    await
    　 PostsRepository.destroyPost(postId)
      .then(() => {
        console.log('delete post')
        props.history.push("/posts");
        const message = '釣果を削除しました'
        const severity = 'success'
        props.handleFlash(message,severity)
      })
    }
    catch (error) {
      alert(error.message);
      const message = '釣果を削除しました'
      const severity = 'error'
      props.handleFlash(message,severity)
    }
  }

  const getPostUser = async() => {
    try { 
    const userId = await
      PostsRepository.getPostUser(postId)
        .then((results) => {
        return results.id
      })
      return userId;
    }
    catch (error) {
      console.log(error.message);
    }
    return ;
  }

  const checkFollowd = (userId: number, followId: number) => {
    UsersRepository.isFollowed(userId,followId).then((results) => {
      setIsFollowed(results)
    })
  }

  useEffect(() => {
    const check = async() => {
      const followId = await getPostUser();
        auth.onAuthStateChanged((user) => {
          if (firebaseAuthUser !== null && user !== null) {
            UsersRepository.getUser(user!.uid)
            .then((results) => {
              console.log(results)
              const userId = results.id
              checkFollowd(userId, followId!)
            })
            .catch((data) =>{
              console.log(data)
            })
          }
        });
      }
    check();
  }, []);

  const createRelationships = async(follow_id: number) => {
    if(firebaseAuthUser === null ){
      props.history.push("/signin");
      const message = 'ログインしてください'
      const severity = 'info'
      props.handleFlash(message,severity)
      return;
    }
    try { 
    await
    　 UsersRepository.createRelationships(currentUser.id, follow_id)
      .then((results) => {
        console.log('create relationships')
        const message = 'ユーザーをフォローしました'
        const severity = 'success'
        props.handleFlash(message,severity)
        UsersRepository.isFollowed(currentUser.id, results.id)
        .then((results) => {
          setIsFollowed(results)
          console.log(results)
        })
      })
    }
    catch (error) {
      alert(error.message);
      const message = 'ユーザーのフォローに失敗しました'
      const severity = 'error'
      props.handleFlash(message,severity)
    }
  }

  const destroyRelationships = async(userId: number, followId: number) => {
    try { 
    await
    　 UsersRepository.destroyRelationships(userId, followId)
      .then((results) => {
        console.log('destroy relationships')
        UsersRepository.isFollowed(userId, results.id)
        .then((results) => {
          const message = 'フォローを解除しました'
          const severity = 'success'
          props.handleFlash(message,severity)
          setIsFollowed(results)
          console.log(results)
        })
      })
    }
    catch (error) {
      alert(error.message);
      const message = 'フォローの解除に失敗しました'
      const severity = 'error'
      props.handleFlash(message,severity)
    }
  }

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
            <Grid item xs={12} sm={11} md={10} lg={10} xl={10} >
              <Grid container spacing={1} style={{ marginTop: "1em" }}>
                <Grid item xs={12} md={1}>
                  {post &&
                    <PostButtons 
                      post={post}
                      currentUser={currentUser}
                      like={like}
                      postUser={post.user}
                      destroyPost={destroyPost} 
                      createLike={createLike} 
                      destroyLike={destroyLike} 
                    />
                  }
                </Grid>
                <Grid xs={12} item md={8} style={{ marginTop: "1em" }}>
                  {post ?
                    <Fragment>
                      <img src={post.image_url} alt="釣果画像" className={classes.image}/>
                      <Box display="flex" justifyContent="flex-end" mb={3}>
                        <Favorite color="secondary"/>
                        {likesUsers &&
                          <LikesUsersGroup
                            likesUsers={likesUsers}
                          />
                        }
                      </Box>
                    </Fragment>
                    :<ContentsLoading/>
                  }
                  {post && comments ?
                    <Fragment>
                      <PostData post={post}/>
                      <Box fontWeight="fontWeightBold" mt={5} mb={2}　fontSize={16}>
                        {post.name}のデータ分析
                      </Box>
                      {feedData  && timeData && sizeData && dateData &&
                      <PostChart 
                        post={post} 
                        feedData={feedData}
                        dateData={dateData}
                        timeData={timeData}
                        sizeData={sizeData}
                      />
                      }
                      <Divider/>
                      <Box my={5}>
                        <Box fontWeight="fontWeightBold" mt={5} mb={2}　fontSize={16}>
                          {post.name}の釣れた場所
                        </Box>
                        <ShowGoogleMap
                          post={post}
                        />
                      </Box>
                      <UserBar 
                        postUser={post.user}
                        createRelationships={createRelationships}
                        destroyRelationships={destroyRelationships}
                        isFollowed={isFollowed}
                      />
                      {post.memo}

                      <CommentContainer
                        post={post}
                        comments={comments}
                        firebaseAuthUser={firebaseAuthUser}
                        createComment={createComment}
                        updateComment={updateComment}
                        destroyComment={destroyComment}
                      />
                    </Fragment>:
                    <ContentsLoading/>
                  }
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Template>
      }
    </Fragment>
  );
};
export default PostsShow;

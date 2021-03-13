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
import { match, useHistory } from "react-router-dom";
import { AuthContext } from "../../Auth";
import { CurrentUserContext } from "../../CurrentUser";
import auth from "../../plugins/firebase";
import UsersRepository from "../../repositories/UsersRepository";
import ContentsLoading from "../../components/layouts/ContentsLoading";
import RelationshipsRepository from "../../repositories/RelationshipsRepository";
import { useDispatch } from "react-redux";
import { updateMessage, updateOpen, updateSeverity } from "../../actions/Flash";

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
  const [hasMore, setHasMore] = useState(true);
  const history = useHistory();
  const dispatch = useDispatch()
 
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

  useEffect(() => {
    const getMyLike = async() => {
      if (firebaseAuthUser !== null) {
        LikessRepository.getMyLike(postId)
        .then((results) => {
          console.log(results)
          setLike(results)
        })
        .catch((data) =>{
          console.log(data.user)
        })
      }
    }
    getMyLike();
  }, [firebaseAuthUser]);

  const createLike = async() => {
    if(firebaseAuthUser === null ){
      history.push("/signin");
      dispatch(updateMessage('ログインしてください'))
      dispatch(updateSeverity('info'))
      dispatch(updateOpen(true))
      return;
    }
    try { 
      await
    　LikessRepository.createLike(postId)
        .then((response) => {
        setLike(response)
        getPostLikesUsers()
        console.log('create like')
        dispatch(updateMessage('いいねしました'))
        dispatch(updateSeverity('success'))
        dispatch(updateOpen(true))
      })
    }
    catch (error) {
      alert(error.message);
      dispatch(updateMessage('いいねに失敗しました'))
      dispatch(updateSeverity('error'))
      dispatch(updateOpen(true))
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
        dispatch(updateMessage('いいねを削除しました'))
        dispatch(updateSeverity('success'))
        dispatch(updateOpen(true))
      })
    }
    catch (error) {
      alert(error.message);
      dispatch(updateMessage('いいねの削除に失敗しました'))
      dispatch(updateSeverity('error'))
      dispatch(updateOpen(true))
    }
  }


    const getComments = async(page: number) => {
    try { 
      await
        PostsRepository.getPostComments(postId, page)
        .then((results) => {
          if (results.length < 1) {
            setHasMore(false);
            return;
          }
          console.log(results)
          setComments(results);
        })
      }
      catch (error) {
        console.log(error.message);
      }
    }

  const loadMore = async (page: number) => {
    getComments(page)    
  }

  const createComment = async(comment: CommentFormModel) => {
    try { 
      await 
      CommentsRepository.createComment(postId, comment)
        .then((response) => {
        const newData = update(comments, {$unshift:[response]})
        setComments(newData)
        console.log('create comment')
        dispatch(updateMessage('コメントを投稿しました'))
        dispatch(updateSeverity('success'))
        dispatch(updateOpen(true))
      })
    }
    catch (error) {
      alert(error.message);
      dispatch(updateMessage('コメントの投稿に失敗しました'))
      dispatch(updateSeverity('error'))
      dispatch(updateOpen(true))
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
        dispatch(updateMessage('コメントを編集しました'))
        dispatch(updateSeverity('success'))
        dispatch(updateOpen(true))
      })
    }
    catch (error) {
      alert(error.message);
      dispatch(updateMessage('コメントの編集に失敗しました'))
      dispatch(updateSeverity('error'))
      dispatch(updateOpen(true))
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
        dispatch(updateMessage('コメントを削除しました'))
        dispatch(updateSeverity('success'))
        dispatch(updateOpen(true))
      })
    }
    catch (error) {
      alert(error.message);
      dispatch(updateMessage('コメントの削除に失敗しました'))
      dispatch(updateSeverity('error'))
      dispatch(updateOpen(true))
    }
  }

  const destroyPost = async(postId: number) => {
    try { 
    await
    　 PostsRepository.destroyPost(postId)
      .then(() => {
        console.log('delete post')
        history.push("/posts");
        dispatch(updateMessage('釣果を削除しました'))
        dispatch(updateSeverity('success'))
        dispatch(updateOpen(true))
      })
    }
    catch (error) {
      alert(error.message);
      dispatch(updateMessage('釣果の削除に失敗しました'))
      dispatch(updateSeverity('error'))
      dispatch(updateOpen(true))
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

  const checkFollowd = (followId: number) => {
    RelationshipsRepository.isFollowed(followId).then((results) => {
      setIsFollowed(results)
    })
  }

  useEffect(() => {
    const check = async() => {
      const followId = await getPostUser();
        auth.onAuthStateChanged((user) => {
          if (firebaseAuthUser !== null && user !== null) {
            checkFollowd(followId!)
          }
        })
      }
    check();
  }, []);

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

  const destroyRelationships = async(userId: number, followId: number) => {
    try { 
    await
    　 RelationshipsRepository.destroyRelationships(followId)
      .then((results) => {
        console.log('destroy relationships')
        RelationshipsRepository.isFollowed(results.id)
        .then((results) => {
          dispatch(updateMessage('フォローを解除しました'))
          dispatch(updateSeverity('success'))
          dispatch(updateOpen(true))
          setIsFollowed(results)
          console.log(results)
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
                  {post ?
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
                        loadMore={loadMore} 
                        hasMore={hasMore}
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

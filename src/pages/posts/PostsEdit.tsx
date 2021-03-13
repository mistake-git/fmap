
import React, { Fragment, useEffect, useState, useContext } from "react";
import { Grid} from "@material-ui/core";
import Template from "../../components/layouts/Template";
import PostForm from "../../components/posts/PostForm"
import * as H from 'history';
import NotFound from "../NotFound";
import PostsRepository from "../../repositories/PostsRepository";
import { CurrentUserContext } from "../../CurrentUser";
import moment from 'moment'
import ContentsLoading from "../../components/layouts/ContentsLoading";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateMessage, updateOpen, updateSeverity } from "../../actions/FlashActions";

interface Props {
  history: H.History;
  match: any
}

const PostsEdit = (props: Props) => {
  const [post, setPost] = useState<any>('');
  const [error, setError] = useState<Boolean>(false)
  const { currentUser} = useContext(CurrentUserContext)
  const history = useHistory();
  const dispatch = useDispatch()

  useEffect(() => {
    const getPost = async() => {
      try { 
      await
      PostsRepository.getPost(props.match.params.id)
      .then((results) => {
        console.log(results)
        setPost(results)
        })
      }
      catch (error) {
        console.log(error.message);
        setError(true)
      }
    }
    getPost();
  },[setPost,props.match.params.id]);

  const updatePost = async(post: any, image: File | null) => {
    try { 
      const formData = new FormData();
      //画像を更新しない時はどうすればいいのか
      if(image) 
        formData.append("image", image!);
      formData.append("name", post.name)
      formData.append("number", post.number)
      formData.append("size", post.size)
      formData.append("date", post.date)
      formData.append("time", post.time)
      formData.append("weight", post.weight)
      formData.append("weather", post.weather)
      formData.append("feed", post.feed)
      formData.append("memo", post.memo)
      formData.append("status", post.status)
      formData.append("latitude", post.latitude)
      formData.append("longitude", post.longitude)
    await
    PostsRepository.updatePost(props.match.params.id,formData)   
    .then((response) => {
      console.log(response)
      dispatch(updateMessage('釣果を編集しました'))
      dispatch(updateSeverity('success'))
      dispatch(updateOpen(true))
      history.push(`/posts/${response.id}`);
    })
    }
    catch (error) {
      console.log(error.message);
      dispatch(updateMessage('釣果の編集に失敗しました'))
      dispatch(updateSeverity('error'))
      dispatch(updateOpen(true))
    }
  }

  const values ={
    image_url: post.image_url,
    name: post.name, 
    size: post.size,
    weight: post.weight,
    weather: post.weather,
    number: post.number,
    feed: post.feed,
    memo: post.memo,
    date: post.date,
    time: moment(post.time).format('HH:mm'),
    status: post.statu,
    latitude: post.latitude,
    longitude: post.longitude
  }

  const title = "釣果を編集"
  
  return (
    <Fragment>
      {error ? <NotFound/>: 
        <Template>
          <Grid 
            container 
            component="main" 
            direction="row"
            justify="center"
          >
            <Grid item xs={12} sm={11} md={10} lg={8} >
            {post && currentUser ?
              <PostForm 
                post={post} 
                currentUser={currentUser}
                action={updatePost}
                values={values}
                lat={post.latitude}
                lng={post.longitude}
                title={title}
              />: <ContentsLoading/>
            }
            </Grid>
          </Grid>
        </Template>
      }
    </Fragment>
  );
};
export default PostsEdit;
import React, { useEffect, useContext } from "react";
import { Grid} from "@material-ui/core";
import Template from "../../components/layouts/Template";
import PostForm from "../../components/posts/PostForm"
import * as H from 'history';
import PostsRepository from "../../repositories/PostsRepository";
import { AuthContext } from "../../Auth";
import { CurrentUserContext } from "../../CurrentUser";
import ContentsLoading from "../../components/layouts/ContentsLoading";

interface Props {
  history: H.History;
  handleFlash: (message: string, severity: 'success'|'error'|'info') => void
  match: any
}

const PostsNew = (props: Props) => {
  const { currentUser} = useContext(CurrentUserContext)
  const {firebaseAuthUser } = useContext(AuthContext);

  useEffect(() => {
    // if not logged in, redirect to login page
    if (firebaseAuthUser === null){
      props.history.push("/signin")
      const message = '投稿するにはログインしてください'
      const severity = 'info'
      props.handleFlash(message,severity)
    }
  }, [firebaseAuthUser,props.history]);

  const createPost = async(post: any, image: File) => {
    try { 
      const formData = new FormData();
      formData.append("image", image)
      formData.append("name", post?.name)
      formData.append("number", post.number)
      formData.append("size", post.size)
      formData.append("date", post?.date)
      formData.append("time", post?.time)
      formData.append("weight", post?.weight)
      formData.append("weather", post?.weather)
      formData.append("feed", post?.feed)
      formData.append("memo", post?.memo)
      formData.append("status", post?.status)
      formData.append("latitude", post?.latitude)
      formData.append("longitude", post?.longitude)
      formData.append("user_id", post?.user_id)
    await
    PostsRepository.createPost(formData)
    .then((response) => {
      console.log(response)
      console.log('create post')
      props.history.push(`/posts/${response.id}`);
      const message = '釣果を投稿しました'
      const severity = 'success'
      props.handleFlash(message,severity)
    })
    }
    catch (error) {
      console.log(error.message);
      const message = '釣果の投稿に失敗しました'
      const severity = 'error'
      props.handleFlash(message,severity)
    }
  }

  const values ={
    image_url: "",
    name: "", 
    size: "",
    weight: "",
    weather: "",
    number: 1,
    feed: "",
    memo: "",
    date: "",
    time: "",
    status: "",
    user_id: "",
    latitude: "",
    longitude: ""
  }
　
  //ユーザーが活動地域を設定していない場合は東京をデフォルトにする
  const lat = currentUser?.latitude != null ? currentUser?.latitude : 35.67;
  const lng = currentUser?.longitude != null ? currentUser?.longitude : 139.76;
  const title = "釣果を投稿"

  return (
    <Template>
      <Grid 
        container 
        component="main" 
        direction="row"
        justify="center"
      >
        <Grid item xs={12} sm={11} md={10} lg={8} >
        {currentUser ?
          <PostForm 
            action={createPost} 
            values={values}
            currentUser={currentUser}
            lat={lat}
            lng={lng}
            title={title}
            handleFlash={props.handleFlash}
          /> : <ContentsLoading/>
          }
        </Grid>
      </Grid>
    </Template>
  );
};
export default PostsNew;
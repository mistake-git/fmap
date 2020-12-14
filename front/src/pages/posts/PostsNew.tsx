import React, { Fragment, useEffect, useState } from "react";
import { Container} from "@material-ui/core";
import Template from "../../components/layouts/Template";
import PostForm from "../../components/posts/PostForm"
import auth from "../../plugins/firebase";
import UserModel from "../../models/UserModel";
import { myHttpClient } from "../../plugins/axios";
import * as H from 'history';

interface Props {
  history: H.History;
  handleFlash: (message: string, severity: 'success'|'error') => void
  match: any
}

const PostsNew = (props: Props) => {
  const [user, setUser] = useState<UserModel | null>(null);

  useEffect(() => {
    auth.onAuthStateChanged((user: any) => {
      myHttpClient.get(`/users/${user?.uid}`)
      .then((results) => {
        console.log(results)
        setUser(results.data)
      })
      .catch((data) =>{
        console.log(data.user)
      })
    });
  }, []);

  const createPost = async(post: any) => {
    try { 
    await
    myHttpClient.post('/posts',{post: post}) 
    .then((response) => {
      console.log(response.data)
      console.log('create post')
      props.history.push(`/posts/${response.data.id}`);
      const message = '釣果を投稿しました'
      const severity = 'success'
      props.handleFlash(message,severity)
    })
    }
    catch (error) {
      alert(error.message);
      const message = '釣果の投稿に失敗しました'
      const severity = 'error'
      props.handleFlash(message,severity)
    }
  }

  const values ={
    image: "",
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

  const lat = 35;
  const lng = 135;
  const title = "釣果を投稿"

  return (
    <Fragment>
      <Template>
        <Container maxWidth="md" style={{marginTop: "3rem"}}>
          <PostForm 
            action={createPost} 
            values={values}
            user={user}
            lat={lat}
            lng={lng}
            title={title}
          />
        </Container>
      </Template>
    </Fragment>
  );
};
export default PostsNew;
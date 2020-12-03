import React, { Fragment, useEffect, useState } from "react";
import { Container} from "@material-ui/core";
import Template from "../../components/layouts/Template";
import PostForm from "../../components/posts/PostForm"
import auth from "../../plugins/firebase";
import UserModel from "../../models/UserModel";
import PostModel from "../../models/PostModel";
import { myHttpClient } from "../../plugins/axios";

const PostsEdit = (props: any) => {

  const [post, setPost] = useState<any>('');
  const [user, setUser] = useState<UserModel | null>(null);

  useEffect(() => {
    auth.onAuthStateChanged((user: any) => {
      myHttpClient.get(`/users/${user?.uid}`)
      .then((results) => {
        console.log(results)
        setUser(results.data.user)
      })
      .catch((data) =>{
        console.log(data.user)
      })
    });
  }, []);


  const getPost = async() => {
    try { 
    await
    myHttpClient.get(`/posts/${props.match.params.id}`)
		.then((results) => {
			console.log(results)
      setPost(results.data.post)
      })
    }
    catch (error) {
      alert(error.message);
    }
  }

  useEffect(() => {
    getPost();
  },[setPost]);

  const updatePost = async(post: PostModel) => {
    try { 
    await
    myHttpClient.patch(`/posts/${props.match.params.id}`,{post: post})  
    .then((response) => {
      console.log(response)
      props.history.push(`/posts/${response.data.id}`);
    })
    }
    catch (error) {
      alert(error.message);
    }
  }

  const values ={
    name: post.name, 
    size: post.size,
    weight: post.weight,
    weather: post.weather,
    number: post.number,
    feed: post.feed,
    memo: post.memo,
    date: post.date,
    time: post.time,
    status: post.statu,
    latitude: post.latitude,
    longitude: post.longitude
  }
  
  return (
    <Fragment>
      <Template>
        <Container maxWidth="md" style={{marginTop: "3rem"}}>
          <PostForm 
            post={post} 
            user={user}
            action={updatePost}
            values={values}
          />
        </Container>
      </Template>
    </Fragment>
  );
};
export default PostsEdit;
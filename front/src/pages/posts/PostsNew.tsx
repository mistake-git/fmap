import React, { Fragment, useContext } from "react";
import { Container} from "@material-ui/core";
import Template from "../../components/layouts/Template";
import { makeStyles } from '@material-ui/core/styles';
import PostForm from "../../components/posts/PostForm"
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
  control: {
    padding: theme.spacing(1.5),
  },
}));

const PostsNew = (props: any) => {

  const createPost = async(post: any) => {
    try { 
    await
    axios.post('http://localhost:3000/api/v1/posts',{post: post} ) 
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
    name: "", 
    size: "",
    weight: "",
    weather: "",
    number: "",
    feed: "",
    memo: "",
    date: "",
    time: "",
    status: "",
    user_id: "",
  }

  return (
    <Fragment>
      <Template>
        <Container maxWidth="md">
          <PostForm 
            action={createPost} 
            values={values}
          />
        </Container>
      </Template>
    </Fragment>
  );
};
export default PostsNew;
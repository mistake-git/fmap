import React, { Fragment, useContext, useEffect } from "react";
import { Container} from "@material-ui/core";
import { AuthContext } from "../../Auth";
import Template from "../../components/layouts/Template";
import { makeStyles } from '@material-ui/core/styles';
import PostForm from "../../components/posts/PostForm"
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
  control: {
    padding: theme.spacing(1.5),
  },
}));

const PostsEdit = (props: any) => {
  const [post, setPost] = React.useState<any>('');


  const getPost = async() => {
    try { 
    await
    axios.get(`http://localhost:3000/api/v1/posts/${props.match.params.id}`)
		.then((results) => {
			console.log(results)
      setPost(results.data)
      })
    }
    catch (error) {
      alert(error.message);
    }
  }

  useEffect(() => {
    getPost();
  },[setPost]);

  const updatePost = async(post: any) => {
    try { 
    await
    axios.patch('http://localhost:3000/api/v1/posts',{post: post} ) 
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
    size: post.size ,
    weight: post.weight,
    weather: post.weather,
    number: post.number,
    feed: post.feed,
    memo: post.memo,
    date: post.date,
    time: post.time,
    status: post.statu,
    user_id: 1,
  }
  
  return (
    <Fragment>
      <Template>
        <Container maxWidth="md">
          <PostForm 
            post={post} 
            action={updatePost}
            values={values}
          />
        </Container>
      </Template>
    </Fragment>
  );
};
export default PostsEdit;
import React, { Fragment, useContext, useEffect } from "react";
import { Container} from "@material-ui/core";
import { AuthContext } from "../../Auth";
import Template from "../../components/layouts/Template";
import { makeStyles } from '@material-ui/core/styles';
import PostEditForm from "../../components/posts/PostEditForm"
import axios from 'axios'



const useStyles = makeStyles((theme) => ({
  control: {
    padding: theme.spacing(1.5),
  },
}));

const PostsEdit = (props: any) => {
  const [post, setPost] = React.useState<any>('')

  useEffect(() => {
    axios.get(`http://localhost:3000/api/v1/posts/${props.match.params.id}`)
		.then((results) => {
			console.log(results)
      setPost(results.data)
		})
		.catch((data) =>{
			console.log(data)
		})
  },[setPost]);

  const { currentUser } = useContext(AuthContext);
  const classes = useStyles();

  const pushPosts = () =>{
    props.history.push('/posts')
  }


  useEffect(() => {
    // if not logged in, redirect to login page
    currentUser === null && props.history.push("/signin");
  }, [currentUser]);

  return (
    <Fragment>
      <Template>
        <Container maxWidth="md">
          <PostEditForm post={post} pushPosts={pushPosts}/>
        </Container>
      </Template>
    </Fragment>
  );
};
export default PostsEdit;
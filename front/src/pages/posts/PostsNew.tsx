import React, { Fragment, useContext, useEffect } from "react";
import { Container} from "@material-ui/core";
import { AuthContext } from "../../Auth";
import Template from "../../components/layouts/Template";
import { makeStyles } from '@material-ui/core/styles';
import PostNewForm from "../../components/posts/PostNewForm"

const useStyles = makeStyles((theme) => ({
  control: {
    padding: theme.spacing(1.5),
  },
}));

const PostsNew = (props: any) => {
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
          <PostNewForm pushPosts={pushPosts} />
        </Container>
      </Template>
    </Fragment>
  );
};
export default PostsNew;
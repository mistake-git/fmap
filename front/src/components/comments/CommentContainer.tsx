import React, { Fragment, useContext, useEffect } from "react";
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import CommentMenu from './CommentMenu';
import CommentForm from './CommentForm';
import Comments from './Comments';
import axios from 'axios'
import update from 'react-addons-update'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
    inline: {
      display: 'inline',
    },
  }),
);


export default function CommentContainer(props: any) {
  const classes = useStyles();
  const [comments, setComments] = React.useState<any>([]);

  useEffect(() => {
    axios.get(`http://localhost:3000/api/v1/posts/${props.post.id}`)
		.then((results) => {
			console.log(results)
      setComments(results.data)
		})
		.catch((data) =>{
			console.log(data)
		})
  },[setComments]);


  const createComment = (comment: any) =>{
    axios.post(`http://localhost:3000/api/v1/posts/${props.post.id}/comments`,{comment: comment} )
    .then((response) => {
      const newData = update(comments, {$push:[response.data]})
      setComments(newData)
    })
    .catch((data) =>{
      console.log(data)
    })
  }

  const destroyComment = (id: any) => {
    axios.delete(`http://localhost:3000/api/v1/posts/${props.post.id}/comments/${id}`)
    .then((response) => {
      const commentIndex = comments.findIndex((x: any) => x.id === id)
      const deleteComments = update(comments, {$splice: [[commentIndex, 1]]})
      setComments(deleteComments)
      console.log('set')
    })
    .catch((data) =>{
      console.log(data)
    })
  }

  return (
    <React.Fragment>
     <CommentForm 
      commentsCount={comments.length}
      createComment={createComment}
      />
     <Comments 
      comments={comments}
      post={props.post} 
      destroyComment={destroyComment}
     />
    </React.Fragment>
  );
}
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

  

  return (
    <React.Fragment>
     <CommentForm 
      commentsCount={props.comments.length}
      createComment={props.createComment}
      />
     <Comments 
      comments={props.comments}
      post={props.post} 
      destroyComment={props.destroyComment}
     />
    </React.Fragment>
  );
}
import React　from "react";
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';

import CommentForm from './CommentForm';
import Comments from './Comments';

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
      user={props.user}
      />
     <Comments 
      comments={props.comments}
      post={props.post} 
      destroyComment={props.destroyComment}
      user={props.user}
     />
    </React.Fragment>
  );
}
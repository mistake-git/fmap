import React,{ Fragment, useContext, useState } from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import CommentMenu from './CommentMenu';
import CommentModel from '../../models/CommentModel';
import CommentEditForm from './CommentEditForm'
import { Link } from 'react-router-dom';
import PostModel from '../../models/PostModel';
import CommentForm from '../../forms/CommentFormModel';
import moment from 'moment'
import 'moment/locale/ja'
import { CurrentUserContext } from '../../CurrentUser';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
    inline: {
      display: 'inline',
    },
    topLink: {
      textDecoration: 'none',
      color: 'black',
    },
  }),
);

interface Props {
  post: PostModel
  comment: CommentModel
  destroyComment: (id: number) => {}
  updateComment: (comment: CommentForm) => {}
}

export default function Comment(props: Props) {
  const classes = useStyles();
  const [formOpen, setFormOpen]= useState<boolean>(false);
  const comment: CommentModel = props.comment;
  const {currentUser} = useContext(CurrentUserContext)
  const handleFormOpen = () =>{
    setFormOpen(true)
  }
  
  const handleFormClose = () =>{
    setFormOpen(false)
  }
  
  return (
    <Fragment>
        <Fragment>
        <List className={classes.root} key={comment.id} disablePadding={true}>
          <ListItem alignItems="flex-start" disableGutters>
            <ListItemAvatar>
              <Avatar alt={comment.user.name} src={comment.user.image_url} />
            </ListItemAvatar>
            <ListItemText
              primary={
                <Fragment>
                  <Link to={`/mypages/${comment.user.uid}`} className={classes.topLink}>
                    {comment.user.name}
                  </Link>
                  : <Typography variant="caption" gutterBottom>{moment(comment.created_at).fromNow()}</Typography>
                </Fragment>
              }
              secondary={
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary"
                >
                  {comment.content}
                </Typography>
              }
            />
            { currentUser && currentUser.id === comment.user.id &&
              <CommentMenu 
                post={props.post} 
                comment={comment} 
                destroyComment={props.destroyComment}
                handleFormOpen={handleFormOpen}
              />
            }
          </ListItem>   
        </List>
        {formOpen &&
          <CommentEditForm
            handleFormClose={handleFormClose}
            comment={comment} 
            updateComment={props.updateComment}
          />
        }
      </Fragment>
    </Fragment>
  );
}



   

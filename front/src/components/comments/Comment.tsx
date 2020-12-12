import React,{ Fragment, useState } from 'react';
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

export default function Comment(props: any) {
  const classes = useStyles();
  const [formOpen, setFormOpen]= useState<boolean>(false);
  const comment: CommentModel = props.comment;
  const handleFormOpen = () =>{
    setFormOpen(true)
  }
  
  const handleFormClose = () =>{
    setFormOpen(false)
  }
  
  return (
    <Fragment>
        <Fragment>
        <List className={classes.root} key={comment.id}>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt={comment.user.name} src={comment.user.image_url} />
            </ListItemAvatar>
            <ListItemText
              primary={comment.user.name}
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
            <CommentMenu 
              post={props.post} 
              comment={comment} 
              destroyComment={props.destroyComment}
              handleFormOpen={handleFormOpen}
            />
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



   

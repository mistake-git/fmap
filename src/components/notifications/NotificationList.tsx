import React, { Fragment } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import PersonIcon from '@material-ui/icons/Person';
import Divider from '@material-ui/core/Divider';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import NotificationModel from '../../models/NotificationModel';
import moment from 'moment'
import 'moment/locale/ja'
import { Box } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    padding: 0,
    },
    favorite:{
      color: 'rgb(224, 36, 94)',
    },
    comment:{
      color:'gray',
    },
    person:{
      color: '#00acee',
    },
    note :{
      color: 'rgb(121, 75, 196)',
    }
  }),
);

interface Props {
  notifications: NotificationModel[]
}

export default function NotifiCationList(props: Props) {
  const classes = useStyles();

  const like = (notification: NotificationModel) => {
    return(
      <Fragment>
        <ListItemText primary={`${notification.visitor.name}さんがあなたの【${notification.post.name}】の記事にいいね！しました`} secondary={moment(notification.created_at).fromNow()} />
        <FavoriteIcon className={classes.favorite}/>
      </Fragment>
    )
  }

  const comment = (notification: NotificationModel) => {
    return(
      <Fragment>
        <ListItemText primary={`${notification.visitor.name}さんがあなたの【${notification.post.name}】の記事にコメントしました:${notification.comment.content}`} secondary={moment(notification.created_at).fromNow()} />
        <ChatBubbleIcon className={classes.comment}/>
      </Fragment>
    )
  }

  const follow = (notification: NotificationModel) => {
    return(
      <Fragment>
        <ListItemText primary={`${notification.visitor.name}さんにフォローされました`} secondary={moment(notification.created_at).fromNow()} />
        <PersonIcon  className={classes.person}/>
      </Fragment>
    )
  }
  
  const judgeNotification = (notification: NotificationModel) => {
    var action = notification.action;
    switch(action){
    　case "like":
        like(notification)
    　break;
    　case "comment":
    　  comment(notification)
    　break;
    　case "follow":
        follow(notification)
    　break;
    }
  }

  return (
    <List className={classes.root} disablePadding>
      {props.notifications && props.notifications.length >= 1 ? 
        props.notifications.map((notification) => {
        return(
          <Fragment>
            <ListItem button disableGutters>
              <ListItemAvatar>
                <Avatar alt={notification.visitor.name} src={notification.visitor.image_url} />
              </ListItemAvatar>
              {judgeNotification(notification)}
            </ListItem>  
            <Divider/>
          </Fragment>
          )
        }):
        <Box textAlign="center">通知がありません</Box>
        }
    </List>
  );
}


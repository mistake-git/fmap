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
import { Link } from 'react-router-dom';
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
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
    comment:{
      color: '#FFCE56',
      width: theme.spacing(3),
      height: theme.spacing(3)
    },
    person:{
      color: '#00acee',
      width: theme.spacing(3),
      height: theme.spacing(3)
    },
    defaultLink: {
      textDecoration: 'none',
      color: '#000000'
    },
    link:{
      color: '#3f51b5;',
      textDecoration: 'none',
      fontWeight: 'bold'
    },
    avater:{
      width: theme.spacing(4),
      height: theme.spacing(4)
    },
  }),
);

interface Props {
  notifications: NotificationModel[]
}

export default function NotifiCationList(props: Props) {
  const classes = useStyles();

  const visitor = (notification: NotificationModel) => {
    return(
      <Link to={`/mypages/${notification.visitor.uid}`} className={classes.link}>{`${notification.visitor.name}`}</Link>
    )
  }

  const yourPost = (notification: NotificationModel) => {
    return(
      <Link to={`/posts/${notification.post.id}`} className={classes.link}>{`【${notification.post.name}】`}</Link>
    )
  }

  const like = (notification: NotificationModel) => {
    return(
      <Fragment>
        <ListItemText 
         primary={
          <Fragment>
            {visitor(notification)}
            さんがあなたの
            {yourPost(notification)}
            の釣果にいいね！しました。
          </Fragment>
        }   
          secondary={moment(notification.created_at).fromNow()} 
        />
        <FavoriteIcon className={classes.favorite}/>
      </Fragment>
    )
  }

  const comment = (notification: NotificationModel) => {
    return(
      <Fragment>
        <ListItemText 
          primary={
            <Fragment>
              {visitor(notification)}
              さんがあなたの
              {yourPost(notification)}
              の釣果にコメントしました:{`${notification.comment.content}`}
            </Fragment>
          }   
          secondary={moment(notification.created_at).fromNow()} 
        />
        <ChatBubbleIcon className={classes.comment}/>
      </Fragment>
    )
  }

  const follow = (notification: NotificationModel) => {
    return(
      <Fragment>
        <ListItemText 
          primary={
            <Fragment>
              {visitor(notification)}
              さんにフォローされました
            </Fragment>
          } 
          secondary={moment(notification.created_at).fromNow()}
        />
        <PersonIcon  className={classes.person}/>
      </Fragment>
    )
  }

  const judgeNotificationType = (notification: NotificationModel) =>{
    const action = notification.action
    if (action === 'like') {
      return like(notification)
    } else if (action === 'comment') {
      return comment(notification)
    } else if (action === 'follow') {
     return follow(notification)
    } else {
      return
    }
  }

  return (
    <List className={classes.root}>
      {props.notifications.length ?
        props.notifications.map((notification) => {
        return(
          <Fragment>
            <Link to={'/notifications'} className={classes.defaultLink}>
              <ListItem button>
                <ListItemAvatar>
                  <Avatar alt={notification.visitor.name} src={notification.visitor.image_url} className={classes.avater}/>
                </ListItemAvatar>
                {judgeNotificationType(notification)}
              </ListItem>  
              <Divider/>
            </Link>
          </Fragment>
          )
        }):<Box mx="auto" my={5}>通知はありません</Box>
      }
    </List>
  );
}


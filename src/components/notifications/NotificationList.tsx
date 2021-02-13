import React from 'react';
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

  return (
    <List className={classes.root} disablePadding>
      <ListItem button disableGutters>
        <ListItemAvatar>
        <Avatar>
          <PersonIcon />
        </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Aさんがあなたの記事【ニュース】にコメントしました:コメントのコンテンツ" secondary="2020/9/23" />
        <ChatBubbleIcon className={classes.comment}/>
      </ListItem>
      <Divider/>
      <ListItem button disableGutters>
        <ListItemAvatar>
        <Avatar>
          <PersonIcon />
        </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Bさんがあなたの記事に良いね！しました" secondary="2020/4/2" />
        <FavoriteIcon className={classes.favorite}/>
      </ListItem>
      <Divider/>
      <ListItem button disableGutters>
        <ListItemAvatar>
        <Avatar>
          <PersonIcon />
        </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Cさんにフォローされました" secondary="2020/3/2" />
        <PersonIcon  className={classes.person}/>
      </ListItem>
      <Divider/>
      <ListItem button disableGutters>
        <ListItemAvatar>
        <Avatar>
          <PersonIcon />
        </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Dさんがあなたの投稿にコメントしました:コメントです" secondary="2020/2/2" />
        <ChatBubbleIcon className={classes.comment}/>
      </ListItem>
      <Divider/>
      <ListItem button disableGutters>
        <ListItemAvatar>
        <Avatar>
          <PersonIcon />
        </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Cさんにフォローされました" secondary="2020/1/2" />
        <PersonIcon  className={classes.person}/>
      </ListItem>
    </List>
  );
}
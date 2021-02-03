import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import UserModel from '../../models/UserModel';
import FollowButton from './FollowButton';
import { Divider } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    demo: {
      backgroundColor: theme.palette.background.paper,
      marginTop: "3rem",
    },
    title: {
      margin: theme.spacing(4, 0, 2),
    },
    topLink: {
      textDecoration: 'none',
      color: 'black',
    },
  }),
);

interface Props {
  postUser: UserModel;
  currentUser: UserModel;
  otherUser: UserModel | null
  createRelationships: (user_id: number, follow_id: number) => {}
  destroyRelationships: (user_id: number, follow_id: number) => {}
}

export default function UserBar(props: Props) {
  const classes = useStyles();

  return (
    <div className={classes.demo}>
      <Divider/>
      <List>
        <ListItem>
          <ListItemAvatar>
          <Avatar alt={props.postUser.name} src={props.postUser.image_url} />
          </ListItemAvatar>
          <ListItemText
            primary={
              <Link to={`/mypages/${props.postUser.uid}`} className={classes.topLink}>
                {props.postUser.name}
              </Link>
            }
          />
          <ListItemSecondaryAction>
            <FollowButton
              postUser={props.postUser}
              currentUser={props.currentUser}
              otherUser={props.otherUser}
              createRelationships={props.createRelationships}
              destroyRelationships={props.destroyRelationships}
            />
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    </div>
  );
}
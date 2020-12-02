import React, { useContext } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ProfileUserModal from './ProfileImageModal';
import UserModel from '../../models/UserModel';
import { AuthContext } from '../../Auth'


interface Props {
  post: UserModel;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    avatar: {
      width: theme.spacing(15),
      height: theme.spacing(15),
    },
    userName:{
      paddingLeft: theme.spacing(3),
      fontSize: "1.5rem",
      fontWeight: "bold",
    },
    paddingNone: {
      padding: 0
    },
    avaterWrapper: {
     position: 'relative',
    },
    cameraIcon: {
      position: 'absolute',
      bottom: '-5px',
      right: '-5px', 
    }
  }),
);

export default function UserMain(props: any) {
  const classes = useStyles();
  const { currentUser } = useContext(AuthContext)

  return (
    <List>
      <ListItem  className={classes.paddingNone}>
        <div className={classes.avaterWrapper}>
          <ListItemAvatar>
            <Avatar alt={props.user.name} src="/static/images/avatar/1.jpg"  className={classes.avatar}/>
          </ListItemAvatar>
          {currentUser && currentUser.uid === props.user.uid &&
            <div className={classes.cameraIcon}>
              <ProfileUserModal
                user={currentUser}
              />
            </div>
          }
        </div>
        <ListItemText primary={
        <React.Fragment>
        <Box
          fontSize="h6.fontSize"
          fontWeight="fontWeightBold"
          ml={2}
        >
        {props.user.name}
        </Box>
      </React.Fragment>
        }/>
      </ListItem>
    </List>
  );
}
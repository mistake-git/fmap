import React, { Fragment } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ProfileUserModal from './ProfileImageModal';
import UserModel from '../../models/UserModel';
import NameEditModal from './NameEditModal';
import { User } from 'firebase';
import { ListItemIcon } from '@material-ui/core';
import RoomIcon from '@material-ui/icons/Room';
import LocationEditModal from './LocationEditModal';
import UserFormModel from '../../forms/UserFormModel';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    avatar: {
      width: theme.spacing(15),
      height: theme.spacing(15),
    },
    userName:{
      fontSize: "1.5rem",
      fontWeight: "bold",
    },
    avaterWrapper: {
     position: 'relative',
    },
    cameraIcon: {
      position: 'absolute',
      bottom: '-5px',
      right: '-5px', 
    },
  }),
);

interface Props{
  user: UserModel
  handleFlash: (message: string, severity: 'success'|'error') => void
  updateProfileImage: (image: File) => {}
  destroyProfileImage: () => void
  firebaseAuthUser: User | null | undefined
  updateUser: (user: UserFormModel) => void
}

export default function UserMain(props: Props) {
  const classes = useStyles();

  return (
    <List disablePadding={true}>
      <ListItem disableGutters>
        <ListItemIcon>
          <RoomIcon/>
        </ListItemIcon>
        <ListItemText primary={
          props.user.address ? props.user.address: "未設定"
        } />
        {props.firebaseAuthUser && props.user.uid === props.firebaseAuthUser?.uid &&
          <LocationEditModal
            user={props.user}
            updateUser={props.updateUser}
            handleFlash={props.handleFlash}
          />
        }
      </ListItem>
      <ListItem disableGutters>
        <div className={classes.avaterWrapper}>
          <ListItemAvatar>
            <Avatar alt={props.user.name} src={props.user.image_url}  className={classes.avatar}/>
          </ListItemAvatar>
          {props.firebaseAuthUser && props.firebaseAuthUser.uid === props.user.uid &&
            <div className={classes.cameraIcon}>
              <ProfileUserModal
                user={props.firebaseAuthUser}
                updateProfileImage={props.updateProfileImage}
                destroyProfileImage={props.destroyProfileImage}
              />
            </div>
          }
        </div>
        <ListItemText primary={
        <Fragment>
          <Box
            fontSize="h6.fontSize"
            fontWeight="fontWeightBold"
            ml={2}
          >
          {props.user.name}
          </Box>
        </Fragment>
        } 
        />
        {props.firebaseAuthUser && props.user.uid === props.firebaseAuthUser?.uid &&
          <NameEditModal
            user={props.user}
            updateUser={props.updateUser}
            handleFlash={props.handleFlash}
          />
        }
      </ListItem>
    </List>
  );
}
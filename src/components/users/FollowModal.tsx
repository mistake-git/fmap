import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Box, Divider, List, ListItem, ListItemAvatar, ListItemText, makeStyles } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import UserModel from '../../models/UserModel';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: 'none',
    color: '#000000',
  },
  avatar: {
    width: theme.spacing(5),
    height: theme.spacing(5),
  },
  modalContent:{
    overflowX: 'auto',
    maxHeight: '300px'
  }
}));

interface Props{
  title: string
  modalTitle: string
  users: UserModel[] | null
  noText: string
}

export default function FollowModal(props: Props) {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleClickOpen}>
        {props.title}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
       <DialogTitle id="alert-dialog-title">{props.modalTitle}</DialogTitle>
       <Divider/>
        <List className={classes.modalContent}>
          {
            props.users && props.users.length ? props.users.map((user) => {
              return(
                <Link to={`/mypages/${user.uid}`} onClick={handleClose} className={classes.link} key={user.id}>
                  <ListItem>
                  <ListItemAvatar>
                    <Avatar alt={user.name} src={user.image_url}  className={classes.avatar}/>
                  </ListItemAvatar>
                  <ListItemText primary={user.name} />
                  </ListItem>
                </Link>
              )
            })
            :<Box textAlign="center"　my={5}>{props.noText}</Box>
          }
        </List>
        <Divider/>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            閉じる
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
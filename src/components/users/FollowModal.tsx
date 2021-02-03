import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Avatar, List, ListItem, ListItemAvatar, ListItemText, makeStyles } from '@material-ui/core';
import UserModel from '../../models/UserModel';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  link: {
    textDecoration: 'none',
    color: '#000000',
  },
}));

interface Props{
  title: string
  modalTitle: string
  users: UserModel[] | null
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
        <List>
          {
            props.users? props.users.map((user) => {
              return(
                <Link to={`/mypages/${user.uid}`} onClick={handleClose} className={classes.link}>
                  <ListItem key={user.id}>
                    <ListItemAvatar>
                      <Avatar alt={user.name} src={user.image_url}/>
                    </ListItemAvatar>
                    <ListItemText primary={user.name} />
                  </ListItem>
                </Link>
              )
            }):<div>ユーザーがいません</div>
          }
        </List>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            閉じる
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
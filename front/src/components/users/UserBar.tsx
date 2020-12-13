import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import { Button, Divider } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    demo: {
      backgroundColor: theme.palette.background.paper,
      marginTop: "3rem",
    },
    title: {
      margin: theme.spacing(4, 0, 2),
    },
  }),
);

export default function UserBar(props: any) {
  const classes = useStyles();

  return (
    <div className={classes.demo}>
      <Divider/>
      <List>
        <ListItem>
          <ListItemAvatar>
          <Avatar alt={props.user.name} src={props.user.image_url} />
          </ListItemAvatar>
          <ListItemText
            primary={props.user.name}
          />
          <ListItemSecondaryAction>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              startIcon={<AddIcon />}
            >
              フォロー
            </Button>
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    </div>
  );
}
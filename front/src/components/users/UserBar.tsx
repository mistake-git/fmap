import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import { Button, Divider } from '@material-ui/core';
import { AddIcCallOutlined } from '@material-ui/icons';
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


export default function UserBar() {
  const classes = useStyles();
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);

  return (
    <div className={classes.demo}>
      <Divider/>
      <List dense={dense}>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <FolderIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="Single-line item"
              secondary={secondary ? 'Secondary text' : null}
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
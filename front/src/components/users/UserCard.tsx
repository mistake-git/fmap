import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import { red } from '@material-ui/core/colors';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ImageIcon from '@material-ui/icons/Image';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 345,
    },
    avatar: {
      width: theme.spacing(10),
      height: theme.spacing(10),
    },
    userName:{
      paddingLeft: theme.spacing(3),
    }
  }),
);


export default function UserCard() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root} style={{ border: "none", boxShadow: "none" }}>
      <List>
        <ListItem>
          <ListItemAvatar>
            <Avatar className={classes.avatar}>
              <ImageIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="ユーザーネーム" className={classes.userName} />
        </ListItem>
        <ListItem>
          釣果 3
        </ListItem>
        <ListItem>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          startIcon={<AddIcon />}
        >
          フォロー
        </Button>
        </ListItem>
      </List>
    </Card>
  );
}
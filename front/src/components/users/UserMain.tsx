import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ImageIcon from '@material-ui/icons/Image';

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
    paddingNone:{
      padding: 0
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
    <List>
      <ListItem  className={classes.paddingNone}>
        <ListItemAvatar>
          <Avatar className={classes.avatar}>
            <ImageIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={
        <React.Fragment>
        <Box
          fontSize="h6.fontSize"
          fontWeight="fontWeightBold"
          ml={2}
        >
          ユーザーネーム
        </Box>
      </React.Fragment>
        }/>
      </ListItem>
    </List>
  );
}
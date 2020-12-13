import React ,{Fragment} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import UserModel from '../../models/UserModel';
import { Avatar, Box} from '@material-ui/core';
import { createStyles, Theme } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    avater: {
      width: theme.spacing(8),
      height: theme.spacing(8),
      margin: 'auto'
    },
    topLink: {
      textDecoration: 'none',
      color: 'black',
    },
    introduction: {
      width: '75%',
      margin: 'auto'

    },
    userName:{
      textAlign: 'center'
    },
    userPosts:{
      color: '#3f51b5;',
      textAlign: 'center',
    }
  }),
);

interface Props {
	user: UserModel;
}

export default function PostCard(props: any) {
  const classes = useStyles();
	return (
    <Fragment>
      <Link to={`/mypages/${props.user.uid}`} className={classes.topLink}>
        <Avatar alt={props.user.name} src={props.user.image_url} className={classes.avater} />
        <Box fontWeight="bold" className={classes.userName} my={1}>
          {props.user.name}
        </Box>
        <Box fontWeight="bold" className={classes.userPosts}>
          釣果 {props.user.posts.length}
        </Box>
        <Box className={classes.introduction}>
          {props. user.introduction &&
            props.user.introduction
          }
        </Box>
      </Link>
    </Fragment>  
	);
}


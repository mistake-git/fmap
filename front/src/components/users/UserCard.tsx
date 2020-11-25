import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import UserModel from '../../models/UserModel';
import { Avatar, Box } from '@material-ui/core';
import { createStyles, Theme } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    avater: {
      width: theme.spacing(8),
      height: theme.spacing(8),
    },
    topLink: {
      textDecoration: 'none',
      color: 'black'
    },
    introduction: {
      width: '100%'
    }
  }),
);

interface Props {
	user: UserModel;
}

export default function PostCard(props: any) {
  const classes = useStyles();
	return (
    <Box my={4}>
      <Box mb={1}>
        <Avatar alt={props.user.name} src="/static/images/avatar/1.jpg" className={classes.avater} />
      </Box>
      <Box fontWeight="fontWeightBold">
        <Link to={`/mypage/${props.user.uid}`} className={classes.topLink}>
          {props.user.name}
        </Link>
        
      </Box>
      <div>
        釣果 {props.user.posts.length}
      </div>
      <Box className={classes.introduction}>
        {props. user.introduction &&
          props.user.introduction
        }
      </Box>
    </Box>
	);
}
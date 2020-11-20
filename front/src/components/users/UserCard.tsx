import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
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
  }),
);

interface Props {
	user: UserModel;
}

export default function PostCard(props: any) {
  const classes = useStyles();
	return (
    <Box my={4}>
      <Box mx={5} mb={1}>
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" className={classes.avater} />
      </Box>
      <Link to={`/mypage/${props.user.uid}`} className={classes.topLink}>
        <Typography align="center">
          <Box fontWeight="fontWeightBold">
            {props.user.name}
          </Box>
        </Typography>
      </Link>
    </Box>
	);
}
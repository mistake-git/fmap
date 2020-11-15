import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import UserModel from '../../models/UserModel';
import { Avatar, Box } from '@material-ui/core';
import { createStyles, Theme } from '@material-ui/core/styles';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    avater: {
      width: theme.spacing(9),
      height: theme.spacing(9),
    },
  }),
);

interface Props {
	user: UserModel;
}

export default function PostCard(props: any) {
  const classes = useStyles();
	return (
    <div>
      <Box m={2}>
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" className={classes.avater} />
      </Box>
      <Typography align="center">
        <Box mt={1} fontWeight="fontWeightBold">
          {props.user.name}
        </Box>
      </Typography>
    </div>
	);
}
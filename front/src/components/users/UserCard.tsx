import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import VisibilityIcon from '@material-ui/icons/Visibility';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';
import { NoEncryption, PinDropSharp } from '@material-ui/icons';
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
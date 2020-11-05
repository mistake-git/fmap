import React, { Fragment, useContext, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Box from '@material-ui/core/Box';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';
import { NoEncryption } from '@material-ui/icons';

const useStyles = makeStyles({
	root: {
		maxWidth: 290,
	},
	media: {
		height: 160,
	},
	nounderline: {
		textDecoration: 'none',
	}
});

export default function PostCard() {
  const classes = useStyles();

	return (
    <Fragment>
      <Box mt={2}>
        <Fab color="secondary">
          <FavoriteIcon />
        </Fab>
      </Box>
      <Box mt={2}>
        <Fab color="primary">
          <EditIcon/>
        </Fab>
      </Box>
      <Box mt={2}>
        <Fab>
          <DeleteIcon/>
        </Fab>
      </Box>
    </Fragment>
	);
}
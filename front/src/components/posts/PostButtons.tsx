import React, { Fragment, useContext, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Box from '@material-ui/core/Box';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Link } from 'react-router-dom';
import PostModel from "../../models/PostModel";

const useStyles = makeStyles({
	root: {
		maxWidth: 290,
	},
	media: {
		height: 160,
	},
	nounderline: {
		textDecoration: 'none',
  },
  positionTop: {
    position: 'sticky',
    top: 20,
  }
});

interface Props {
  post: PostModel
}

export default function PostCard(props: any) {
  const classes = useStyles();


  const handleDeleate = () => {
    props.deletePost(props.post.id)
  } 

	return (
    <Fragment>
      <div className={classes.positionTop}>
        <Box mt={2}>
          <Fab color="secondary">
            <FavoriteIcon />
          </Fab>
        </Box>
        <Box mt={2}>
          <Link to={`/posts/${props.post.id}/edit`}>
            <Fab color="primary">
              <EditIcon/>
            </Fab>
          </Link>
        </Box>
        <Box mt={2}>
          <Fab onClick={handleDeleate}>
            <DeleteIcon/>
          </Fab>
        </Box>
      </div>
    </Fragment>
	);
}
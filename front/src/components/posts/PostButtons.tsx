import React, { Fragment, useContext} from "react";
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Box from '@material-ui/core/Box';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Link } from 'react-router-dom';
import PostModel from "../../models/PostModel";
import { AuthContext } from '../../Auth'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
    inline: {
      display: 'inline',
    },
    positionTop: {
      position: 'sticky',
      top: 20,
    },
    icon: {
      [theme.breakpoints.down('sm')]: {
        height: '35px',
        width: '35px'
      },
    }
  }),
);

interface Props {
  post: PostModel
}

export default function PostCard(props: any) {
  const classes = useStyles();
  const { currentUser } = useContext(AuthContext)


  const handleDeleate = () => {
    props.destroyPost(props.post.id)
  } 

	return (
    <Fragment>
      <Box className={classes.positionTop} display={{ xs: 'inline', sm: 'block' }}>
        <Box mt={2} mr={5} display={{ xs: 'inline', md: 'block' }}>
          <Fab color="secondary" className={classes.icon}>
            <FavoriteIcon />
          </Fab>
        </Box>
        {currentUser && currentUser.uid === props.user.uid &&
         <Fragment>
          <Box mt={2} mr={5} display={{ xs: 'inline', md: 'block' }}>
            <Link to={`/posts/${props.post.id}/edit`}>
              <Fab color="primary" className={classes.icon}>
                <EditIcon/>
              </Fab>
            </Link>
          </Box>
          <Box mt={2} mr={5} display={{ xs: 'inline', md: 'block' }}>
            <Fab onClick={handleDeleate} className={classes.icon}>
              <DeleteIcon/>
            </Fab>
          </Box>
        </Fragment>
       }
      </Box>
    </Fragment>
	);
}
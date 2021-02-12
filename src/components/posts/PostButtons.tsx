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
import Tooltip from '@material-ui/core/Tooltip';
import UserModel from "../../models/UserModel";
import LikeModel from "../../models/LikeModel";
import { Icon} from '@iconify/react';
import crownIcon from '@iconify-icons/mdi/crown';
import {
  TwitterShareButton,
} from 'react-share';
import twitterIcon from '@iconify-icons/mdi/twitter';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
    },
    rankingsIcon: {
      backgroundColor: '#1de9b6',
      [theme.breakpoints.down('sm')]: {
        height: '35px',
        width: '35px'
      },
    },
    crownIcon: {
      height: '24px',
      width: '24px'
    },
    shareIcon: {
      backgroundColor: '#00aced',
      [theme.breakpoints.down('sm')]: {
        height: '35px',
        width: '35px'
      },
    },
    twitterIcon: {
      height: '24px',
      width: '24px'
    }
  }),
);

interface Props {
  post: PostModel;
  currentUser: UserModel | null;
  like: LikeModel|null;
  postUser: UserModel;
  destroyPost: (id: number) => {};
  createLike: () => {};
  destroyLike: (id: number) => {};
}

export default function PostButtons(props: Props) {
  const classes = useStyles();
  const { firebaseAuthUser } = useContext(AuthContext)


  const handleDeleate = () => {
    props.destroyPost(props.post.id!)
  } 

  const createLike = () =>　{
    props.createLike()
  }
  
  const destroyLike = () =>　{
    props.destroyLike(props.like?.id!)
  }
  
	return (
    <Fragment>
      <Box className={classes.positionTop} display={{ xs: 'inline', sm: 'block' }}>
        <Box mt={2} mr={5} display={{ xs: 'inline', md: 'block' }}>
          <TwitterShareButton url={`https://myapp-11f4e.web.app/posts/${props.post.id}`} title={`${props.post.name}の釣果情報\n`}>
            <Tooltip title="Twitterにシェア"　placement="right">
              <Fab className={classes.shareIcon}>
              <Icon icon={twitterIcon} color="#ffffff" className={classes.twitterIcon} />
              </Fab>
            </Tooltip>
          </TwitterShareButton>
        </Box>
        <Box mt={2} mr={5} display={{ xs: 'inline', md: 'block' }}>
          <Link to={`/posts/${props.post.id}/rankings`}>
            <Tooltip title="ランキング"　placement="right">
              <Fab className={classes.rankingsIcon}>
                <Icon icon={crownIcon} className={classes.crownIcon} />
              </Fab>
            </Tooltip>
          </Link>
        </Box>
        <Box mt={2} mr={5} display={{ xs: 'inline', md: 'block' }}>
          {firebaseAuthUser && props.like ?
          <Tooltip title="いいねを削除"　placement="right">
            <Fab
              color="secondary" 
              className={classes.icon}
              onClick={destroyLike}
            >
              <FavoriteIcon />
            </Fab>
          </Tooltip>:
          <Tooltip title="いいね"　placement="right">
          <Fab
            color="default" 
            className={classes.icon}
            onClick={createLike}
          >
            <FavoriteIcon />
          </Fab>
        </Tooltip>
          }
        </Box>
        {firebaseAuthUser && firebaseAuthUser.uid === props.postUser.uid &&
         <Fragment>
          <Box mt={2} mr={5} display={{ xs: 'inline', md: 'block' }}>
            <Link to={`/posts/${props.post.id}/edit`}>
              <Tooltip title="投稿を編集"　placement="right">
                <Fab color="primary" className={classes.icon}>
                  <EditIcon/>
                </Fab>
              </Tooltip>
            </Link>
          </Box>
          <Box mt={2} mr={5} display={{ xs: 'inline', md: 'block' }}>
            <Tooltip title="投稿を削除"　placement="right">
              <Fab onClick={handleDeleate} className={classes.icon}>
                <DeleteIcon/>
              </Fab>
            </Tooltip>
          </Box>
        </Fragment>
       }
      </Box>
    </Fragment>
	);
}



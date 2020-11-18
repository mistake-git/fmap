import React, { Fragment, useContext, useEffect } from "react";
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { IconButton } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Link } from 'react-router-dom';
import Popover from '@material-ui/core/Popover';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import { AccountCircle} from '@material-ui/icons';
import Button from '@material-ui/core/Button';
import auth from "../../plugins/firebase";
import axios from 'axios'



const sections = [
  { title: '地図', url: '/map' },
	{ title: '釣果一覧', url: '/posts' },
  { title: '釣り人一覧', url: '/users' },
  { title: '釣果を投稿', url: '/posts/new' },
  { title: 'ランキング', url: '/ranking' },
];

const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    backgroundColor: '#3f51b5;',
  },
  toolbarTitle: {
    flex: 1,
  },
  topLink: {
    textDecoration: 'none',
    color: 'white'
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
  typography: {
    width: 500,
  },
  toolbarSecondary: {
    justifyContent: 'space-around',
    overflowX: 'auto',
    backgroundColor: theme.palette.background.paper,
  },
  link: {
    color: 'white'
  },

  small: {
    width: theme.spacing(3.5),
    height: theme.spacing(3.5),
  },
  sticky :{
    position: 'sticky',
    top: 0,
    "z-index": 1,
  },
  popver: {
    height: 500,
  }
}));

export default function Header(props: any) {
  const classes = useStyles();
  const { title } = props;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [user, setUser] = React.useState<any>('');

  useEffect(() => {
    auth.onAuthStateChanged((user: any) => {
      axios.get(`http://localhost:3000/api/v1/users/${user?.uid}`)
      .then((results) => {
        console.log(results)
        setUser(results.data)
      })
      .catch((data) =>{
        console.log(data)
      })
    });
  }, []);


  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };


  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

return (
  <React.Fragment>
    <Toolbar className={classes.toolbar}>
      <Typography
        component="h3"
        variant="h5"
        align="left"
        noWrap
        className={classes.toolbarTitle}
      >
        <Link to="/" className={classes.topLink}> {title}</Link>
      </Typography>
      <Popover
        className={classes.popver}
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        >
        <div className={classes.sticky}>
          <Typography align="center" className={classes.typography}>
            <Box py={1}>お知らせ</Box>
            <Divider/>
          </Typography>
        </div>
        <Typography align="center">お知らせはありません</Typography>
        </Popover>
        <Link to={`/mypage/${user.id}`}>
          <IconButton
           className={classes.link}
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
          >
          <AccountCircle />
        </IconButton>
        </Link>
        
        <IconButton>
          <ExitToAppIcon
            className={classes.link}
            onClick={async event => {
              try {
                await auth.signOut();
              } catch (error) {
                alert(error.message);
              }
            }}
          />
        </IconButton>
    </Toolbar>
    <Toolbar component="nav" variant="dense" className={classes.toolbarSecondary}>
      {sections.map((section) => (
        <Button
          key={section.title}
          href={section.url}
          className={classes.toolbarLink}
          >
          {section.title}
        </Button>
      ))}
    </Toolbar>
  </React.Fragment>
  );
}
Header.propTypes = {
  sections: PropTypes.array,
  title: PropTypes.string,
};
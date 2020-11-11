import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { IconButton } from '@material-ui/core';
import NotificationsIcon from '@material-ui/icons/Notifications';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Link } from 'react-router-dom';
import Badge from '@material-ui/core/Badge';
import Popover from '@material-ui/core/Popover';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import { StayPrimaryLandscape } from '@material-ui/icons';
import Button from '@material-ui/core/Button';
import { AuthContext } from "../../Auth";
import auth from "../../firebase";
import React, { Fragment, useContext, useEffect } from "react";


const sections = [
  { title: '地図', url: '/map' },
	{ title: '釣果一覧', url: '/posts' },
  { title: '釣り人一覧', url: '/users' },
  { title: '釣果を投稿', url: '/posts_new' },
  { title: 'ランキング', url: '/ranking' },
  { title: 'マイページ', url: '/mypage/1' },
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
  exitIcon: {
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

  const [anchorEl, setAnchorEl] = React.useState(null);

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
        <IconButton className={classes.exitIcon}>
          <ExitToAppIcon
            onClick={async event => {
              try {
                await auth.signOut();
                props.history.push("/login");
              } catch (error) {
                alert(error.message);
              }
            }}
            style={{ marginTop: "0.5em", marginBottom: "0.5em" }}
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
import React from 'react';
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

const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex: 1,
  },
  topLink: {
    textDecoration: 'none',
  },
  toolbarSecondary: {
    justifyContent: 'space-around',
    overflowX: 'auto',
    backgroundColor: theme.palette.background.paper,
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
  typography: {
    width: 500,
    background: "white",
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
            component="h2"
            variant="h5"
            color="inherit"
            align="left"
            noWrap
            className={classes.toolbarTitle}
          >
          <Link to="/top" className={classes.topLink}> {title}</Link>
        </Typography>
        <Link to="/mypage">
          <IconButton>
            <AccountCircleIcon/>
          </IconButton>
        </Link>
        <Link to="/posts/new">
          <IconButton>
            <DashboardIcon/>
          </IconButton>
        </Link>
        <IconButton aria-describedby={id} onClick={handleClick}>
          <Badge badgeContent={4} color="secondary">
            <NotificationsIcon/>
          </Badge>
        </IconButton>
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
        <IconButton>
          <ExitToAppIcon/>
        </IconButton>
    </Toolbar>
  </React.Fragment>
  );
}

Header.propTypes = {
  sections: PropTypes.array,
  title: PropTypes.string,
};
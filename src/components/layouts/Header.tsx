import React, { Fragment, useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Box, Hidden, IconButton, Toolbar, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Auth';
import { CurrentUserContext } from '../../CurrentUser';
import auth from '../../plugins/firebase';
import PinDropIcon from '@material-ui/icons/PinDrop';
import CreateIcon from '@material-ui/icons/Create';
import GroupIcon from '@material-ui/icons/Group';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import { AccountCircle} from '@material-ui/icons';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import StorageIcon from '@material-ui/icons/Storage';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    minHeight: 55,
    boxShadow: '0 3px 6px rgba(0,0,0,0.04)'
  },
  toolbarTitle: {
    flex: 1,
  },
  link: {
    textDecoration: 'none',
    color: '#3f51b5;',
  },
  linkBold:{
    fontWeight: 'bold',
    color: '#3f51b5;',
  },
  logo: {
    verticalAlign: "middle",
    zIndex: 1,
  },
  fullList: {
    width: 'auto',
  },
}));

type Anchor = 'right';

export default function Header() {

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { firebaseAuthUser } = useContext(AuthContext)
  const { currentUser} = useContext(CurrentUserContext)
  const [state, setState] = useState({
    right: false,
  });

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const LogOut = async() => {
    try {
      await auth.signOut();
      setAnchorEl(null);
    } 
    catch (error) {
      console.log(error.message);
    }
  }

  const toggleDrawer = (anchor: Anchor, open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent,
  ) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const headerLinks = [
    { name: '地図', url: '/', icon: <PinDropIcon/>},
    { name: '投稿', url: '/posts/new', icon: <CreateIcon/>},
    { name: '全ての釣果', url: '/posts', icon: <StorageIcon/>},
    { name: 'ユーザー', url: '/users', icon: <GroupIcon/>},
  ];

  const headerList = (anchor: Anchor) => (
    <div
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
      <Link to={'/feed'}　className={classes.link}>
        <ListItem button>
          <ViewModuleIcon/>
          <ListItemText primary="フィード" />
        </ListItem>
      </Link>
       {headerLinks.map((header,index) => (
         <Link to={header.url}　className={classes.link} key={index}>
            <ListItem button>
              {header.icon}
              <ListItemText primary={header.name} />
            </ListItem>
          </Link>
        ))}
        <Divider/>
        <Link to={`/mypages/${currentUser?.uid}`}　className={classes.link}>
          <ListItem button>
            <AccountBoxIcon/>
            <ListItemText primary="マイページ" />
          </ListItem>
        </Link>
        <ListItem button　onClick={LogOut}　className={classes.link}>
          <ExitToAppIcon/>
          <ListItemText primary="ログアウト" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <div>
      <Drawer anchor="right" open={state['right']} onClose={toggleDrawer('right', false)} style={{width: '40%'}}>
        {headerList('right')}
      </Drawer>
      <Toolbar className={classes.toolbar}>
        <Typography
          align="left"
          noWrap
          className={classes.toolbarTitle}
        > 
          <Link to={'/'}　className={classes.link}>
            <img src="../../logo.png"　alt="サイトロゴ" className={classes.logo}/>
          </Link>
        </Typography>
        <Hidden smDown>
        {firebaseAuthUser &&
          <Link to={'/feed'}　className={classes.link}>
            <Button className={classes.linkBold}>
              <ViewModuleIcon/>
              フィード
            </Button>
          </Link>
        }
        {headerLinks.map((header,index) => 
        <Link to={header.url}　className={classes.link} key={index}>
          <Button className={classes.linkBold}>
            {header.icon}
            {header.name}
          </Button>
        </Link>
        )}
       
        {firebaseAuthUser &&
        <Fragment>
          <Button className={classes.linkBold} aria-controls="user-menu" aria-haspopup="true" onClick={handleClick}>
            <AccountCircle />
            {currentUser?.name}
          </Button>
          <Menu
            id="user-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <Link to={`/mypages/${currentUser?.uid}`} className={classes.link}>
              <MenuItem 
                onClick={handleClose}
              >
                <AccountBoxIcon className={classes.link}/>
                  マイページ
              </MenuItem>
            </Link>
            <MenuItem  
              onClick={LogOut}
            >
              <ExitToAppIcon className={classes.link}/>
              <Box className={classes.link}>
                ログアウト
              </Box>
            </MenuItem>
          </Menu>
        </Fragment>
        }
        </Hidden>
        <Hidden mdUp>
          <IconButton edge="end" onClick={toggleDrawer('right', true)}  color="inherit" aria-label="menu" className={classes.link}>
            <MenuIcon/>
          </IconButton>
        </Hidden>
      </Toolbar>
    </div>
  );
}


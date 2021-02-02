import React, { Fragment,  useContext,  } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Box } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import auth from "../../plugins/firebase";
import PinDropIcon from '@material-ui/icons/PinDrop';
import CreateIcon from '@material-ui/icons/Create';
import GroupIcon from '@material-ui/icons/Group';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import { AccountCircle} from '@material-ui/icons';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import { AuthContext } from '../../Auth'
import { CurrentUserContext } from "../../CurrentUser";

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
  }
}));

export default function Header() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { firebaseAuthUser } = useContext(AuthContext)
  const { currentUser} = useContext(CurrentUserContext)

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

return (
  <Fragment>
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
      <Link to={'/posts/new'}　className={classes.link}>
        <Button className={classes.linkBold}>
          <CreateIcon/>
          <Box>投稿</Box>
        </Button>
      </Link>
      <Link to={'/'}　className={classes.link}>
      　<Button className={classes.linkBold}>
          <PinDropIcon/>
          <Box>地図</Box>
        </Button>
      </Link>
      <Link to={'/posts'}　className={classes.link}>
      　<Button className={classes.linkBold}>
          <ViewModuleIcon/>
          <Box>釣果</Box>
        </Button>
      </Link>
      <Link to={'/users'}　className={classes.link}>
      　<Button className={classes.linkBold}>
          <GroupIcon/>
          <Box>ユーザー</Box>
        </Button>
      </Link>
      {firebaseAuthUser &&
      <Fragment>
        <Button className={classes.linkBold} aria-controls="user-menu" aria-haspopup="true" onClick={handleClick}>
          <AccountCircle />
          <Box>{currentUser?.name}</Box>
        </Button>
        <Menu
          id="user-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem 
            onClick={handleClose}
          >
            <AccountBoxIcon className={classes.link}/>
            <Link to={`/mypages/${currentUser?.uid}`} className={classes.link}>
              マイページ
            </Link>
          </MenuItem>
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
    </Toolbar>
  </Fragment>
  );
}


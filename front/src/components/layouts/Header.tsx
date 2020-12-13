import React, { useEffect, Fragment, useState } from "react";
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Box } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Link } from 'react-router-dom';
import { AccountCircle} from '@material-ui/icons';
import Button from '@material-ui/core/Button';
import auth from "../../plugins/firebase";
import PinDropIcon from '@material-ui/icons/PinDrop';
import CreateIcon from '@material-ui/icons/Create';
import GroupIcon from '@material-ui/icons/Group';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import { myHttpClient } from "../../plugins/axios";

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
  },
  typography: {
    width: 500,
  },
  linkColor:{
    color: '#3f51b5;',
    fontWeight: 'bold'
  },
  logo: {
    verticalAlign: "middle",
    zIndex: 1,
  }
}));

export default function Header(props: any) {
  const classes = useStyles();
  const [user, setUser] = useState<any>('');

  useEffect(() => {
    auth.onAuthStateChanged((user: any) => {
      myHttpClient.get(`/users/${user?.uid}`)
      .then((results) => {
        console.log(results)
        setUser(results.data)
      })
      .catch((data) =>{
        console.log(data.user)
      })
    });
  }, []);

return (
  <Fragment>
    <Toolbar className={classes.toolbar}>
      <Typography
        align="left"
        noWrap
        className={classes.toolbarTitle}
      > 
      <Link to={'/'}　className={classes.link}>
        <img src="../../logo.png" className={classes.logo}/>
      </Link>
      </Typography>
      <Link to={'/'}　className={classes.link}>
      　<Button className={classes.linkColor}>
          <PinDropIcon/>
          <Box>地図でみる</Box>
        </Button>
      </Link>
      <Link to={'/posts'}　className={classes.link}>
      　<Button className={classes.linkColor}>
          <ViewModuleIcon/><Box>釣果一覧</Box>
        </Button>
      </Link>
      <Link to={'/posts/new'}　className={classes.link}>
        <Button className={classes.linkColor}>
          <CreateIcon/><Box>投稿する</Box>
        </Button>
      </Link>
      <Link to={'/users'}　className={classes.link}>
        <Button className={classes.linkColor}>
          <GroupIcon/><Box>ユーザー一覧</Box>
        </Button>
      </Link>
      <Link to={`/mypages/${user.uid}`} className={classes.link}>
      　<Button className={classes.linkColor}>
          <AccountCircle /><Box>マイページ</Box>
        </Button>
      </Link>
      <Button className={classes.linkColor}
        onClick={async event => {
          try {
          await auth.signOut();
          } 
          catch (error) {
            alert(error.message);
          }
        }}
      >
        <ExitToAppIcon className={classes.link}/>
        <Box display={{ xs: 'none', md: 'inline' }}>ログアウト</Box>
      </Button>
    </Toolbar>
  </Fragment>
  );
}
Header.propTypes = {
  sections: PropTypes.array,
  title: PropTypes.string,
};
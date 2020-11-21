import React, { Fragment, useContext, useEffect } from "react";
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { IconButton } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Link } from 'react-router-dom';
import { AccountCircle} from '@material-ui/icons';
import Button from '@material-ui/core/Button';
import auth from "../../plugins/firebase";
import axios from 'axios'
import PinDropIcon from '@material-ui/icons/PinDrop';
import CreateIcon from '@material-ui/icons/Create';
import GroupIcon from '@material-ui/icons/Group';
import ViewModuleIcon from '@material-ui/icons/ViewModule';


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
  typography: {
    width: 500,
  },
  link: {
    color: 'white'
  },
}));

export default function Header(props: any) {
  const classes = useStyles();
  const { title } = props;
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
      <Link to={'/'}>
        <IconButton
          className={classes.link}
        >
          <PinDropIcon/>
        </IconButton>
      </Link>
      <Link to={'/posts'}>
        <IconButton
          className={classes.link}
        >
          <ViewModuleIcon/>
        </IconButton>
      </Link>
      <Link to={'/posts/new'}>
        <IconButton
          className={classes.link}
        >
          <CreateIcon/>
        </IconButton>
      </Link>
      <Link to={'/users'}>
        <IconButton
          className={classes.link}
        >
          <GroupIcon/>
        </IconButton>
      </Link>
      <Link to={`/mypage/${user.uid}`}>
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
  </React.Fragment>
  );
}
Header.propTypes = {
  sections: PropTypes.array,
  title: PropTypes.string,
};
import React, { Fragment, useContext, useEffect } from "react";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import SignInForm from '../components/auth/SignInForm';
import AuthTemplate from '../components/layouts/AuthTemplate';
import { AuthContext } from "../Auth";
import SignUpForm from '../components/auth/SignUpForm';


export default function SiginIn(props: any) {

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    // if logged in, redirect to home
    currentUser && props.history.push("/");
  }, [currentUser]);

  return (
    <AuthTemplate　title="ログイン">
       <SignInForm/>
    </AuthTemplate>
  );
}
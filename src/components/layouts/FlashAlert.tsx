import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { useDispatch, useSelector } from "react-redux";
import { updateOpen } from '../../actions/Flash';
import { AppState } from '../../store';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function FlashAlert() {
  const dispatch = useDispatch()
  const classes = useStyles();
  const severity = useSelector((state: AppState)=> state.flash.severity);
  const message = useSelector((state: AppState)=> state.flash.message);
  const open = useSelector((state: AppState)=> state.flash.isOpen);

  const flashMessageClose = () =>{
    dispatch(updateOpen(false))
  }

  return (
    <div className={classes.root}>
      <Snackbar open={open} autoHideDuration={6000} onClose={flashMessageClose}>
        <Alert onClose={flashMessageClose} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
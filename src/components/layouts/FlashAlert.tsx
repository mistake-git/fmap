import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { useDispatch, useSelector } from "react-redux";
import { displayFlash } from '../../actions/Flash';

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

interface Props {
  handleClose: () => void
  severity: undefined | 'success' | 'error' | 'info'
  message: string
}

export default function FlashAlert(props: Props) {
  const dispatch = useDispatch()
  const classes = useStyles();
  const severity = useSelector((flash: any) => flash.severity);
  const message = useSelector((flash: any) => flash.message);
  const open = useSelector((flash: any) => flash.open);

  const flashMessageClose = () =>{
    dispatch(displayFlash(false))
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
import React from 'react';
import Alert from '@material-ui/lab/Alert';


export default function FlashAlert(props: any) {

  return (
    <React.Fragment>
      <Alert severity="success">{props.message}</Alert>
    </React.Fragment>
  );
}
import React, {
  useState
} from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Typography,
} from "@material-ui/core";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { TextField } from "formik-material-ui";


const UserSchema = Yup.object().shape({
});


const useStyles = makeStyles({
  input: {
    display: 'none',
  },
  imageWrapper: {
    position: 'relative',
  },
  cancelButton: {
    position: 'absolute',
    top: '-5px',
    right: '-5px',
    cursor: 'pointer',
  }
});


export default function NameEditModal(props: any) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const values ={
    name: props.user.name,
  }
  
  return (
    <div>
       <Button  onClick={handleClickOpen}>
        <Typography 
            color='textSecondary'
            variant='caption'
          > 
            名前を編集
          </Typography>
       </Button>
      <Dialog
        fullWidth
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">名前を編集</DialogTitle>
         <Formik
        　 enableReinitialize={true}
          initialValues={values}
          validationSchema={UserSchema}
          onSubmit={async value => {
            try {
              const user ={
                name: value.name
              }
            await
              props.updateUser(user)
              const message = '名前を編集しました'
              const severity = 'success'
              props.handleFlash(message,severity)
              handleClose();              
            } 
            catch (error) {
              alert(error.message);
              const message = '名前の編集に失敗しました'
              const severity = 'success'
              props.handleFlash(message,severity)          
            }
          }}
          render={({ submitForm, setFieldValue, isSubmitting, isValid,}) => (
          <Form>
            <DialogContent>
              <Field
                style={{ marginTop: "0.5em", marginBottom: "0.5em" }}
                name='name'
                label='名前'
                type='text'
                fullWidth
                variant="outlined"
                component={TextField}
              />
            </DialogContent>
            <DialogActions>
              <Button variant="contained"　onClick={handleClose}>
                キャンセル
              </Button>
              <Button 
                variant="contained" 
                color="primary" 
                autoFocus　
                onClick={submitForm}
                disabled={!isValid || isSubmitting}　
              >
                更新
              </Button>
            </DialogActions>
          </Form>
          )}
        />
      </Dialog>
    </div>
  );
}
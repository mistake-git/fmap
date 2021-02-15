import React, {
  useState
} from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {
  Button,
  Typography,
} from "@material-ui/core";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { TextField } from "formik-material-ui";
import UserModel from '../../models/UserModel';
import UserFormModel from '../../forms/UserFormModel';

const UserSchema = Yup.object().shape({
});

interface Props{
  handleFlash: (message: string, severity: 'success'|'error') => void
  user: UserModel
  updateUser: (user: UserFormModel) => void
}

export default function LocationEditModal(props: Props) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const values ={
    address: props.user.address,
  }
  return (
    <div>
       <Button  onClick={handleClickOpen}>
        <Typography 
            color='textSecondary'
            variant='caption'
          > 
             編集
          </Typography>
       </Button>
      <Dialog
        fullWidth
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">活動エリアを編集</DialogTitle>
         <Formik
        　 enableReinitialize={true}
          initialValues={values}
          validationSchema={UserSchema}
          onSubmit={async value => {
            try {
              const user ={
                address: value.address
              }
              props.updateUser(user)
              const message = '活動エリアを編集しました'
              const severity = 'success'
              props.handleFlash(message,severity)
              handleClose();              
            } 
            catch (error) {
              console.log(error.message);
              const message = '活動エリアの編集に失敗しました'
              const severity = 'success'
              props.handleFlash(message,severity)          
            }
          }}>
          {({ submitForm, setFieldValue, isSubmitting, isValid,}) => (
          <Form>
            <DialogContent>
              <Field
                style={{ marginTop: "0.5em", marginBottom: "0.5em" }}
                name='address'
                label='活動エリア'
                placeholder="例　東京都"
                type='text'
                fullWidth
                variant="outlined"
                size="small"
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
        </Formik>
      </Dialog>
    </div>
  );
}
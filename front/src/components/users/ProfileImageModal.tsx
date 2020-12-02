import React, {
  ChangeEvent,
  createRef,
} from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import AttachmentIcon from '@material-ui/icons/Attachment';
import {
  Button,
  Grid,
} from "@material-ui/core";
import CancelIcon from '@material-ui/icons/Cancel';
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import axios from 'axios'


export const UserSchema = Yup.object().shape({
  image: Yup.string()
    .required('画像を選択してください'),
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


export default function ProfileUserModal(props: any) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const classes = useStyles();

  const handleClose = () => {
    setOpen(false);
  };
  const [src, setSrc] = React.useState('')

  const ref = createRef<HTMLInputElement>()
  const [image, setImage] = React.useState<File | null>(null)

  const onClick = () => {
    if (ref.current) {
      ref.current.click()
    }
  }

  const values ={
    image: '',
  }
  
  const onChange = (event: ChangeEvent<HTMLInputElement>, setFieldValue: any) => {
    if (event.target.files === null) {
      return
    }
    const file = event.target.files.item(0)

    setImage(file)

    if (file === null) {
      return
    }
    var reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      setSrc(reader.result as string)
    }
    setFieldValue("image",reader.result as string)
  }

  const clear = () => {
    setSrc('');
  };

  return (
    <div>
      <IconButton onClick={handleClickOpen}>
        <CameraAltIcon/>
      </IconButton>
      <Dialog
        fullWidth
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">プロフィールイメージを編集</DialogTitle>
        {src &&
          <React.Fragment>
            <Grid container spacing={3}>
              <Grid item xs={2}></Grid>
              <Grid item xs={8}>
                <div className={classes.imageWrapper} >
                  <CancelIcon
                    color="primary"
                    onClick={clear}
                    className={classes.cancelButton}
                  />
                  <img src={src} style={{width: '100%'}}/>
                </div>
              </Grid>
              <Grid item xs={2}></Grid>
            </Grid>
          </React.Fragment> 
        }
         <Formik
        　 enableReinitialize={true}
          initialValues={values}
          validationSchema={UserSchema}
          onSubmit={async value => {
            const user ={
              image: image,
            }
            try {
            await
              axios.patch(`http://localhost:3000/api/v1/users/${props.match.params.id}`,{user: user} ) 
              handleClose();
            } 
            catch (error) {
              alert(error.message);
            }
          }}
          render={({ submitForm, setFieldValue}) => (
          <Form>
            <DialogContent>
              <Field 
                name="image"
                accept="image" 
                className={classes.input} 
                multiple={false}
                id="icon-button-file" 
                type="file"
                onChange={(event: ChangeEvent<HTMLInputElement>) => onChange(event,setFieldValue)}
                onClick={onClick}
              />
              <label htmlFor="icon-button-file">
                <IconButton color="primary" aria-label="upload picture" component="span">
                  <AttachmentIcon />
                </IconButton>
                ファイルを選択
              </label>
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

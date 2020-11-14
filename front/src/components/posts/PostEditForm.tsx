import React, { Fragment, useContext, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import * as Yup from "yup";
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-material-ui";
import axios from 'axios'
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import AttachmentIcon from '@material-ui/icons/Attachment';
import {
  Button,
  Container,
  FormControl,
  Grid,
  Link,
  Typography,
  LinearProgress
} from "@material-ui/core";
import PostDateTimePicker from './PostDateTimePicker'


export const PostSchema = Yup.object().shape({
  name: Yup.string()
    .required('魚種を入力してください'),
});

const useStyles = makeStyles({
  root: {
    minWidth: 150,
  },
  input: {
    display: 'none',
  },
});

interface State {
	image?: string;
}

export default function EditForm(props: any) {
  const classes = useStyles();

  const [image, setImage] = React.useState<string>("");
  

  const fileChange =(e: any) => {
    setImage(URL.createObjectURL(e.target.image[0]));
  }

  const initialValues={
    image: "",
    name: props.post.name, 
    size: props.post.size ,
    weight: props.post.weight,
    number: props.post.number,
    feed: props.post.feed,
    memo: props.post.memo,
    date: props.post.date,
    time: props.post.time,
    status: props.post.status,
  };


	return (
		<React.Fragment>
			<Card className={classes.root}>
        <CardContent>  
          <img src={image}/>
          <Formik
            initialValues={initialValues}
            validationSchema={PostSchema}
            onSubmit={async value => {
              try {
                const editPost ={
                  name: value.name, 
                  size: value.size ,
                  weight: value.weight,
                  number: value.number,
                  feed: value.feed,
                  memo: value.memo,
                  date: value.date,
                  time: value.time,                
                  status: value.status,
                }
                await
                axios.post(`http://localhost:3000/api/v1/posts/${props.post.id}/update`,{post: editPost} );
                props.history.push(`/posts/${props.post.id}`);
              } catch (error) {
                alert(error.message);
              }
            }}
            render={({ submitForm, isSubmitting, isValid }) => (
              <Form>
                <Grid container className={classes.root} spacing={2}>
                {isSubmitting && <LinearProgress />}
                  <Grid item xs={12}>
                    <input accept="image" className={classes.input} id="icon-button-file" type="file" onChange={fileChange}/>
                    <label htmlFor="icon-button-file">
                      <IconButton color="primary" aria-label="upload picture" component="span">
                        <AttachmentIcon />
                      </IconButton>
                    </label>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Field
                      required
                      style={{ marginTop: "0.5em", marginBottom: "0.5em" }}
                      name="name"
                      label="魚種"
                      fullWidth
                      variant="outlined"
                      type="text"
                      component={TextField}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Field
                      style={{ marginTop: "0.5em", marginBottom: "0.5em" }}
                      name="size"
                      label="サイズ"
                      fullWidth
                      variant="outlined"
                      type="number"
                      component={TextField}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Field
                      style={{ marginTop: "0.5em", marginBottom: "0.5em" }}
                      name="weight"
                      label="重さ"
                      fullWidth
                      variant="outlined"
                      type="number"
                      component={TextField}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Field
                      style={{ marginTop: "0.5em", marginBottom: "0.5em" }}
                      name="number"
                      label="数量"
                      fullWidth
                      variant="outlined"
                      type="number"
                      component={TextField}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Field
                      style={{ marginTop: "0.5em", marginBottom: "0.5em" }}
                      name="feed"
                      label="餌"
                      fullWidth
                      variant="outlined"
                      type="text"
                      component={TextField}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Field
                      style={{ marginTop: "0.5em", marginBottom: "0.5em" }}
                      name="weather"
                      label="天気"
                      fullWidth
                      variant="outlined"
                      type="text"
                      component={TextField}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <PostDateTimePicker/>
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      fullWidth
                      style={{ marginTop: "0.5em", marginBottom: "0.5em" }}
                      name="memo"
                      label="メモ"
                      variant="outlined"
                      multiline={true}
                      rows={4}
                      type="text"
                      component={TextField}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      onClick={submitForm}
                      style={{ marginTop: "0.5em", marginBottom: "0.5em" }}
                      type="submit"
                      disabled={!isValid || isSubmitting}
                    >
                      釣果を編集
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            )}
          />
        </CardContent>   
			</Card>
		</React.Fragment>
	);
}
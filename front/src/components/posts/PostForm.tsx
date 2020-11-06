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
import {
  Button,
  Container,
  FormControl,
  Grid,
  Link,
  Typography,
  LinearProgress
} from "@material-ui/core";


export const PostSchema = Yup.object().shape({
  name: Yup.string()
    .required(),
});


const useStyles = makeStyles({
  root: {
    minWidth: 150,
  },
});

export default function PostsForm(props: any) {
  const classes = useStyles();

  const [state, setState] = React.useState({
    private: true,
    public: true,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
	return (
		<React.Fragment>
			<Card className={classes.root}>
        <CardContent>        
          <Formik
            initialValues={{ 
              name: "", 
              size: "" ,
              weight: "",
              number: "",
              feed: "",
              memo: "",
              status: "",
            }}
            validationSchema={PostSchema}
            onSubmit={async value => {
              try {
                await axios.post('http://localhost:3000/posts' )
                .then(() => {
                  props.history.push("/posts");
                })
              } catch (error) {
                alert(error.message);
              }
            }}
            render={({ submitForm, isSubmitting, isValid }) => (
              <Form>
                {isSubmitting && <LinearProgress />}
                <FormControl margin="normal" fullWidth>
                  <Field
                    required
                    style={{ marginTop: "0.5em", marginBottom: "0.5em" }}
                    name="name"
                    label="魚種"
                    fullWidth
                    variant="outlined"
                    component={TextField}
                  />
                </FormControl>
                <FormControl fullWidth>
                  <Field
                    style={{ marginTop: "0.5em", marginBottom: "0.5em" }}
                    name="size"
                    label="サイズ"
                    fullWidth
                    variant="outlined"
                    type="number"
                    component={TextField}
                  />
                </FormControl>
                <FormControl fullWidth>
                  <Field
                    style={{ marginTop: "0.5em", marginBottom: "0.5em" }}
                    name="weight"
                    label="重さ"
                    fullWidth
                    variant="outlined"
                    type="number"
                    component={TextField}
                  />
                </FormControl>
                <FormControl fullWidth>
                  <Field
                    style={{ marginTop: "0.5em", marginBottom: "0.5em" }}
                    name="number"
                    label="数量"
                    fullWidth
                    variant="outlined"
                    type="number"
                    component={TextField}
                  />
                </FormControl>
                <FormControl fullWidth>
                  <Field
                    style={{ marginTop: "0.5em", marginBottom: "0.5em" }}
                    name="feed"
                    label="餌"
                    fullWidth
                    variant="outlined"
                    type="text"
                    component={TextField}
                  />
                </FormControl>
                <FormControl fullWidth>
                  <Field
                    style={{ marginTop: "0.5em", marginBottom: "0.5em" }}
                    name="weather"
                    label="天気"
                    fullWidth
                    variant="outlined"
                    type="text"
                    component={TextField}
                  />
                </FormControl>
                
                <FormControl fullWidth>
                  <Field
                    style={{ marginTop: "0.5em", marginBottom: "0.5em" }}
                    name="memo"
                    label="メモ"
                    fullWidth
                    variant="outlined"
                    type="text"
                    component={TextField}
                  />
                </FormControl>
                <FormControl fullWidth>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={state.public}
                        onChange={handleChange}
                        name="public"
                        color="primary"
                      />
                    }
                    label="公開する"
                  />
                </FormControl>
                <FormControl fullWidth>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={submitForm}
                    style={{ marginTop: "0.5em", marginBottom: "0.5em" }}
                    type="submit"
                    disabled={!isValid || isSubmitting}
                  >
                    釣果を登録
                  </Button>
                </FormControl>
              </Form>
            )}
          />
        </CardContent>
			</Card>
		</React.Fragment>
	);
}
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


const useStyles = makeStyles({
  root: {
    minWidth: 150,
  },
  input: {
    display: 'none',
  },
});


export const CommentSchema = Yup.object().shape({
  content: Yup.string()
    .required(),
});

export default function LayoutTextFields() {

  const classes = useStyles();
  const [buttonOpen, setButtonOpen]= React.useState(false);

  return (
    <div>
      <Box my={3}>
        <Divider/>
      </Box>
      <Box fontWeight="fontWeightBold" my={3}　fontSize={16}>
        0件コメント
      </Box>
      　<Formik
          initialValues={{ 
            content: "", 
          }}
          validationSchema={CommentSchema}
          onSubmit={async value => {
            try {
              
            } catch (error) {
              alert(error.message);
            }
          }}
          render={({ submitForm, isSubmitting, isValid }) => (
            <Form>
              <Field
                fullWidth
                required
                style={{ marginTop: "0.5em", marginBottom: "0.5em" }}
                name="content"
                placeholder="コメントを入力"
                type="text"
                component={TextField}
                onClick={() => setButtonOpen(true)}
              />
              <Grid container justify="flex-end">
                <Grid>
                  {buttonOpen &&
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={submitForm}
                    style={{ marginTop: "0.5em", marginBottom: "0.5em" }}
                    type="submit"
                    disabled={!isValid || isSubmitting}
                  >
                    コメント
                  </Button>
                  }
                </Grid>
              </Grid>
            </Form>
          )}
        />
    </div>
  );
}








import React, { Fragment, useContext, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-material-ui";
import axios from 'axios'
import {
  Button,
  Grid,
  Typography,
} from "@material-ui/core";


const useStyles = makeStyles({
  root: {
    minWidth: 150,
  },
  input: {
    display: 'none',
  },
  marginRight:{
    marginRight: 20,
  }
});

export const CommentSchema = Yup.object().shape({
  introduction: Yup.string()
    .required(),
});

export default function IntroductionForm() {

  const classes = useStyles();
  const [FormOpen, setFormOpen]= React.useState(false);

  return (
    <div>
      <Button onClick={() => setFormOpen(true)}>
        <Typography 
          color='textSecondary'
          variant='caption'
        > 
          自己紹介を入力
        </Typography>
      </Button>
      {FormOpen &&
      　<Formik
          initialValues={{ 
            introduction: "", 
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
                name="introduction"
                placeholder="自己紹介を入力"
                type="text"
                variant="outlined"
                component={TextField}
                multiline={true}
                rows={4}
                onClick={() => setFormOpen(true)}
              />
              <Grid container justify="flex-end">
                <Grid>
                  <React.Fragment>
                    <Button
                      className={classes.marginRight}
                      variant="contained"
                      style={{ marginTop: "0.5em", marginBottom: "0.5em" }}
                      type="submit"
                      onClick={() => setFormOpen(false)}
                    >
                      キャンセル
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={submitForm}
                      style={{ marginTop: "0.5em", marginBottom: "0.5em" }}
                      type="submit"
                      disabled={!isValid || isSubmitting}
                    >
                      登録
                    </Button>                    
                  </React.Fragment>
                </Grid>
              </Grid>
            </Form>
          )}
        />
      }
    </div>
  );
}

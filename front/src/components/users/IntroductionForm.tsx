import React, { Fragment, useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-material-ui";
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

interface Props{
  handleFlash: (message: string, severity: 'success'|'error') => void
  value: any
  updateUser: (user: any) => void
}

export default function IntroductionForm(props: Props) {

  const classes = useStyles();
  const [FormOpen, setFormOpen]= useState(false);

  return (
    <div>
      <Button onClick={() => setFormOpen(true)}>
        <Typography 
          color='textSecondary'
          variant='caption'
        > 
          自己紹介を編集
        </Typography>
      </Button>
      {FormOpen &&
      　<Formik
      　  enableReinitialize={true}
          initialValues={
            {introduction: props.value}
          }
          onSubmit={async value => {
            try {
              const user ={
                introduction: value.introduction
              }
             props.updateUser(user)
              const message = '自己紹介を編集しました'
              const severity = 'success'
              props.handleFlash(message,severity)
             setFormOpen(false)
            } catch (error) {
              alert(error.message);
              const message = '自己紹介の編集に失敗しました'
              const severity = 'error'
              props.handleFlash(message,severity)
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
                size="small"
                component={TextField}
                multiline={true}
                rows={4}
                onClick={() => setFormOpen(true)}
              />
              <Grid container justify="flex-end">
                <Grid>
                  <Fragment>
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
                  </Fragment>
                </Grid>
              </Grid>
            </Form>
          )}
        />
      }
    </div>
  );
}

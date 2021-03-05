import React, { useState } from "react";
import { Box, Button, Card, CardContent, createStyles, FormControl, Grid, InputAdornment, LinearProgress, makeStyles, MenuItem, Theme, Typography} from "@material-ui/core";
import Template from "../components/layouts/Template";
import * as H from 'history';
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-material-ui";
import * as Yup from "yup";

interface Props {
  history: H.History;
  handleFlash: (message: string, severity: 'success'|'error'|'info') => void
  match: any
}

const ContactSchema = Yup.object().shape({
  name: Yup.string()
    .required('名前を入力してください'),
  email: Yup.string()
    .email('有効なメールアドレスを入力してください')
    .required('メールアドレスを入力してください'),
  type: Yup.string()
  .required('お問い合わせの種類を選択してください'),
  content: Yup.string()
  .min(10,'お問い合わせ内容は10文字以上で入力してください')
  .required('お問い合わせ内容を入力してください'),
});

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formTitle: {
      color: '#3f51b5;',
      fontWeight: 'bold'
    },
    root: {
      minWidth: 150,
      marginTop: theme.spacing(2),
    },
  }),
);

const values ={
  name: "",
  email: "", 
  type: "",
  content: "",
}

const forms=[
  {name: "name", label: "名前",type: "text"},
  {name: "email", label: "メールアドレス",type: "email"},
]


const Contact = (props: Props) => {

  const classes = useStyles();
  const [Submited, setSubmited] = useState(false);

  const sendContact = (contact: any) =>{
    const firebase = require("firebase");
    require("firebase/functions");
    let sendMail = firebase.functions().httpsCallable('sendMail');
    sendMail(contact)
    setSubmited(true)
  }


  return (
    <Template>
      <Grid 
        container 
        component="main" 
        direction="row"
        justify="center"
      >
        <Grid item xs={12} sm={11} md={10} lg={8} >
          <Card className={classes.root}>
            <CardContent>
              <Grid item xs={12}>
                <Box textAlign="center">
                  <Typography variant="h5" component="h2" className={classes.formTitle}>
                      お問い合わせ
                  </Typography>
                </Box>
              </Grid>
              <Formik
              　enableReinitialize={true}
                initialValues={values}
                validationSchema={ContactSchema}
                onSubmit={async value => {
                  try {
                    const contact ={
                      name: value.name, 
                      email: value.email ,
                      type: value.type,
                      content: value.content,
                    }
                    sendContact(contact)
                  } 
                  catch (error) {
                    console.log(error.message);
                  }
                }}>
                {({ submitForm, isSubmitting, isValid, setFieldValue}) => (
                  <Form>
                    <Grid container className={classes.root} spacing={3}>
                      {isSubmitting && <LinearProgress />}
                      {forms.map((form) => (
                        <Grid item xs={12}>
                          <Field
                            style={{ marginTop: "0.5em", marginBottom: "0.5em" }}
                            name={form.name}
                            label={form.label}
                            fullWidth
                            type={form.type}
                            variant="outlined"
                            size="small"
                            component={TextField}
                          />
                        </Grid>
                      ))}
                      <Grid item xs={12}>
                        <Field
                          style={{ marginTop: "0.5em", marginBottom: "0.5em" }}
                          name="type"
                          select={true}
                          label="お問い合わせの種類"
                          fullWidth
                          variant="outlined"
                          as="select"
                          size="small"
                          component={TextField}
                        >
                          {['ご意見・ご要望', '', 'エラー報告・バグ報告', '不適切なコンテンツの報告', 'その他'].map((value, index) => (
                            <MenuItem key={index} value={value}>
                              {value}
                            </MenuItem>
                          ))}
                        </Field>
                      </Grid>
                      <Grid item xs={12}>
                        <Field
                          fullWidth
                          style={{ marginTop: "0.5em", marginBottom: "0.5em" }}
                          name="content"
                          label="お問い合わせ内容"
                          variant="outlined"
                          multiline={true}
                          rows={4}
                          type="text"
                          size="small"
                          component={TextField}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          variant="contained"
                          color="primary"
                          fullWidth
                          onClick={submitForm}
                          type="submit"
                          disabled={!isValid || isSubmitting}
                        >
                          送信
                        </Button>
                      </Grid>
                    </Grid>
                  </Form>
                )}
              </Formik>
            </CardContent>   
          </Card>
        </Grid>
      </Grid>  
    </Template>
  );
};
export default Contact;
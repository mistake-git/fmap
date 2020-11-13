import { Field, Form, Formik } from "formik";
import { TextField } from "formik-material-ui";
import React, { Fragment, useContext, useEffect } from "react";
import * as Yup from "yup";

import {
  Button,
  Container,
  FormControl,
  Grid,
  Link,
  Typography,
  LinearProgress
} from "@material-ui/core";

import { AuthContext } from "../../Auth";
import auth from "../../plugins/firebase";

const AuthSchema = Yup.object().shape({
  name: Yup.string()
    .required(),
  email: Yup.string()
    .email()
    .required(),
  password: Yup.string()
    .min(6)
    .required(),
  password_confirmation: Yup.string()
    .min(6)
    .required()
});

const SignUpForm = (props: any) => {
  return (
    <Formik
      initialValues={{name: "", email: "", password: "" ,password_confirmation: ""}}
      validationSchema={AuthSchema}
      onSubmit={async value => {
        try {
          await auth.createUserWithEmailAndPassword(
            value.email,
            value.password
          );
          // mail for e-mail address verification can be sent here by using sendSignInLinkToEmail()
        } catch (error) {
          alert(error.message);
        }
      }}
      render={({ submitForm, isSubmitting, isValid }) => (
        <Form>
          {isSubmitting && <LinearProgress />}
          <FormControl margin="normal" fullWidth>
            <Field
              style={{ marginTop: "0.5em", marginBottom: "0.5em" }}
              name="name"
              label="名前"
              fullWidth
              variant="outlined"
              component={TextField}
            />
            <Field
              style={{ marginTop: "0.5em", marginBottom: "0.5em" }}
              name="email"
              label="メールアドレス"
              fullWidth
              variant="outlined"
              component={TextField}
            />
          </FormControl>
          <FormControl fullWidth>
            <Field
              style={{ marginTop: "0.5em", marginBottom: "0.5em" }}
              name="password"
              label="パスワード"
              fullWidth
              variant="outlined"
              type="password"
              component={TextField}
            />
          </FormControl>
          <FormControl fullWidth>
            <Field
              style={{ marginTop: "0.5em", marginBottom: "0.5em" }}
              name="password_confirmation"
              label="パスワード確認"
              fullWidth
              variant="outlined"
              type="password"
              component={TextField}
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
              新規登録
            </Button>
            <Typography align="center">
              <Link href="/signin">ログイン</Link>
            </Typography>
          </FormControl>
        </Form>
      )}
    />
  );
};

export default SignUpForm;
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-material-ui";
import React, { Fragment, useContext, useEffect } from "react";
import * as Yup from "yup";

import {
  Button,
  Container,
  FormControl,
  Grid,
  LinearProgress,
  Link,
  Typography
} from "@material-ui/core";

import { AuthContext } from "../../Auth";
import auth from "../../plugins/firebase";

const AuthSchema = Yup.object().shape({
  email: Yup.string()
    .email()
    .required('メールアドレスを入力してください'),
  password: Yup.string()
    .min(6)
    .required('パスワードを入力してください'),
});


const SignInForm = (props: any) => {
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={AuthSchema}
      onSubmit={async value => {
        try {
          await auth.signInWithEmailAndPassword(
            value.email,
            value.password
          );
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
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={submitForm}
              style={{ marginTop: "0.5em", marginBottom: "0.5em" }}
              type="submit"
              disabled={!isValid || isSubmitting}
            >
              ログイン
            </Button>
            <Typography align="center">
              <Link href="/signup">新規登録</Link>
            </Typography>
          </FormControl>
        </Form>
      )}
    />
  );
};

export default SignInForm;
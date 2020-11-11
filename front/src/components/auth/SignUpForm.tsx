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
import auth from "../../firebase";

export const AuthSchema = Yup.object().shape({
  email: Yup.string()
    .email()
    .required(),
  password: Yup.string()
    .min(6)
    .required()
});

const SignUpForm = (props: any) => {
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={AuthSchema}
      onSubmit={async value => {
        try {
          await auth.createUserWithEmailAndPassword(
            value.email,
            value.password
          );
          // mail for e-mail address verification can be sent here by using sendSignInLinkToEmail()
          props.history.push("/login");
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
              新規登録
            </Button>
            <Typography align="center">
              <Link href="/login">ログイン</Link>
            </Typography>
          </FormControl>
        </Form>
      )}
    />
  );
};

export default SignUpForm;
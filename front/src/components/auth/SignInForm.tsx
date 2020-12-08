import React from "react";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-material-ui";
import * as Yup from "yup";
import {
  Button,
  FormControl,
  LinearProgress,
  Link,
  Typography
} from "@material-ui/core";
import auth from "../../plugins/firebase";

const AuthSchema = Yup.object().shape({
  email: Yup.string()
    .email('有効なメールアドレスを入力してください')
    .required('メールアドレスを入力してください'),
  password: Yup.string()
    .min(6,'パスワードは6文字以上で入力してください')
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
          const message="ログインしました"
          const severity = 'success'
          props.handleFlash(message,severity )
        } 
        catch (error) {
          alert(error.message);
          const message="ログインに失敗しました"
          const severity = 'error'
          props.handleFlash(message,severity )
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
            <Typography align="center">
              <Link href="/password">パスワードを忘れましたか？</Link>
            </Typography>
          </FormControl>
        </Form>
      )}
    />
  );
};

export default SignInForm;
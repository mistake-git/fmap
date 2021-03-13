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

const AuthSchema = Yup.object().shape({
  email: Yup.string()
    .email('有効なメールアドレスを入力してください')
    .required('メールアドレスを入力してください'),
  password: Yup.string()
    .min(6,'パスワードは6文字以上で入力してください')
    .required('パスワードを入力してください'),
});

interface Props {
  signIn: (email: string, password: string) => void
}

const SignInForm = (props: Props) => {
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={AuthSchema}
      onSubmit={async value => {
        try {
          props.signIn(value.email, value.password)
        } 
        catch (error) {
          console.log(error.message);
        }
      }}
    >
      {({ submitForm, isSubmitting, isValid }) => (
        <Form>
          {isSubmitting && <LinearProgress />}
          <FormControl margin="dense" fullWidth>
            <Field
              style={{ marginTop: "0.5em", marginBottom: "0.5em" }}
              name="email"
              label="メールアドレス"
              fullWidth
              variant="outlined"
              size="small"
              component={TextField}
            />
          </FormControl>
          <FormControl margin="dense"  fullWidth>
            <Field
              style={{ marginTop: "0.5em", marginBottom: "0.5em" }}
              name="password"
              label="パスワード"
              fullWidth
              variant="outlined"
              type="password"
              size="small"
              component={TextField}
            />
          </FormControl>
          <FormControl margin="dense" fullWidth>
            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: "0.5em", marginBottom: "0.5em" }}
              fullWidth
              onClick={submitForm}
              type="submit"
              disabled={!isValid || isSubmitting}
            >
              ログイン
            </Button>
          </FormControl>
          <FormControl margin="dense" fullWidth>
            <Typography align="center">
              <Link href="/signup">新規登録</Link>
            </Typography>
            <Typography align="center">
              <Link href="/password">パスワードを忘れましたか？</Link>
            </Typography>
          </FormControl>
        </Form>
      )}
    </Formik>
  );
};

export default SignInForm;
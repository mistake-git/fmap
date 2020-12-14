import React　from "react";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-material-ui";
import * as Yup from "yup";
import {
  Button,
  FormControl,
  Link,
  Typography,
  LinearProgress,
  Box
} from "@material-ui/core";

import auth from "../../plugins/firebase";
import UserModel from "../../models/UserModel";
import { myHttpClient } from "../../plugins/axios";

const AuthSchema = Yup.object().shape({
  name: Yup.string()
    .required('名前を入力してください'),
  email: Yup.string()
    .email('有効なメールアドレスを入力してください')
    .required('メールアドレスを入力してください'),
  password: Yup.string()
    .min(6)
    .required('パスワードを入力してください'),
  password_confirmation: Yup.string()
    .min(6)
    .required('パスワード確認を入力してください')
    .oneOf([Yup.ref('password'), null], 'パスワードが一致しません')
});


const forms=[
  {name: "name", label: "名前",type: "text"},
  {name: "email", label: "メールアドレス",type: "email"},
  {name: "password", label: "パスワード",type: "password"},
  {name: "password_confirmation", label: "パスワード確認",type: "password"},
]

interface Props {
  handleFlash: (message: string, severity: 'success'|'error') => void
}


const SignUpForm = (props: Props) => {

  return (
    <Formik
      initialValues={{name: "", email: "", password: "" ,password_confirmation: ""}}
      validationSchema={AuthSchema}
      onSubmit={async value => {
        try {
        await auth.createUserWithEmailAndPassword(
            value.email,
            value.password
          )
          .then((results) => {
            const user ={
              name: value.name,
              email: value.email,
              uid: results.user?.uid
            }
            myHttpClient.post('/users',{user: user})
            console.log(results)
            const message="アカウントを作成しました"
            const severity = 'success'
            props.handleFlash(message,severity )
          })
        } 
        catch (error) {
          alert(error.message);
          const message="アカウントに失敗しました"
          const severity = 'error'
          props.handleFlash(message,severity )
        }
      }}
      render={({ submitForm, isSubmitting, isValid }) => (
        <Form>
          {isSubmitting && <LinearProgress />}

          {forms.map((form) => (
          <FormControl margin="normal" fullWidth>
            <Field
              style={{ marginTop: "0.5em", marginBottom: "0.5em" }}
              name={form.name}
              label={form.label}
              type={form.type}
              variant="outlined"
              size="small"
              component={TextField}
            />
          </FormControl>
          ))}
        
          <FormControl fullWidth>
            <Button
              variant="contained"
              color="primary"
              
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
            <Typography align="center">
              <Link href="/password">パスワードを忘れましたか？</Link>
            </Typography>
          </FormControl>
        </Form>
      )}
    />
  );
};

export default SignUpForm;


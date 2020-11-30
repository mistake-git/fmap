import React　from "react";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-material-ui";
import * as Yup from "yup";
import axios from 'axios'

import {
  Button,
  FormControl,
  Link,
  Typography,
  LinearProgress
} from "@material-ui/core";

import auth from "../../plugins/firebase";
import UserModel from "../../models/UserModel";

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

interface State {
 user: UserModel;
}


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
          )
          .then((results) => {
            const user ={
              name: value.name,
              email: value.email,
              uid: results.user?.uid
            }
            axios.post('http://localhost:3000/api/v1/users',{user: user})
            console.log(results)
          })
          .catch((data) =>{
           　console.log(data)
          })
        } 
        catch (error) {
          alert(error.message);
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
              fullWidth
              variant="outlined"
              component={TextField}
            />
          </FormControl>
          ))}
        
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


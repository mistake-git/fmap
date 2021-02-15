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
} from "@material-ui/core";
import auth from "../../plugins/firebase";
import UserFormModel from "../../forms/UserFormModel";

const AuthSchema = Yup.object().shape({
  name: Yup.string()
    .required('名前を入力してください'),
  email: Yup.string()
    .email('有効なメールアドレスを入力してください')
    .required('メールアドレスを入力してください'),
  password: Yup.string()
    .min(6,'パスワードは6文字以上で入力してください')
    .required('パスワードを入力してください'),
  password_confirmation: Yup.string()
    .min(6,'パスワードは6文字以上で入力してください')
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
  createAccount: (user: UserFormModel) => void
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
            props.createAccount(user)
          })
        } 
        catch (error) {
          console.log(error.message);
        }
      }}>
      {({ submitForm, isSubmitting, isValid }) => (
        <Form>
          {isSubmitting && <LinearProgress />}

          {forms.map((form) => (
          <FormControl margin="dense" fullWidth>
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
        
          <FormControl margin="dense" fullWidth>
            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: "0.5em", marginBottom: "0.5em" }}
              onClick={submitForm}
              type="submit"
              disabled={!isValid || isSubmitting}
            >
              新規登録
            </Button>
          </FormControl>
          <FormControl margin="dense" fullWidth>
            <Typography align="center">
              <Link href="/signin">ログイン</Link>
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

export default SignUpForm;


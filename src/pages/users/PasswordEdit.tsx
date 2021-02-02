import React, { useContext, useEffect } from 'react'
import AuthTemplate from '../../components/layouts/AuthTemplate'
import { AuthContext } from '../../Auth'
import * as H from 'history';
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
});

interface Props {
  history: H.History;
  handleFlash: (message: string, severity: 'success'|'error') => void
  match: any
}

export default function PasswordEdit(props: Props) {
  const { firebaseAuthUser } = useContext(AuthContext)

  useEffect(() => {
    firebaseAuthUser && props.history.push('/')
  }, [props.history, firebaseAuthUser])

  return (
    <AuthTemplate title="パスワード再設定">
      <Formik
        initialValues={{ email: ""}}
        validationSchema={AuthSchema}
        onSubmit={async (value, {resetForm}) => {
          try { 
          const email = value.email
          await auth.sendPasswordResetEmail(email).then(function() {
            resetForm({})
            const message="メールを送信しました"
            const severity = 'success'
            props.handleFlash(message,severity )
          })
          } 
          catch (error) {
            console.log(error.message);
            const message="メールを送信できませんでした"
            const severity = 'error'
            props.handleFlash(message,severity )
          }
        }}
        render={({ submitForm, isSubmitting, isValid }) => (
          <Form>
            {isSubmitting && <LinearProgress />}
            <FormControl margin="dense"　fullWidth>
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
                パスワードリセットメールを送信
              </Button>
              <Typography align="center">
                <Link href="/signup">新規登録</Link>
              </Typography>
              <Typography align="center">
                <Link href="/signin">ログイン</Link>
              </Typography>
            </FormControl>
          </Form>
        )}
      />
    </AuthTemplate>
  )
}
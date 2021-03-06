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
import { useHistory } from 'react-router-dom';
import { updateMessage, updateOpen, updateSeverity } from '../../actions/Flash';
import { useDispatch } from 'react-redux';

const AuthSchema = Yup.object().shape({
  email: Yup.string()
    .email('有効なメールアドレスを入力してください')
});

interface Props {
  history: H.History;
  match: any
}

export default function PasswordEdit(props: Props) {
  const { firebaseAuthUser } = useContext(AuthContext)
  const history = useHistory();
  const dispatch = useDispatch()
  useEffect(() => {
    firebaseAuthUser && history.push('/')
  }, [history, firebaseAuthUser])

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
            dispatch(updateMessage('メールを送信しました'))
            dispatch(updateSeverity('success'))
            dispatch(updateOpen(true))
          })
          } 
          catch (error) {
            console.log(error.message);
            dispatch(updateMessage('メールを送信できませんでした'))
            dispatch(updateSeverity('error'))
            dispatch(updateOpen(true))
          }
        }}>
        {({ submitForm, isSubmitting, isValid }) => (
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
                メールを送信
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
      </Formik>
    </AuthTemplate>
  )
}
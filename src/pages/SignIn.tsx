import React, { useContext, useEffect } from 'react'
import SignInForm from '../components/auth/SignInForm'
import AuthTemplate from '../components/layouts/AuthTemplate'
import { AuthContext } from '../Auth'
import * as H from 'history'
import auth from '../plugins/firebase'

interface Props {
  history: H.History
  handleFlash: (message: string, severity: 'success' | 'error') => void
  match: any
}

export default function SiginIn(props: Props) {
  const { firebaseAuthUser } = useContext(AuthContext)

  const signIn = (email: string, password: string) => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((results) => {
        const message = 'ログインしました'
        const severity = 'success'
        props.handleFlash(message, severity)
        const firebaseAuthUser = results.user
        firebaseAuthUser
        ?.getIdToken(true)
        .then((idToken) => {
          console.log(idToken)
          localStorage.setItem('id-token', idToken);
        })
        .catch((error) => {
          console.log(error)
        })
      })
      .catch(function (error) {
        console.log(error)
        const message = 'ログインに失敗しました'
        const severity = 'error'
        props.handleFlash(message, severity)
      })
  }

  useEffect(() => {
    // if logged in, redirect to home
    firebaseAuthUser && props.history.push('/')
  }, [firebaseAuthUser, props.history])

  return (
    <AuthTemplate title="ログイン">
      <SignInForm signIn={signIn} />
    </AuthTemplate>
  )
}

import React, { useContext, useEffect } from 'react'
import SignInForm from '../components/auth/SignInForm'
import AuthTemplate from '../components/layouts/AuthTemplate'
import { AuthContext } from '../Auth'
import * as H from 'history'
import auth from '../plugins/firebase'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { updateMessage, updateOpen, updateSeverity } from '../actions/Flash'

interface Props {
  history: H.History
  match: any
}

export default function SiginIn(props: Props) {
  const { firebaseAuthUser } = useContext(AuthContext)
  const history = useHistory();
  const dispatch = useDispatch()

  const signIn = (email: string, password: string) => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((results) => {
        dispatch(updateMessage('ログインしました'))
        dispatch(updateSeverity('success'))
        dispatch(updateOpen(true))
        const firebaseAuthUser = results.user
        firebaseAuthUser
          ?.getIdToken(true)
          .then((idToken) => {
            console.log(idToken)
            localStorage.setItem('id-token', idToken)
          })
          .catch((error) => {
            console.log(error)
          })
      })
      .catch(function (error) {
        console.log(error)
        dispatch(updateMessage('ログインに失敗しました'))
        dispatch(updateSeverity('error'))
        dispatch(updateOpen(true))
      })
  }

  useEffect(() => {
    // if logged in, redirect to home
    firebaseAuthUser && history.push('/')
  }, [firebaseAuthUser, history])

  return (
    <AuthTemplate title="ログイン">
      <SignInForm signIn={signIn} />
    </AuthTemplate>
  )
}

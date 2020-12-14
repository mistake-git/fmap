import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../Auth'
import AuthTemplate from '../components/layouts/AuthTemplate'
import SignUpForm from '../components/auth/SignUpForm'
import * as H from 'history';

interface Props {
  history: H.History;
  handleFlash: (message: string, severity: 'success'|'error') => void
  match: any
}

export default function SignUp(props: Props) {
  const { currentUser } = useContext(AuthContext)

  useEffect(() => {
    // if logged in, redirect to home
    currentUser && props.history.push('/')
  }, [currentUser])

  return (
    <AuthTemplate title="新規登録">
      <SignUpForm handleFlash={props.handleFlash} />
    </AuthTemplate>
  )
}

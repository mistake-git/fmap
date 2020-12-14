import React, { useContext, useEffect } from 'react'
import SignInForm from '../components/auth/SignInForm'
import AuthTemplate from '../components/layouts/AuthTemplate'
import { AuthContext } from '../Auth'
import * as H from 'history';

interface Props {
  history: H.History;
  handleFlash: (message: string, severity: 'success'|'error') => void
  match: any
}

export default function SiginIn(props: Props) {
  const { currentUser } = useContext(AuthContext)

  useEffect(() => {
    // if logged in, redirect to home
    currentUser && props.history.push('/')
  }, [currentUser])

  return (
    <AuthTemplate title="ログイン">
      <SignInForm handleFlash={props.handleFlash} />
    </AuthTemplate>
  )
}

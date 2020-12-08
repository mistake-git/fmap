import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../Auth'
import AuthTemplate from '../components/layouts/AuthTemplate'
import SignUpForm from '../components/auth/SignUpForm'

export default function SignUp(props: any) {
  const { currentUser } = useContext(AuthContext)

  useEffect(() => {
    // if logged in, redirect to home
    currentUser && props.history.push('/')
  }, [currentUser])

  return (
    <AuthTemplate title="新規登録">
      <SignUpForm
        handleFlash={props.handleFlash}
      />
    </AuthTemplate>
  )
}
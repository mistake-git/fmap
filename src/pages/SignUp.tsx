import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../Auth'
import AuthTemplate from '../components/layouts/AuthTemplate'
import SignUpForm from '../components/auth/SignUpForm'
import * as H from 'history'
import UsersRepository from '../repositories/UsersRepository'
import UserFormModel from '../forms/UserFormModel'

interface Props {
  history: H.History
  handleFlash: (message: string, severity: 'success' | 'error') => void
  match: any
}

export default function SignUp(props: Props) {
  const { firebaseAuthUser } = useContext(AuthContext)

  useEffect(() => {
    // if logged in, redirect to home
    firebaseAuthUser && props.history.push('/')
  }, [firebaseAuthUser, props.history])

  const createaAccount = (user: UserFormModel) => {
    UsersRepository.createUser(user)
    .then((response) => {
      console.log(response)
      const message = 'アカウントを作成しました'
      const severity = 'success'
      props.handleFlash(message, severity)
    })
    .catch((error) => {
      console.error(error)
      const message = 'アカウントに失敗しました'
      const severity = 'error'
      props.handleFlash(message, severity)
    })
  }

  return (
    <AuthTemplate title="新規登録">
      <SignUpForm createAccount={createaAccount} />
    </AuthTemplate>
  )
}

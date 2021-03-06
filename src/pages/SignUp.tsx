import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../Auth'
import AuthTemplate from '../components/layouts/AuthTemplate'
import SignUpForm from '../components/auth/SignUpForm'
import * as H from 'history'
import UsersRepository from '../repositories/UsersRepository'
import UserFormModel from '../forms/UserFormModel'
import { useHistory } from 'react-router-dom'
import { updateMessage, updateOpen, updateSeverity } from '../actions/Flash'
import { useDispatch } from 'react-redux'

interface Props {
  history: H.History
  handleFlash: (message: string, severity: 'success' | 'error') => void
  match: any
}

export default function SignUp(props: Props) {
  const { firebaseAuthUser } = useContext(AuthContext)
  const history = useHistory();
  const dispatch = useDispatch()

  useEffect(() => {
    // if logged in, redirect to home
    firebaseAuthUser && history.push('/')
  }, [firebaseAuthUser, history])

  const createaAccount = (user: UserFormModel) => {
    UsersRepository.createUser(user)
      .then((response) => {
        console.log(response)
        dispatch(updateMessage('アカウントを作成しました'))
        dispatch(updateSeverity('success'))
        dispatch(updateOpen(true))
      })
      .catch((error) => {
        console.error(error)
        dispatch(updateMessage('アカウント作成に失敗しました'))
        dispatch(updateSeverity('error'))
        dispatch(updateOpen(true))
      })
  }

  return (
    <AuthTemplate title="新規登録">
      <SignUpForm createAccount={createaAccount} />
    </AuthTemplate>
  )
}

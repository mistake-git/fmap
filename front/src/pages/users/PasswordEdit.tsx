import React, { useContext, useEffect } from 'react'
import PasswordEditForm from '../../components/users/PasswordEditForm'
import AuthTemplate from '../../components/layouts/AuthTemplate'
import { AuthContext } from '../../Auth'
import * as H from 'history';

interface Props {
  history: H.History;
}

export default function PasswordEdit(props: any) {
  const { currentUser } = useContext(AuthContext)
  useEffect(() => {
    currentUser && props.history.push('/')
  }, [currentUser])

  return (
    <AuthTemplate title="パスワード再設定">
      <PasswordEditForm
        handleFlash={props.handleFlash}
      />
    </AuthTemplate>
  )
}
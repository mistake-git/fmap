import React from 'react'
import * as H from 'history'
import { updateEmail, updatePassword } from '../actions/SignIn'
import { useDispatch } from 'react-redux'

interface Props {
  history: H.History
  handleFlash: (message: string, severity: 'success' | 'error') => void
  match: any
}

export default function SigInDummy(props: Props) {
  const dispatch = useDispatch()
  return (
    <>
      <div>
        <input
          type="text"
          onChange={(e) => dispatch(updateEmail(e.target.value))}
        />
      </div>
      <div>
        <input
          type="password"
          onChange={(e) => dispatch(updatePassword(e.target.value))}
        />
      </div>
    </>
  )
}

import React, { Fragment, useContext, useEffect } from 'react'
import { Container, Grid, Typography } from '@material-ui/core'
import { AuthContext } from '../Auth'
import Template from '../components/layouts/Template'
import axios from 'axios'
import UserModel from '../models/UserModel'
import auth from '../plugins/firebase'
import GoogleMap from '../components/map/GoogleMap'

interface State {
  user: UserModel
}

const Home = (props: any) => {
  const { currentUser } = useContext(AuthContext)
  const [user, setUser] = React.useState<any>('')

  useEffect(() => {
    auth.onAuthStateChanged((user: any) => {
      axios
        .get(`http://localhost:3000/api/v1/users/${user?.uid}`)
        .then((results) => {
          console.log(results)
          setUser(results.data)
        })
        .catch((data) => {
          console.log(data)
        })
    })
  }, [])
  return (
    <Fragment>
      <Template>
        <GoogleMap />
      </Template>
    </Fragment>
  )
}

export default Home

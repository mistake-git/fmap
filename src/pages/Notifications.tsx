import {
  Box,
  createStyles,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core'
import React, { Fragment, useContext, useEffect, useState } from 'react'
import Template from '../components/layouts/Template'
import * as H from 'history'
import NotifiCationsList from '../components/notifications/NotificationsList'
import NotificationsRepository from '../repositories/NotificationsRepository'
import NotificationModel from '../models/NotificationModel'
import auth from '../plugins/firebase'
import { AuthContext } from '../Auth'
import ContentsLoading from '../components/layouts/ContentsLoading'

const useStyles = makeStyles(() =>
  createStyles({
    title: {
      color: '#3f51b5;',
      fontWeight: 'bold',
    },
  })
)

interface Props {
  history: H.History
  match: any
}

const Notifications = (props: Props) => {
  const [notifications, setNotifications] = useState<
    NotificationModel[] | null
  >(null)
  const { firebaseAuthUser } = useContext(AuthContext)
  const classes = useStyles()

  const getNotifications = async () => {
    try {
      const notifications = await NotificationsRepository.getNotifications().then(
        (results) => {
          return results
        }
      )
      return notifications
    } catch (error) {
      console.log(error.message)
    }
    return [] as NotificationModel[]
  }

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (firebaseAuthUser !== null && user !== null) {
        getNotifications()
          .then((results) => {
            setNotifications(results)
          })
          .catch((data) => {
            console.log(data.user)
          })
      }
    })
  }, [setNotifications, firebaseAuthUser])

  return (
    <Fragment>
      <Template>
        <Box textAlign="center" my={3}>
          <Typography variant="h5" component="h2" className={classes.title}>
            通知
          </Typography>
        </Box>
        <Grid container component="main" direction="row" justify="center">
          <Grid item xs={12} sm={10} md={8} lg={6}>
            {notifications ? (
              <NotifiCationsList notifications={notifications} />
            ) : (
              <ContentsLoading />
            )}
          </Grid>
        </Grid>
      </Template>
    </Fragment>
  )
}
export default Notifications

import { Grid } from "@material-ui/core";
import React, { Fragment, useContext, useEffect, useState } from "react";
import Template from "../components/layouts/Template";
import * as H from 'history';
import NotifiCationList from "../components/notifications/NotificationList";
import NotificationsRepository from "../repositories/NotificationsRepository";
import NotificationModel from "../models/NotificationModel";
import auth from "../plugins/firebase";
import { AuthContext } from "../Auth";

interface Props {
  history: H.History;
  match: any
}

const Notifications = (props: Props) => {
  const [notifications, setNotifications]  = useState<NotificationModel[] | null>(null);
  const { firebaseAuthUser } = useContext(AuthContext)

  const getNotifications = async(currentUserId: string) => {
    try { 
    const notifications = await
      NotificationsRepository.getNotifications(currentUserId)
        .then((results) => {
        return results
      })
      return notifications;
    }
    catch (error) {
      console.log(error.message);
    }
    return [] as NotificationModel[];
  }
  
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (firebaseAuthUser !== null && user !== null) {
        getNotifications(user?.uid)
        .then((results)=>{
          setNotifications(results)
        })   
        .catch((data) =>{
          console.log(data.user)
        })
      }
    });  
  }, [setNotifications]);

  return (
    <Fragment>
      <Template>
        <Grid 
          container 
          component="main" 
          direction="row"
          justify="center"
        >
          <Grid item xs={12} sm={11} md={10} lg={8} >
            {notifications && 
            <NotifiCationList
              notifications={notifications}
            />
            }  
          </Grid>
        </Grid>
      </Template>
    </Fragment>
  );
};
export default Notifications;


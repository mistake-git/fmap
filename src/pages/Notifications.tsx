import { Grid } from "@material-ui/core";
import React, { Fragment } from "react";
import Template from "../components/layouts/Template";
import * as H from 'history';
import NotifiCationList from "../components/notifications/NotificationList";

interface Props {
  history: H.History;
  match: any
}

const Notifications = (props: Props) => {

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
            <NotifiCationList/>
          </Grid>
        </Grid>
      </Template>
    </Fragment>
  );
};
export default Notifications;


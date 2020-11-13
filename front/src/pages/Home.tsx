import React, { Fragment, useContext, useEffect } from "react";
import { Button, Container, Grid, Typography } from "@material-ui/core";
import { AuthContext } from "../Auth";
import auth from "../plugins/firebase";
import Template from "../components/layouts/Template";

const Home = (props: any) => {
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    // if not logged in, redirect to login page
    currentUser === null && props.history.push("/login");
  }, [currentUser]);

  return (
    <Fragment>
      <Template>
        <Container>
          <Grid container style={{ marginTop: "1em" }}>
            <Grid item md={4}></Grid>
            <Grid item md={4}>
              <Typography>ログインしています</Typography>
              <Typography
                variant="caption"
                style={{
                  paddingTop: "2em",
                  paddingBottom: "2em",
                  whiteSpace: "pre"
                }}
              >
                {currentUser && currentUser.email}さんでログイン中
              </Typography>
            </Grid>
            <Grid item md={4}></Grid>
          </Grid>
        </Container>
      </Template>
    </Fragment>
  );
};

export default Home;

import React, { Fragment, useContext, useEffect } from "react";
import { Button, Container, Grid, Typography } from "@material-ui/core";
import { AuthContext } from "../Auth";
import auth from "../firebase";
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
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={async event => {
                  try {
                    await auth.signOut();
                    props.history.push("/login");
                  } catch (error) {
                    alert(error.message);
                  }
                }}
                style={{ marginTop: "0.5em", marginBottom: "0.5em" }}
              >
                ログアウト
              </Button>
            </Grid>
            <Grid item md={4}></Grid>
          </Grid>
        </Container>
      </Template>
    </Fragment>
  );
};

export default Home;

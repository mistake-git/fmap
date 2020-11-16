import React, { Fragment, useContext, useEffect } from "react";
import { Container, Grid, Typography } from "@material-ui/core";
import { AuthContext } from "../Auth";
import Template from "../components/layouts/Template";
import axios from 'axios'

const Home = (props: any) => {
  const { currentUser } = useContext(AuthContext);
  const [user, setUser] = React.useState('');

  useEffect(() => {
    // if not logged in, redirect to login page
    currentUser === null && props.history.push("/signin");
  }, [currentUser]);

  useEffect(() => {
    axios.get(`http://localhost:3000/api/v1/users/${currentUser?.uid}`)
  }, [setUser]);

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

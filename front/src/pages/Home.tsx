import React, { Fragment, useContext, useEffect } from "react";
import { Container, Grid, Typography } from "@material-ui/core";
import { AuthContext } from "../Auth";
import Template from "../components/layouts/Template";
import axios from 'axios'
import UserModel from "../models/UserModel";

interface State {
  user: UserModel;
 }


const Home = (props: any) => {
  const { currentUser } = useContext(AuthContext);
  const [user, setUser] = React.useState<any>('');


  useEffect(() => {
    // if not logged in, redirect to login page
    currentUser === null && props.history.push("/signin");
  }, [currentUser]);

  useEffect(() => {
    axios.get(`http://localhost:3000/api/v1/users/${currentUser?.uid}`)
    .then((results) => {
			console.log(results)
      setUser(results.data)
		})
		.catch((data) =>{
			console.log(data)
		})
  }, [setUser]);


  return (
    <Fragment>
      <Template>
        <Container>
          <Grid container style={{ marginTop: "1em" }}>
            <Grid item md={4}></Grid>
            <Grid item md={4}>
            
            <Typography>
              {currentUser && currentUser.email}でログイン
              {user && user.name}
              ログインしています</Typography>
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

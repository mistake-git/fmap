import React, { Fragment, useEffect } from "react";
import {　Container, Grid} from "@material-ui/core";
import Template from "../../components/layouts/Template";
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios'
import UserModel from "../../models/UserModel";
import UserCard from "../../components/users/UserCard";
import CircularProgress from '@material-ui/core/CircularProgress';
import Loading from "../../components/layouts/Loading";

interface State {
  users: UserModel[]
  user: UserModel
}

const Users = (props: any) => {
 
  const [users, setUsers] = React.useState<UserModel[]>([])
  const [loading, setLoading] = React.useState(true);

  const getUsers = async() => {
    try { 
    await
      axios.get('http://localhost:3000/api/v1/users')
      .then((results) => {
        console.log(results)
        setUsers(results.data)
      })
    }catch (error){
      alert(error.message);
    }
  　setLoading(false);
  }

  useEffect(() => {
	　getUsers();
  },[setUsers]);


  return (
    <Fragment>
      {loading &&
       <Loading/>
      }
      <Template>
        <Container maxWidth="md">
          <Grid container style={{ marginTop: "5em" }} spacing={5}>
          {users.map((user) => {
            return(
              <UserCard user={user}/>
            )
          })}
          </Grid>
        </Container>
        </Template>
    </Fragment>
  );
};
export default Users;

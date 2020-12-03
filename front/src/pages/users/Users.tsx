import React, { Fragment, useEffect, useState } from "react";
import {　Container, Grid} from "@material-ui/core";
import Template from "../../components/layouts/Template";
import UserModel from "../../models/UserModel";
import UserCard from "../../components/users/UserCard";
import Loading from "../../components/layouts/Loading";
import { myHttpClient } from "../../plugins/axios";

interface State {
  users: UserModel[]
  user: UserModel
}

const Users = (props: any) => {
 
  const [users, setUsers] = useState<UserModel[] | null>(null)
  const [loading, setLoading] = useState(true);

  const getUsers = async() => {
    try { 
    await
      myHttpClient.get('/users')
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
      { users &&
      <Template>
        <Container maxWidth="md">
          <Grid container style={{ marginTop: "5em" }}>
            {users.map((user) => {
              return(
                <Grid xs={6} sm={4} md={3} lg={2} style={{ marginTop: "2em" }}>
                  <UserCard user={user}/>
                </Grid>
              )
            })}
          </Grid>
        </Container>
        </Template>
      } 
    </Fragment>
  );
};
export default Users;

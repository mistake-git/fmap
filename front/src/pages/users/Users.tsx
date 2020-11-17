import React, { Fragment, useContext, useEffect } from "react";
import { Button, Container, Grid, Typography } from "@material-ui/core";
import Template from "../../components/layouts/Template";
import PostCard from "../../components/posts/PostCard"
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios'
import UserModel from "../../models/UserModel";
import { AuthContext } from "../../Auth";
import UserCard from "../../components/users/UserCard";


interface State {
  users: UserModel[]
  user: UserModel
}

const useStyles = makeStyles((theme) => ({
  control: {
    padding: theme.spacing(1.5),
  },
}));

const Users = (props: any) => {
 
  const classes = useStyles();
  const [users, setUsers] = React.useState<UserModel[]>([])
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    axios.get('http://localhost:3000/api/v1/users')
		.then((results) => {
			console.log(results)
			setUsers(results.data)
		})
		.catch((data) =>{
			console.log(data)
		})
  },[setUsers]);

  return (
    <Fragment>
      <Template>
        <Container maxWidth="md">
          <Grid container style={{ marginTop: "3em" }}>
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

import React, { Fragment, useEffect } from "react";
import {　Container, Grid} from "@material-ui/core";
import Template from "../../components/layouts/Template";
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios'
import UserModel from "../../models/UserModel";
import UserCard from "../../components/users/UserCard";
import CircularProgress from '@material-ui/core/CircularProgress';


interface State {
  users: UserModel[]
  user: UserModel
}

const useStyles = makeStyles((theme) => ({
  control: {
    padding: theme.spacing(1.5),
  },
  loading: {
    position: "fixed", 
    top: 0, 
    left: 0, 
    width: "100%", 
    height: "100%", 
    display: "flex", 
    justifyContent: "center", 
    alignItems: "center",
  　background: 'rgba(0,0,0,0.15)'
  }
}));

const Users = (props: any) => {
 
  const classes = useStyles();
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
        <div className={classes.loading}>
          <CircularProgress/>
        </div>
      }
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

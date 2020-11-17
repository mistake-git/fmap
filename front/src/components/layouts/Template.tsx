import React, { Fragment, useContext, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import  Header  from './Header';
import  Footer  from './Footer';
import { AuthContext } from "../../Auth";
import { withRouter } from 'react-router-dom';
import axios from 'axios'


const useStyles = makeStyles((theme) => ({
	mainGrid: {
		marginTop: theme.spacing(9),
	},
}));


const Template =(props: any) => {
	const classes = useStyles();
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
		<React.Fragment>
			<CssBaseline />
			<Header title="Fishing Map" />
        <Container maxWidth="xl" className={classes.mainGrid}>
          {props.children}
        </Container>
			<Footer title="Fishing Map" />
		</React.Fragment>
	);
}

export default withRouter(Template);
import React, { useContext, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import  Header  from './Header';
import  Footer  from './Footer';
import { AuthContext } from "../../Auth";
import { withRouter } from 'react-router-dom';



const useStyles = makeStyles((theme) => ({
	mainGrid: {
		marginTop: theme.spacing(2),
	},
}));


const Template =(props: any) => {
	const classes = useStyles();
	const { currentUser } = useContext(AuthContext);

	useEffect(() => {
		// if not logged in, redirect to login page
		currentUser === null && props.history.push("/signin");
	}, [currentUser]);

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
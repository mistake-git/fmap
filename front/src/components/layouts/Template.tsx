import React, { Fragment, useContext, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import  Header  from './Header';
import  Footer  from './Footer';
import { AuthContext } from "../../Auth";

const useStyles = makeStyles((theme) => ({
	mainGrid: {
		marginTop: theme.spacing(9),
	},
}));

export default function Template(props: any){

	const classes = useStyles();
	const { currentUser } = useContext(AuthContext);

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
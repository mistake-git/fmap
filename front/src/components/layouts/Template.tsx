import React, { useContext, useEffect, Fragment } from "react";
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import  Header  from './Header';
import  Footer  from './Footer';
import { AuthContext } from "../../Auth";
import { withRouter } from 'react-router-dom';
import * as H from 'history';

const useStyles = makeStyles((theme) => ({
	mainGrid: {
		marginTop: theme.spacing(2),
		marginBottom: theme.spacing(10),
	},
}));

interface Props {
  children?: any
	history: H.History;
}

const Template =(props: Props) => {
	const classes = useStyles();
	const { currentUser } = useContext(AuthContext);

	useEffect(() => {
		// if not logged in, redirect to login page
		currentUser === null && props.history.push("/signin");
	}, [currentUser]);

	return (
		<Fragment>
			<CssBaseline />
			<Header/>
        <Container maxWidth="xl" className={classes.mainGrid}>
          {props.children}
        </Container>
			<Footer 
				title="Fishing Map" 
				description="地図で釣果を探せるアプリ"
			/>
		</Fragment>
	);
}

export default withRouter(Template);
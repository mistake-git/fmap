import React, { Children } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import  Header  from './Header';
import  Footer  from './Footer';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
	mainGrid: {
		marginTop: theme.spacing(3),
	},
}));

export default function Template(props: any){
	const classes = useStyles();

	return (
		<React.Fragment>
			<CssBaseline />
			<Header title="Fishing Map" />
        <Container maxWidth="xl">
          {props.children}
        </Container>
			<Footer title="Fishing Map" />
		</React.Fragment>
	);
}
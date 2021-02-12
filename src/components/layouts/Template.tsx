import React, { Fragment, useContext } from "react";
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import  Header  from './Header';
import  Footer  from './Footer';
import { Link, withRouter } from 'react-router-dom';
import * as H from 'history';
import { AppBar, Box, Button, Hidden, Toolbar, Typography } from "@material-ui/core";
import { AuthContext } from "../../Auth";

const useStyles = makeStyles((theme) => ({
	mainGrid: {
		marginTop: theme.spacing(2),
		marginBottom: theme.spacing(10),
	},
	appBar: {
		top: 'auto',
		bottom: 0,
		background: '#3f51b5;'
	},
	text: {
		flexGrow: 1,
		fontSize: '1.2rem'
	},
	root: {
		'& > *': {
			margin: theme.spacing(1),
		},
	},
	link: {
    textDecoration: 'none'
  },
}));

interface Props {
  children?: any
	history: H.History;
}

const Template =(props: Props) => {
	const classes = useStyles();
	const { firebaseAuthUser } = useContext(AuthContext)

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
			{firebaseAuthUser === null  &&
			<AppBar position="fixed" className={classes.appBar}>
				<Toolbar>
					<Hidden mdDown>
						<Box className={classes.text}>
							Fishing Mapにログインして釣果を登録しよう！
						</Box>
					</Hidden>
					<Hidden smDown>
						<Box className={classes.text}>
					　　Fishing MapはみんなでつくるWeb上の釣果がわかる地図です。
						</Box>
					</Hidden>
					<Hidden mdUp>
						<Box className={classes.text} >
					　　Fishing Map
						</Box>
					</Hidden>
					<div className={classes.root}>
					<Link to={'/signin'}　className={classes.link}>
						<Button variant="contained">ログイン</Button>
					</Link>
					<Link to={'/signup'}　className={classes.link}>
						<Button variant="contained">新規登録</Button>
					</Link>
					</div>
        </Toolbar>
			</AppBar>
			}			
		</Fragment>
	);
}

export default withRouter(Template);
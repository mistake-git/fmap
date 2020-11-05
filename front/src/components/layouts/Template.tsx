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

const sections = [
	{ title: 'トップ', url: '/top' },
	{ title: '会社を知る', url: '/company' },
	{ title: '人を知る', url: '/member' },
	{ title: '業務を知る', url: '/work' },
	{ title: 'ランキング', url: '/ranking' },
];

const mainFeaturedPost = {
	title: 'Title of a longer featured blog post',
	description:
		"Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
	image: 'https://source.unsplash.com/random',
	imgText: 'main image description',
	linkText: 'Continue reading…',
};


const sidebar = {
	archives: [
		{ title: 'March 2020', url: '#' },
	],
};

export default function Template(props: any){
	const classes = useStyles();

	return (
		<React.Fragment>
			<CssBaseline />
			<Header title="Fishing Map" sections={sections} />
        <Container maxWidth="xl">
          {props.children}
        </Container>
			<Footer title="Fishing Map" />
		</React.Fragment>
	);
}
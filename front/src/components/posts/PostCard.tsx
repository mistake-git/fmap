import React from 'react';
import { makeStyles, Theme, createStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';
import PostModel from '../../models/PostModel';
import { Avatar, Box, CardHeader } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
createStyles({
	  cardTitle: {
			paddingBottom: '0px',
			paddingTop: '0px',
		},
		avater: {
			width: theme.spacing(3),
			height: theme.spacing(3),
		},
		root: {
			maxWidth: 350,
			margin: 'auto'
		},
		media: {
			height: 160,
		},
		postLink: {
			textDecoration: 'none',
			color: '#3f51b5;',
		},
		userLink: {
			textDecoration: 'none',
			color: '#000000',
		}
	}),
);

interface Props {
	post: PostModel;
}

export default function PostCard(props: any) {
  const classes = useStyles();

	return (
		<Card className={classes.root}>
			<CardActionArea>
				<Link to={`/posts/${props.post.id}`}>
					<CardMedia
						className={classes.media}
						image="../fish.jpg"
						title="Contemplative Reptile"
					/>
				</Link>
				<CardHeader
					avatar={
						<Avatar aria-label="" className={classes.avater} src={props.post.user.image_url}/>
					}
					title={
						<Link to={`/mypages/${props.post.user.uid}`} className={classes.userLink}>{props.post.user.name}</Link>
					}
				/>
				<CardContent className={classes.cardTitle}>
					<Typography  component="h2">
						<Link to={`/posts/${props.post.id}`} className={classes.postLink}>
							<Box fontWeight="fontWeightBold">
								{props.post.name}
							</Box>
						</Link>
					</Typography>
				</CardContent>
				<CardActions>
					<IconButton>
						<FavoriteIcon fontSize="small" />
					</IconButton>
					{props.post.likes_users.length}
				</CardActions>
			</CardActionArea>
		</Card>
	);
}
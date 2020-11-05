import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import VisibilityIcon from '@material-ui/icons/Visibility';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';
import { NoEncryption } from '@material-ui/icons';

const useStyles = makeStyles({
	root: {
		maxWidth: 290,
	},
	media: {
		height: 160,
	},
	nounderline: {
		textDecoration: 'none',
	}
});

export default function PostCard() {
  const classes = useStyles();

	return (
		<Card className={classes.root}>
			<CardActionArea>
				<CardMedia
				className={classes.media}
				image="/static/images/cards/contemplative-reptile.jpg"
				title="Contemplative Reptile"
				/>
				<CardContent>
				<Typography gutterBottom  component="h2">
					記事タイトル
				</Typography>
				</CardContent>
			</CardActionArea>
			<CardActions disableSpacing>
				<IconButton>
					<FavoriteIcon fontSize="small" />
				</IconButton>
				1
				<IconButton>
					<VisibilityIcon fontSize="small"/>
				</IconButton>
				2
			</CardActions>
		</Card>
	);
}
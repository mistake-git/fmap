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
import moment from 'moment'
import { Icon} from '@iconify/react';
import fishIcon from '@iconify-icons/mdi/fish';

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
			margin: 'auto',
			maxWidth: '96%'
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
		},
		smallText: {
			fontSize: '14px'
		},
		fishIcon: {
			height: '24px',
			width: '24px',
			verticalAlign: 'middle'
		}
	}),
);

interface Props {
	post: PostModel;
}

export default function PostCard(props: Props) {
  const classes = useStyles();

	return (
		<Card className={classes.root}>
			<CardActionArea>
				<Link to={`/posts/${props.post.id}`}>
					<CardMedia
						className={classes.media}
						image={props.post.image_url}
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
					<Typography color="textSecondary" className={classes.smallText} gutterBottom>
						{moment(props.post.created_at).format('YYYY年MM月DD日')}
					</Typography>
					
					<Box display="flex">
						<Box flexGrow={1}>
							<Typography  component="h2">
								<Link to={`/posts/${props.post.id}`} className={classes.postLink}>
									<Box fontWeight="fontWeightBold">
									<Icon icon={fishIcon} className={classes.fishIcon}/>{props.post.name}
									</Box>
								</Link>
							</Typography>
						</Box>
						<Box>
							<Typography className={classes.smallText} gutterBottom>
								<Box>
									{props.post.size && `${props.post.size}cm`}
								</Box>
							</Typography>
						</Box>
					</Box>
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


import React, {Fragment} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { Box, Divider } from '@material-ui/core';

const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit">
        Masataka Kitano
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  footerLogo: {
    margin: theme.spacing(2,3),
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 0),
    marginTop: theme.spacing(2),
  },
}));


interface Props {
  description: string
  title: string
}

export default function Footer(props: Props) {
  const classes = useStyles();
  const { description, title } = props;

  return (
    <Fragment>
      <Divider />
      <img src="../../logo.png" className={classes.footerLogo}/>
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          {title}
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          {description}
        </Typography>
      </footer>
      <Divider />
      <Box my={1}>
        <Copyright />
      </Box>
    </Fragment>
    
  );
}

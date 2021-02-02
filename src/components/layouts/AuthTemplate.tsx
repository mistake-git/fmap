import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Card, CardContent, Container } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Copyright } from './Footer';


const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    background: 'url(./site_image.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  title:{
    color: '#3f51b5;',
    fontWeight: 'bold'
  },
  paper: {
    margin: theme.spacing(5, 3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: 'auto',
    backgroundColor: theme.palette.secondary.main,
  },
  link: {
    textDecoration: 'none',
  },
  logo: {
    verticalAlign: "middle",
    zIndex: 1,
  }
}));

interface Props {
  children?: React.ReactNode
  title: string
}

export default function AuthTemplate(props: Props) {
  const classes = useStyles();

  return (
    <Grid container component="main" className={classes.root}>
      <Grid item xs={false} sm={5} md={7} className={classes.image}/>
      <Grid item xs={12} sm={7} md={5} component={Paper} elevation={6} square>
        <Container maxWidth="sm">
          <div className={classes.paper}>
            <Card>
              <Container>
                <CardContent>
                  <Link to={'/'}　className={classes.link}>
                    <Box textAlign="center" my={3}>
                      <img src="../../logo.png"　alt="サイトロゴ" className={classes.logo}/>
                    </Box>
                  </Link>
                  <Typography component="h1" variant="h5">
                    <Box textAlign="center" my={2} className={classes.title}>
                      {props.title}
                    </Box>
                  </Typography>
                  {props.children}
                </CardContent>
              </Container>
            </Card>
            <Box mt={2}>
              <Copyright />
            </Box>
          </div>
        </Container>
      </Grid>
    </Grid>
  );
}

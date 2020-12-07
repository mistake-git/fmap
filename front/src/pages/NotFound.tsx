import React, { Fragment } from 'react'
import { Box, Container, Grid, Typography } from '@material-ui/core'
import Template from '../components/layouts/Template'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  errorText: {
    color: '#3f51b5;',
  },
  textCenter: {
    textAlign: 'center',
  },
}))

const NotFound = (props: any) => {
  const classes = useStyles()

  return (
    <Fragment>
      <Template>
        <Container maxWidth="md" className={classes.textCenter}>
          <Box style={{ marginTop: '11rem', marginBottom: '11rem' }}>
            <Box mt={3}>
              <Typography
                variant="h2"
                gutterBottom
                className={classes.errorText}
              >
                404
              </Typography>
            </Box>
            <Box mb={3}>
              <Typography>お探しのページは見つかりませんでした</Typography>
            </Box>
            <Box>
              <Link to={'/'}>
                <Typography>Topに戻る</Typography>
              </Link>
            </Box>
          </Box>
        </Container>
      </Template>
    </Fragment>
  )
}
export default NotFound

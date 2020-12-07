import React, { Fragment} from "react";
import { Container, Grid, Typography } from "@material-ui/core";
import Template from "../components/layouts/Template";
import { Link } from 'react-router-dom';


const NotFound = (props: any) => {
  return (
    <Fragment>
      <Template>
        <Container maxWidth="md">
          <Grid container spacing={2} style={{ marginTop: "4em" }}>
            <Typography>404</Typography>
            <Typography>お探しのページは見つかりませんでした</Typography>
            <Link to={'/'}>
              <Typography>Topに戻る</Typography>
            </Link>
          </Grid>
        </Container>
        </Template>
    </Fragment>
  );
};
export default NotFound;
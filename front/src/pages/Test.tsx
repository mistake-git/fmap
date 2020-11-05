import { Field, Form, Formik } from "formik";
import { TextField } from "formik-material-ui";
import React, { Fragment, useContext, useEffect } from "react";
import * as Yup from "yup";
import {
  Button,
  Container,
  FormControl,
  Grid,
  Link,
  Typography,
  LinearProgress
} from "@material-ui/core";

import { AuthContext } from "../Auth";
import auth from "../firebase";

export const AuthSchema = Yup.object().shape({
  email: Yup.string()
    .email()
    .required(),
  password: Yup.string()
    .min(6)
    .required()
});

const Test = (props: any) => {
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    // if logged in, redirect to home
    currentUser && props.history.push("/");
  }, [currentUser]);

  return (
    <Fragment>
      <Container>
        テスト
      </Container>
    </Fragment>
  );
};

export default Test;
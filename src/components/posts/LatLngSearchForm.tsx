import React from 'react'
import {
  Button, Grid, InputAdornment,
} from "@material-ui/core";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { TextField } from "formik-material-ui";
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  iconColor: {
    textDecoration: 'none',
    color: '#3f51b5;',
  },
}));

const SearchSchema = Yup.object().shape({
});

interface Props{
  getLatLng: (address: string) => void
  placeHolder: string
}

export default function LatLngSearchForm(props: Props) {
  const classes = useStyles();
  const values ={
    address: '',
  }
  return (
    <Formik
      enableReinitialize={true}
      initialValues={values}
      validationSchema={SearchSchema}
      onSubmit={async value => {
      try {
        const address = value.address
        props.getLatLng(address)
      } 
      catch (error) {
        console.log(error.message);
      }
    }}
    render={({ submitForm,  isSubmitting, isValid,}) => (
    <Form>
      <Grid container spacing={1}>
        <Grid item xs={11}>
          <Field 
          name="address"
          type="text"
          placeholder={props.placeHolder}
          size="small"
          variant="outlined"
          fullWidth
          component={TextField}
          InputProps={{
            startAdornment: 
            <InputAdornment position="end">
              <SearchIcon className={classes.iconColor}/>
            </InputAdornment>,
          }}
        />
        </Grid>
        <Grid item xs={1}>
          <Button
            fullWidth 
            variant="contained"
            color="primary"
            onClick={submitForm}
            disabled={!isValid || isSubmitting}　
          >
            住所検索
          </Button>
        </Grid>
      </Grid>
    </Form>
    )}
  />
  );
}
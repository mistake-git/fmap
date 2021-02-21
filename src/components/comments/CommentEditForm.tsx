import React,{Fragment} from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-material-ui";
import {
  Button,
  Grid,
} from "@material-ui/core";
import CommentModel from "../../models/CommentModel";
import CommentFormModel from "../../forms/CommentFormModel";

const useStyles = makeStyles({
  root: {
    minWidth: 150,
  },
  input: {
    display: 'none',
  },
  marginRight:{
    marginRight: 20,
  }
});

interface Props {
  comment: CommentModel
  handleFormClose: () => void
  updateComment: (comment: CommentFormModel) => {}
}


export default function CommentEditForm(props: Props) {
  const classes = useStyles();
    return (
    <Formik
      enableReinitialize={true}
      initialValues={
        {content: props.comment.content}
      }
      onSubmit={async value => {
        try {
          const comment ={
            id: props.comment.id,
            content: value.content
          }
          props.handleFormClose()
          props.updateComment(comment)
        } catch (error) {
          console.log(error.message);
        }
      }}
    >
      {({ submitForm, isSubmitting, isValid }) => (
        <Form>
          <Field
            fullWidth
            style={{ marginTop: "0.5em", marginBottom: "0.5em" }}
            name="content"
            placeholder="コメントを編集"
            type="text"
            variant="outlined"
            component={TextField}
            multiline={true}
            rows={4}
          />
          <Grid container justify="flex-end">
            <Grid item>
              <Fragment>
                <Button
                  className={classes.marginRight}
                  variant="contained"
                  style={{ marginTop: "0.5em", marginBottom: "0.5em" }}
                  onClick={props.handleFormClose}
                >
                  キャンセル
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={submitForm}
                  style={{ marginTop: "0.5em", marginBottom: "0.5em" }}
                  type="submit"
                  disabled={!isValid || isSubmitting}
                >
                  更新
                </Button>                    
              </Fragment>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
}

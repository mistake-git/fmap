import React, {Fragment, useState}　from "react";
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-material-ui";
import {
  Button,
  Grid,
  LinearProgress,
} from "@material-ui/core";
import PostModel from "../../models/PostModel";
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import CommentModel from "../../models/CommentModel";
import UserModel from "../../models/UserModel";
import CommentFormModel from "../../forms/CommentFormModel";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    progress: {
      display: 'flex',
      '& > * + *': {
        marginLeft: theme.spacing(2),
      },
    },
    root: {
      minWidth: 150,
    },
    input: {
      display: 'none',
    },
    marginRight:{
      marginRight: 20,
    }
  }),
);

interface Props {
  post: PostModel;
}

export const CommentSchema = Yup.object().shape({
  content: Yup.string()
    .required('コメントを入力してください'),
});

interface Props {
  currentUser: UserModel
  post: PostModel
  comments: CommentModel[]
  createComment: (comment: CommentFormModel) => {}
  commentsCount: number
}

export default function CommentForm(props: Props) {

  const classes = useStyles();
  const [buttonOpen, setButtonOpen]= useState(false);

  return (
    <Fragment>
      {props.currentUser &&
        <Fragment>
        <Box my={3}>
          <Divider/>
        </Box>
        <Box fontWeight="fontWeightBold" my={3}　fontSize={16}>
        {props.commentsCount}件のコメント
        </Box>
        　<Formik
            initialValues={{ 
              content: "", 
              post_id: "",
              user_id: ""
            }}
            validationSchema={CommentSchema}
            onSubmit={async (value, {resetForm}) => {
              try {
                const comment ={
                  content: value.content,
                  user_id: props.currentUser.id
                }
              await 
                props.createComment(comment);
                setButtonOpen(false);
                resetForm({})
              } 
              catch (error) {
                console.log(error.message);
              }
            }}
            render={({ submitForm, isSubmitting, isValid }) => (
              <Form>
                {isSubmitting &&<LinearProgress/>}
                <Field
                  fullWidth
                  required
                  style={{ marginTop: "0.5em", marginBottom: "0.5em" }}
                  name="content"
                  placeholder="コメントを入力"
                  type="text"
                  component={TextField}
                  onClick={() => setButtonOpen(true)}
                />
                <Grid container justify="flex-end">
                  <Grid>
                    {buttonOpen &&
                    <Fragment>
                      <Button
                        className={classes.marginRight}
                        variant="contained"
                        style={{ marginTop: "0.5em", marginBottom: "0.5em" }}
                        type="submit"
                        onClick={() => setButtonOpen(false)}
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
                        コメント
                      </Button>                    
                    </Fragment>
                    }
                  </Grid>
                </Grid>
              </Form>
            )}
          />
        </Fragment>
      }
    </Fragment>
  );
}








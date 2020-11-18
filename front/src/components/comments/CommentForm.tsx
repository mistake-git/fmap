import React　from "react";
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

export default function CommentForm(props: any) {

  const classes = useStyles();
  const [buttonOpen, setButtonOpen]= React.useState(false);

  return (
    <div>
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
          onSubmit={async value => {
            try {
              const comment ={
                content: value.content,
                user_id: props.user.id
              }
              await 
              props.createComment(comment);
              setButtonOpen(false);
            } catch (error) {
              alert(error.message);
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
                  <React.Fragment>
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
                  </React.Fragment>
                  }
                </Grid>
              </Grid>
            </Form>
          )}
        />
    </div>
  );
}








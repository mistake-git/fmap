import React, {
  ChangeEvent,
  createRef,
  useContext,
} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-material-ui";
import IconButton from '@material-ui/core/IconButton';
import AttachmentIcon from '@material-ui/icons/Attachment';
import {
  Button,
  Grid,
  LinearProgress,
} from "@material-ui/core";
import PostDateTimePicker from './PostDateTimePicker'
import CancelIcon from '@material-ui/icons/Cancel';
import { AuthContext } from '../../Auth';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';


export const PostSchema = Yup.object().shape({
  name: Yup.string()
    .required('魚種を入力してください'),
});

const useStyles = makeStyles({
  root: {
    minWidth: 150,
  },
  input: {
    display: 'none',
  },
  imageWrapper: {
    position: 'relative',
  },
  cancelButton: {
    position: 'absolute',
    top: '-5px',
    right: '-5px',
    cursor: 'pointer',
  }
});

interface State {
	image?: string;
}

export default function PostNewForm(props: any) {
  const { currentUser } = useContext(AuthContext);
  const classes = useStyles();

  const [src, setSrc] = React.useState('')
  
  const [user, setUser] = React.useState<any>('')

  const ref = createRef<HTMLInputElement>()

  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    new Date(),
  );

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };


  const onClick = () => {
    if (ref.current) {
      ref.current.click()
    }
  }
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files === null) {
      return
    }
    const file = event.target.files.item(0)
    if (file === null) {
      return
    }
    var reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      setSrc(reader.result as string)
    }
  }

  const clear = () => {
    setSrc('');
  };

	return (
		<React.Fragment>
			<Card className={classes.root}>
        <CardContent>
          {src &&
            <React.Fragment>
              <Grid container spacing={3}>
                <Grid item xs={2}></Grid>
                <Grid item xs={8}>
                  <div className={classes.imageWrapper} >
                    <CancelIcon
                      color="primary"
                      onClick={clear}
                      className={classes.cancelButton}
                    />
                    <img src={src} style={{width: '100%'}}/>
                  </div>
                </Grid>
                <Grid item xs={2}></Grid>
              </Grid>
            </React.Fragment> 
          }
          <Formik
          　enableReinitialize={true}
            initialValues={props.values}
            validationSchema={PostSchema}
            onSubmit={async value => {
              try {
                const post ={
                  name: value.name, 
                  size: value.size ,
                  weight: value.weight,
                  number: value.number,
                  feed: value.feed,
                  memo: value.memo,
                  weather: value.weather,
                  date: value.date,
                  time: value.time,  
                  status: value.status,
                  user_id: 1,
                }
                await
                props.action(post);
                console.log(post);
              } catch (error) {
                alert(error.message);
              }
            }}
            render={({ submitForm, isSubmitting, isValid, values }) => (
              <Form>
                <Grid container className={classes.root} spacing={2}>
                {isSubmitting && <LinearProgress />}
                  <Grid item xs={12}>
                    <input 
                      name="image"
                      accept="image" 
                      className={classes.input} 
                      id="icon-button-file" 
                      type="file"
                      onChange={onChange}
                      onClick={onClick}
                    />
                    <label htmlFor="icon-button-file">
                      <IconButton color="primary" aria-label="upload picture" component="span">
                        <AttachmentIcon />
                      </IconButton>
                      ファイルを選択
                    </label>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Field
                      required
                      style={{ marginTop: "0.5em", marginBottom: "0.5em" }}
                      name="name"
                      label="魚種"
                      fullWidth
                      variant="outlined"
                      type="text"
                      component={TextField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />

                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Field
                      style={{ marginTop: "0.5em", marginBottom: "0.5em" }}
                      name="size"
                      label="サイズ"
                      fullWidth
                      variant="outlined"
                      type="number"
                      component={TextField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Field
                      style={{ marginTop: "0.5em", marginBottom: "0.5em" }}
                      name="weight"
                      label="重さ"
                      fullWidth
                      variant="outlined"
                      type="number"
                      component={TextField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Field
                      style={{ marginTop: "0.5em", marginBottom: "0.5em" }}
                      name="number"
                      label="数量"
                      fullWidth
                      variant="outlined"
                      type="number"
                      component={TextField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Field
                      style={{ marginTop: "0.5em", marginBottom: "0.5em" }}
                      name="feed"
                      label="餌"
                      fullWidth
                      variant="outlined"
                      type="text"
                      component={TextField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Field
                      style={{ marginTop: "0.5em", marginBottom: "0.5em" }}
                      name="weather"
                      label="天気"
                      fullWidth
                      variant="outlined"
                      type="text"
                      component={TextField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Field
                      style={{ marginTop: "0.5em", marginBottom: "0.5em" }}
                      name="date"
                      label="日付"
                      fullWidth
                      variant="outlined"
                      type="date"
                      component={TextField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Field
                      style={{ marginTop: "0.5em", marginBottom: "0.5em" }}
                      name="time"
                      label="時間"
                      fullWidth
                      variant="outlined"
                      type="time"
                      component={TextField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      fullWidth
                      style={{ marginTop: "0.5em", marginBottom: "0.5em" }}
                      name="memo"
                      label="メモ"
                      variant="outlined"
                      multiline={true}
                      rows={4}
                      type="text"
                      component={TextField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      onClick={submitForm}
                      style={{ marginTop: "0.5em", marginBottom: "0.5em" }}
                      type="submit"
                      disabled={!isValid || isSubmitting}
                    >
                      釣果を登録
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            )}
          />
        </CardContent>   
			</Card>
		</React.Fragment>
	);
}
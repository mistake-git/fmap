import React, {
  ChangeEvent,
  createRef,
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
import CancelTwoToneIcon from '@material-ui/icons/CancelTwoTone';
import 'date-fns';
import Switch from '@material-ui/core/Switch';



export const PostSchema = Yup.object().shape({
  name: Yup.string()
    .required('魚種を入力してください'),
  number: Yup.number()
  .min(1,'数量は1以上で入力してください')
  .required('数量を入力してください'),
  size: Yup.number()
  .min(1,'サイズは1以上で入力してください')
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
  const classes = useStyles();

  const [src, setSrc] = React.useState('')
  const ref = createRef<HTMLInputElement>()
  const [state, setState] = React.useState({
    status: true,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const onClick = () => {
    if (ref.current) {
      ref.current.click()
    }
  }

  let img = new Image();

  const onChange = (event: ChangeEvent<HTMLInputElement>, setFieldValue: any) => {
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
    img.src = URL.createObjectURL(event.target.files[0]);
  }
  
  const clear = () => {
    setSrc('')
  };

  const forms=[
    {name: "name", label: "魚種(必須)",type: "text"},
    {name: "size", label: "サイズ(cm)",type: "number"},
    {name: "weight", label: "重さ",type: "weight"},
    {name: "number", label: "数量(必須)",type: "number"},
    {name: "date", label: "日付",type: "date"},
    {name: "time", label: "時間",type: "time"},
  ]

	return (
		<React.Fragment>
			<Card className={classes.root}>
        <CardContent>
          {src &&
            <React.Fragment>
              <Grid container spacing={3}>
                <Grid item xs={3}></Grid>
                <Grid item xs={6}>
                  <div className={classes.imageWrapper} >
                    <CancelTwoToneIcon
                      color="inherit"
                      onClick={clear}
                      className={classes.cancelButton}
                    />
                    <img src={src} style={{width: '100%'}}/>
                  </div>
                </Grid>
                <Grid item xs={3}></Grid>
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
                  image: img,
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
                  user_id: props.user.id,
                }

                await
                console.log(post);
                console.log('post value')
                props.action(post);
              } catch (error) {
                alert(error.message);
              }
            }}
            render={({ submitForm, isSubmitting, isValid, setFieldValue}) => (
              <Form>
                <Grid container className={classes.root} spacing={2}>
                {isSubmitting && <LinearProgress />}
                  <Grid item xs={12}>
                    <Field 
                      name="image"
                      accept="image" 
                      className={classes.input} 
                      id="icon-button-file" 
                      type="file"
                      onChange={(event: ChangeEvent<HTMLInputElement>) => onChange(event,setFieldValue)}
                      onClick={onClick}
                    />
                    <label htmlFor="icon-button-file">
                      <IconButton color="primary" aria-label="upload picture" component="span">
                        <AttachmentIcon />
                      </IconButton>
                      ファイルを選択
                    </label>
                  </Grid>
                  {forms.map((form) => (
                    <Grid item xs={12} md={6}>
                      <Field
                        style={{ marginTop: "0.5em", marginBottom: "0.5em" }}
                        name={form.name}
                        label={form.label}
                        fullWidth
                        variant="outlined"
                        type={form.type}
                        component={TextField}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Grid>
                  ))}
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
                    <Switch
                      checked={state.status}
                      onChange={handleChange}
                      color="primary"
                      name="status"
                      inputProps={{ 'aria-label': 'primary checkbox' }}
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
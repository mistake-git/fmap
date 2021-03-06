import React, {
  ChangeEvent,
  createRef,
  Fragment,
  useState,
} from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-material-ui";
import IconButton from '@material-ui/core/IconButton';
import {
  Box,
  Button,
  Collapse,
  DialogActions,
  Grid,
  InputAdornment,
  LinearProgress,
  MenuItem,
} from "@material-ui/core";
import 'date-fns';
import { createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import MapPicker from 'react-google-map-picker'
import * as Yup from "yup";
import UserModel from '../../models/UserModel';
import CancelIcon from '@material-ui/icons/Cancel';
import PostsRepository from '../../repositories/PostsRepository';
import LatLngSearchForm from './LatLngSearchForm';
import PostModel from '../../models/PostModel';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import { useDispatch } from 'react-redux';
import { updateMessage, updateOpen, updateSeverity } from '../../actions/Flash';

const katakanaRegExp = /^[ァ-ヶー　 ]+$/
export const PostSchema = Yup.object().shape({
  name: Yup.string()
    .matches(katakanaRegExp,'カタカナで入力してください')
    .required('魚種を入力してください'),
  number: Yup.number()
  .min(1,'数量は1以上で入力してください')
  .required('数量を入力してください'),
});

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      position: 'relative',
    },
    formTitle: {
      color: '#3f51b5;',
      fontWeight: 'bold'
    },
    root: {
      minWidth: 150,
      marginTop: theme.spacing(2),
    },
    imageWrapper: {
      position: 'relative',
    },
    cancelButton: {
      position: 'absolute',
      top: '-5px',
      right: '-5px',
      cursor: 'pointer',
    },
    buttons: {
      '& > *': {
        marginTop: theme.spacing(1),
      },
    },
  }),
);

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface Props {
  currentUser: UserModel
  lat: any
  lng: any
  values: any
  action: any
  title: string
  post?: PostModel
  handleFlash: (message: string, severity: 'success'|'error') => void
}

export default function PostForm(props: Props) {
  
  const DefaultLocation = { 
    lat: props.lat,
    lng: props.lng
  };

  const DefaultZoom = 10;
  const classes = useStyles();
  const [image, setImage] = useState<File | null>(null)
  const [src, setSrc] = useState('')
  const ref = createRef<HTMLInputElement>()
  const [defaultLocation, setDefaultLocation] = useState(DefaultLocation);
  const [currentLocation, setCurrentLocation] = useState(defaultLocation);
  const [zoom, setZoom] = useState<number>(DefaultZoom);
  const [open, setOpen] = useState<boolean>(false);
  const [collapseOpen, setCollapseOpen] = useState<boolean>(false);
  const　placeHolder ="住所を入力　例 東京都多摩市"
  const apiKey = process.env.REACT_APP_GOOGLE_MAP_KEY

  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickCollapseOpen = () => {
    setCollapseOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCollapseClose = () => {
    setCollapseOpen(false);
  };
  
  const handleChangeLocation = (lat: number, lng: number) => {
    setCurrentLocation({lat:　lat, lng:　lng}) 
  }
  
  const handleChangeZoom = (newZoom: number) =>{
    setZoom(newZoom);
  }
 
  const handleResetLocation = () => {
    setDefaultLocation({...DefaultLocation});
    setZoom(DefaultZoom);
  }

  const getLatLng = async(address: string) => {
    try { 
    await
      PostsRepository.getLatLng(address)
      .then((results) => {
        console.log(results)
        const ResultLocation = { 
          lat: results.lat,
          lng: results.lng
        };
        setDefaultLocation({...ResultLocation});
      })
    }
    catch (error) {
      console.log(error.message);
    }
  }

  const getCurrentPosition = () => {
    navigator.geolocation.getCurrentPosition(successFunc, errorFunc, options);
  };

  const successFunc = (position: any) =>{
    const { latitude, longitude } = position.coords;
      setOpen(true);
      setCurrentLocation({lat:　latitude, lng:　longitude})
      setDefaultLocation({lat:　latitude, lng:　longitude})
      dispatch(updateMessage('位置情報を取得しました'))
      dispatch(updateSeverity('success'))
      dispatch(updateOpen(true))
  }

  const errorFunc = (error: any) => {
    var errorMessageList = [
      {message: "原因不明のエラーが発生しました"},
      {message:  "位置情報の取得が許可されませんでした"},
      {message:  "電波状況などで位置情報が取得できませんでした。"},
      {message:  "要求がタイムアウトしました。"},
    ]
    const errorMessage = errorMessageList[error.code]
    dispatch(updateMessage(errorMessage.message))
    dispatch(updateSeverity('error'))
    dispatch(updateOpen(true))
  }

  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };
  
  const onClick = () => {
    if (ref.current) {
      ref.current.click()
    }
  }

  const onChange = (event: ChangeEvent<HTMLInputElement>, setFieldValue: any) => {
    if (event.target.files === null) {
      return
    }
    const file = event.target.files[0]

    setImage(file)
    console.log(file)
    console.log('file')

    if (file === null) {
      return
    }
    var reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      setSrc(reader.result as string)
    }
    setFieldValue("image",reader.result as string)
  }
  
  const clear = () => {
    setSrc('')
  };
  
	return (
		<Fragment>
			<Card className={classes.root}>
        <CardContent>
          <Grid item xs={12}>
            <Box textAlign="center">
              <Typography variant="h5" component="h2" className={classes.formTitle}>
                {props.title}
              </Typography>
            </Box>
          </Grid>
          {src &&
            <Fragment>
              <Grid container spacing={5}>
                <Grid item xs={2} md={3}></Grid>
                <Grid item xs={8} md={6}>
                  <div className={classes.imageWrapper} >
                    <CancelIcon
                      color="primary"
                      onClick={clear}
                      className={classes.cancelButton}
                    />
                    <img src={src}　alt="画像プレビュー" style={{width: '100%'}}/>
                  </div>
                </Grid>
                <Grid item xs={2} md={3}></Grid>
              </Grid>
            </Fragment> 
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
                  latitude: currentLocation.lat,
                  longitude: currentLocation.lng,
                }
              await
                props.action(post,image);
              } 
              catch (error) {
                console.log(error.message);
              }
            }}>
            {({ submitForm, isSubmitting, isValid, setFieldValue}) => (
              <Form>
                <Grid container className={classes.root} spacing={3}>
                  {isSubmitting && <LinearProgress />}
                    <Grid item xs={12}>
                      <Field 
                        name="image"
                        accept="image" 
                        multiple={false}
                        id="icon-button-file" 
                        type="file"
                        encType="multipart/form-data"
                        onChange={(event: ChangeEvent<HTMLInputElement>) => onChange(event,setFieldValue)}
                        onClick={onClick}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Field
                        style={{ marginTop: "0.5em", marginBottom: "0.5em" }}
                        name="name"
                        label="魚種(必須),カタカナ"
                        fullWidth
                        variant="outlined"
                        type="text"
                        component={TextField}
                        size="small"
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Field
                        style={{ marginTop: "0.5em", marginBottom: "0.5em" }}
                        name="number"
                        label="数量(必須)"
                        fullWidth
                        variant="outlined"
                        type="number"
                        size="small"
                        component={TextField}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        InputProps={{
                          inputProps: { min: 1},
                          endAdornment: <InputAdornment position="end">匹</InputAdornment>,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} md={12}>
                      {collapseOpen?
                         <Button startIcon={<ExpandLessIcon/> } onClick={handleCollapseClose}>
                          閉じる
                        </Button>:
                        <Button startIcon={<KeyboardArrowDownIcon/> } onClick={handleClickCollapseOpen}>
                          詳細に入力する
                        </Button>
                      }
                    </Grid>
                  </Grid>
                  <Collapse in={collapseOpen}>
                    <Grid container className={classes.root} spacing={3}>
                      <Grid item xs={12} md={6}>
                        <Field
                          style={{ marginTop: "0.5em", marginBottom: "0.5em" }}
                          name="date"
                          label="釣った日"
                          fullWidth
                          variant="outlined"
                          type="date"
                          component={TextField}
                          size="small"
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
                          size="small"
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
                          type="text"
                          component={TextField}
                          size="small"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          InputProps={{
                            inputProps: { min: 1},
                            endAdornment: <InputAdornment position="end">g</InputAdornment>,
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
                          size="small"
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
                          size="small"
                          component={TextField}
                          InputProps={{
                            inputProps: { min: 1},
                            endAdornment: <InputAdornment position="end">cm</InputAdornment>,
                          }}
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Field
                          style={{ marginTop: "0.5em", marginBottom: "0.5em" }}
                          name="weather"
                          select={true}
                          label="天気"
                          fullWidth
                          variant="outlined"
                          as="select"
                          size="small"
                          component={TextField}
                          InputLabelProps={{
                            shrink: true,
                          }}
                        >
                          {['晴天', '晴れ', '雨', '大雨', '曇り', '雪', 'その他'].map((value, index) => (
                            <MenuItem key={index} value={value}>
                              {value}
                            </MenuItem>
                          ))}
                        </Field>
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
                          size="small"
                          component={TextField}
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      </Grid>
                    </Grid>
                  </Collapse>
                  <Grid container className={classes.root} spacing={3}>
                    <Grid item xs={12} md={12}>
                      <Typography variant="body2" gutterBottom　style={{ marginTop: "0.5em"}}>
                        位置情報(必須)
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Button variant="outlined" color="primary" onClick={handleClickOpen} fullWidth >
                        地図で場所を選択する
                      </Button>
                      <Typography variant="body2" gutterBottom　style={{ marginTop: "0.5em"}}>
                        ※地図から位置を選択する場合はこちら
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Button variant="outlined" color="primary" onClick={getCurrentPosition} fullWidth>
                        現在地を取得する
                      </Button>
                      <Typography variant="body2" gutterBottom　style={{ marginTop: "0.5em"}}>
                        ※現在地から登録する場合はこちら
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Fragment>
                        <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                          <AppBar className={classes.appBar}>
                            <Toolbar>
                              <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                                <CloseIcon />
                              </IconButton>
                                地図で釣った場所を選択してください(必須)
                            </Toolbar>
                          </AppBar>
                          <Fragment>
                            緯度:{currentLocation.lat}
                            経度:{currentLocation.lng}
                            拡大率:{zoom}
                            <Box my={2}>
                              <LatLngSearchForm
                                getLatLng={getLatLng}
                                placeHolder={placeHolder}
                              /> 
                            </Box>
                            <MapPicker defaultLocation={defaultLocation}
                              zoom={zoom}
                              style={{height:'700px'}}
                              onChangeLocation={handleChangeLocation} 
                              onChangeZoom={handleChangeZoom}
                              apiKey={apiKey!}
                            />
                            <DialogActions>         
                              <Button 
                                variant="contained"　
                                onClick={handleResetLocation}
                                color="secondary" 
                              >
                                位置情報をリセット
                              </Button>
                              <Button 
                                variant="contained" 
                                color="primary" 
                                autoFocus　
                                onClick={handleClose}　
                              >
                                完了
                              </Button>
                          </DialogActions>
                        </Fragment>
                      </Dialog>
                    </Fragment>
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      onClick={submitForm}
                      type="submit"
                      disabled={!isValid || isSubmitting}
                    >
                      釣果を登録
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </CardContent>   
			</Card>
		</Fragment>
	);
}

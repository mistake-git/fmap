import React, { Fragment} from "react";
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';


const useStyles = makeStyles(() => ({
  loading: {
    position: "fixed", 
    top: 0, 
    left: 0, 
    width: "100%", 
    height: "100%", 
    display: "flex", 
    justifyContent: "center", 
    alignItems: "center",
    zIndex:10,
  }
}));

const Loading = (props: any) => {
 
  const classes = useStyles();
  return (
    <Fragment>
        <div className={classes.loading}>
          <CircularProgress/>
        </div>
    </Fragment>
  );
};
export default Loading;
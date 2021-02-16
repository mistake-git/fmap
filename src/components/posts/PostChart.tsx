import React, {Fragment} from "react";
import PieChart from "../chart/PieChart"
import BarChart  from "../chart/BarChart";
import HorizontalBarChart  from "../chart/HorizontalBarChart";
import LineChart  from "../chart/LineChart";
import {  Divider, Grid, Typography } from "@material-ui/core";
import PostModel from "../../models/PostModel";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  objectBlank: {
    width: "100%", 
    height: "200px", 
    display: "flex", 
    justifyContent: "center", 
    alignItems: "center",
    zIndex:10,
  }
}));

export default function PostData(props: any) {
  const classes = useStyles();
  const datalist = [
    {
    key: 1,
    title: 
      `${props.post.name}のよく釣れる餌`, 
    chart:
      Object.keys(props.feedData).length ? 
      <PieChart
        data={props.feedData}
      />: 
      <div className={classes.objectBlank}>データがありません</div> 
    },
    { 
      key: 2,
      title: 
        `${props.post.name}のよく釣れる時期`, 
      chart:
        Object.keys(props.dateData).length ?
        <BarChart
          data={props.dateData}
        />: 
        <div className={classes.objectBlank}>データがありません</div> 
    },
    { key: 3,
      title: 
        `${props.post.name}のよく釣れる時間`, 
      chart:
        Object.keys(props.timeData).length ?
        <LineChart
          data={props.timeData}
        />:
        <div className={classes.objectBlank}>データがありません</div> 
    },
    { key: 4,
      title: 
        `${props.post.name}のサイズ分布`, 
      chart: 
        Object.keys(props.sizeData).length ?
        <HorizontalBarChart
        data={props.sizeData}
        />:
        <div className={classes.objectBlank}>データがありません</div> 
    },
  ]

  return(
    <Fragment>
      <Divider/>
      <Grid container style={{ marginTop: "1em" }}>
        {datalist.map((data) => (
          <Grid item xs={12} sm={6} style={{ marginTop: "1em" }} key={data.key}>
            <Typography variant="button" display="block" gutterBottom>
            {data.title}
            </Typography>
            {data.chart}
          </Grid>
        ))}
      </Grid>
    </Fragment>
  )
}

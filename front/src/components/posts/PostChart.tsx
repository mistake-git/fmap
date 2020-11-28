import React from "react";
import PieChart from "../chart/PieChart"
import BarChart  from "../chart/BarChart";
import HorizontalBarChart  from "../chart/HorizontalBarChart";
import LineChart  from "../chart/LineChart";
import {  Divider, Grid, Typography } from "@material-ui/core";
import PostModel from "../../models/PostModel";


interface Props {
  post: PostModel;
}


export default function PostData(props: any) {
  
　
  const datalist =[
    {
    title: 
      `${props.post.name}のよく釣れる餌`, 
    chart:
      <PieChart
        data={props.dateData}
      />
    },
    {
      title: 
        `${props.post.name}のよく釣れる時期`, 
      chart:
        <BarChart
          data={props.dateData}
        />
    },
    {
      title: 
        `${props.post.name}のよく釣れる時間`, 
      chart:
        <LineChart
          data={props.timeData}
        />
    },
    {
      title: 
        `${props.post.name}のサイズ分布`, 
      chart: 
       <div></div>
    },
  ]

  return(
    <React.Fragment>
      <Divider/>
      <Grid container style={{ marginTop: "1em" }}>
        {datalist.map((data) => (
          <Grid item xs={12} sm={6} style={{ marginTop: "1em" }}>
            <Typography variant="button" display="block" gutterBottom>
            {data.title}
            </Typography>
            {data.chart}
          </Grid>
        ))}
      </Grid>
    </React.Fragment>
  )
}

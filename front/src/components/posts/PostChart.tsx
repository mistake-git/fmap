import Pie from "../chart/Pie"
import Bar  from "../chart/Bar";
import HorizontalBar  from "../chart/HorizontalBar";
import Line  from "../chart/Line";
import React, { Fragment, useContext, useEffect } from "react";
import { Button, Container, Divider, Grid, Typography } from "@material-ui/core";
import { AuthContext } from "../../Auth";
import auth from "../../firebase";
import Template from "../layouts/Template";
import PostCard from "./PostCard"
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Box from '@material-ui/core/Box';
import EditIcon from '@material-ui/icons/Edit';
import PostButtons from "./PostButtons"
import UserCard from "../users/UserCard"
import PostModel from "../../models/PostModel";


interface Props {
  post: PostModel;
}


export default function PostData(props: any) {
  return(
    <React.Fragment>
      <Box fontWeight="fontWeightBold" mt={5} mb={2}　fontSize={16}>
        {props.post.name}のデータ分析
      </Box>
      <Divider/>
      <Grid container style={{ marginTop: "1em" }}>
        <Grid item xs={12} sm={6} style={{ marginTop: "1em" }}>
          <Typography variant="button" display="block" gutterBottom>
            {props.post.name}のよく釣れる餌
          </Typography>
          <Pie/>
        </Grid>
        <Grid item xs={12} sm={6} style={{ marginTop: "1em" }}>
          <Typography variant="button" display="block" gutterBottom>
            {props.post.name}のよく釣れる時期
          </Typography>
          <Bar/>
        </Grid>
        <Grid item xs={12} sm={6} style={{ marginTop: "1em" }}>
          <Typography variant="button" display="block" gutterBottom>
            {props.post.name}のよく釣れる時間
          </Typography>
          <Line/>
        </Grid>
        <Grid item xs={12} sm={6} style={{ marginTop: "1em" }}>
          <Typography variant="button" display="block" gutterBottom>
            {props.post.name}のサイズの分布
          </Typography>
          <HorizontalBar/>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

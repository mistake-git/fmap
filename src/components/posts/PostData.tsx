import React,{Fragment} from 'react';
import Divider from '@material-ui/core/Divider';
import { Box, Grid } from '@material-ui/core';
import PostModel from '../../models/PostModel';
import moment from 'moment'

export default function PostData(props: any) {

  const datalist = [
    {key: 1, label: '魚種', content: props.post.name },
    {key: 2, label: '投稿日', content: props.post.created_at && moment(props.post.created_at).format('YYYY年MM月DD日')},
    {key: 3, label: '釣った時間', content: props.post.time &&　props.post.time},
    {key: 4, label: '釣った日', content: props.post.date && moment(props.post.date).format('YYYY年MM月DD日')},
    {key: 5, label: '数量', content: props.post.number},
    {key: 6, label: 'サイズ', content: props.post.size && `${props.post.size}cm` },
    {key: 7, label: '重さ', content: props.post.weight &&`${props.post.weight}g` },
    {key: 8, label: '餌', content: props.post.feed },
    {key: 9, label: '天候', content: props.post.weather},
  ];

  return (
    <Fragment>
      <Box fontWeight="fontWeightBold" mb={2}　fontSize={16}>
        {props.post.name}のデータ
      </Box>
      <Divider/>
      {datalist.map((data) => (
        <Grid container style={{ marginTop: "1em" }} key={data.key}>
          <Grid item xs={12} sm={2} style={{ marginTop: "1em" }}>
            {data.label}
          </Grid>
          <Grid item xs={12} sm={3} style={{ marginTop: "1em" }}>
          <Box fontWeight="fontWeightBold">
            {data.content}
          </Box>
          </Grid>
        </Grid>
      ))}
    </Fragment>
  );
}
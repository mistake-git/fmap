import React from 'react';
import Divider from '@material-ui/core/Divider';
import { Box, Grid } from '@material-ui/core';
import PostModel from '../../models/PostModel';
import moment from 'moment'


interface Props {
  post: PostModel;
}

export default function PostData(props: any) {

  const datalist = [
    { id: 1, label: '投稿日', content: props.post.created_at && moment(props.post.created_at).format('YYYY年MM月DD日')},
    { id: 2, label: '日付', content: props.post.date && moment(props.post.date).format('YYYY年MM月DD日')},
    { id: 3, label: '数量', content: props.post.number},
    { id: 4, label: '時間', content: props.post.time && moment(props.post.time).format('LTS')},
    { id: 5, label: '魚種', content: props.post.name },
    { id: 6, label: 'サイズ', content: props.post.size && `${props.post.size}cm` },
    { id: 7, label: '重さ', content: props.post.weight &&`${props.post.weight}kg` },
    { id: 8, label: '餌', content: props.post.feed },
    { id: 9, label: '天候', content: props.post.weather},
  ];

  return (
    <React.Fragment>
      <Box fontWeight="fontWeightBold" mb={2}　fontSize={16}>
        {props.post.name}のデータ
      </Box>
      <Divider/>
      {datalist.map((data) => (
        <Grid container style={{ marginTop: "1em" }} key={data.id}>
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
    </React.Fragment>
  );
}
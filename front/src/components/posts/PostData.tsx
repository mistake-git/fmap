import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem, { ListItemProps } from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import { Box, Grid, Typography } from '@material-ui/core';
import PostModel from '../../models/PostModel';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
  }),
);

interface Props {
  post: PostModel;
}

export default function PostData(props: any) {
  const classes = useStyles();

  const datalist = [
    { label: '日付', content: props.post.date },
    { label: '時間', content: props.post.time },
    { label: '魚種', content: props.post.name },
    { label: 'サイズ', content: props.post.size },
    { label: '重さ', content: props.post.weight },
    { label: '餌', content: props.post.feed },
    { label: '天候', content: props.post.weather},
  ];

  return (
    <React.Fragment>
      <Box fontWeight="fontWeightBold" mt={5} mb={2}　fontSize={16}>
        {props.post.name}のデータ
      </Box>
      <Divider/>
      {datalist.map((data) => (
        <Grid container style={{ marginTop: "1em" }}>
          <Grid item xs={12} sm={2} style={{ marginTop: "1em" }}>
            {data.label}
          </Grid>
          <Grid item xs={12} sm={3} style={{ marginTop: "1em" }}>
            {data.content}
          </Grid>
        </Grid>
      ))}
    </React.Fragment>
  );
}
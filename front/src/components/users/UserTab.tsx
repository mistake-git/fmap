import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import DescriptionIcon from '@material-ui/icons/Description';
import { Divider, Grid } from '@material-ui/core';
import PostModel from '../../models/PostModel';
import PostCard from '../posts/PostCard';
import PieChart from '../chart/PieChart';
import PieChartIcon from '@material-ui/icons/PieChart';
import MapIcon from '@material-ui/icons/Map';
import GoogleMap from '../map/GoogleMap';

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {

  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-prevent-tabpanel-${index}`}
      aria-labelledby={`scrollable-prevent-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `scrollable-prevent-tab-${index}`,
    'aria-controls': `scrollable-prevent-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
  },
}));

export default function UserTab(props: any) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Divider/>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="scrollable prevent tabs example"
      >
        <Tab icon={<DescriptionIcon />} aria-label="post" {...a11yProps(0)} label={`投稿${props.posts.length}`} />
        <Tab icon={<FavoriteIcon />} aria-label="favorite" {...a11yProps(1)} label={`いいね${props.likesPosts.length}`} />
        <Tab icon={<PieChartIcon/>} aria-label="chart" {...a11yProps(2)} label="グラフ"/>
        <Tab icon={<MapIcon/>} aria-label="map" {...a11yProps(3)} label="地図"/>
      </Tabs>
      <Divider/>
      <TabPanel value={value} index={0}>
        <Grid container style={{ marginTop: "3em" }} spacing={2}>
          {props.posts.map((post: PostModel) => {
            return(
              <Grid item xs={12} sm={6} md={4} style={{ marginTop: "1em" }}>
                <PostCard post={ post } />
              </Grid>
            )
          })}
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Grid container style={{ marginTop: "3em" }} spacing={2}>
          {props.likesPosts.map((post: PostModel) => {
            return(
              <Grid item xs={12} sm={6} md={4} style={{ marginTop: "1em" }}>
                <PostCard 
                  post={ post }
                />
              </Grid>
            )
          })}
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={2}>
          <PieChart 
            data={props.userData}
          />
      </TabPanel>
      <TabPanel value={value} index={3}>
          <GoogleMap/>
      </TabPanel>
    </div>
  );
}
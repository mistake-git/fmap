import React ,{ useState } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Typography from '@material-ui/core/Typography';
import DescriptionIcon from '@material-ui/icons/Description';
import { Divider, Grid } from '@material-ui/core';
import PostModel from '../../models/PostModel';
import PostCard from '../posts/PostCard';
import PieChart from '../chart/PieChart';
import PieChartIcon from '@material-ui/icons/PieChart';
import MapIcon from '@material-ui/icons/Map';
import GoogleMap from '../map/GoogleMap';
import UserModel from '../../models/UserModel';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: boolean | number;
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
        <Typography>{children}</Typography>
      )}
    </div>
  );
}

function a11yProps(index: number) {
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

interface Props {
  posts: PostModel[]
  likesPosts: PostModel[]
  userData: any
  user: UserModel
}

export default function UserTab(props: Props) {
  const classes = useStyles();
  const [value, setValue] = useState(0);

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
      <Grid container style={{ marginTop: "1rem" }}>
          {props.posts.map((post: PostModel) => {
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
      <TabPanel value={value} index={1}>
        <Grid container style={{ marginTop: "1rem" }}>
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
        <div  style={{ marginTop: "1em" }}>
          <PieChart 
            data={props.userData}
          />
        </div>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <div  style={{ marginTop: "1em" }}>
          <GoogleMap
            currentUser={props.user}
            posts={props.posts}
          />
        </div>
      </TabPanel>
    </div>
  );
}
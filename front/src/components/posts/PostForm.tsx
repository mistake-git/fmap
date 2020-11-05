import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles({
  root: {
    minWidth: 150,
  },
});

  const admins = [
		{
			value: 0,
			label: '閲覧',
		},
		{
			value:  1,
			label: '執筆',
		},
		{
			value: 2,
			label: '管理',
		},
  ];

  const departments = [
		{
			value: 0,
			label: '営業',
		},
		{
			value:  1,
			label: '総務',
		},
		{
			value: 2,
			label: 'ITソリューション',
		},
  ];

export default function PostsForm() {
  const classes = useStyles();
	return (
		<React.Fragment>
			<Card className={classes.root}>
      <CardContent>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            margin="dense"
            id="name"
            label="魚種"
            type="text"
            fullWidth
            variant="outlined"
          />

          <TextField
            required
            margin="dense"
            id="number"
            label="匹数"
            type="number"
            fullWidth
            variant="outlined"
          />        
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="outlined-select-currency-native"
            select
            label="部署を選択"
            margin="dense"
            fullWidth
            SelectProps={{
              native: true,
            }}
            helperText="部署を選択してください"
            variant="outlined"
            >
            {departments.map((department) => (
              <option key={department.value} value={department.value}>
              {department.label}
              </option>
            ))}
          </TextField>
        </Grid>
      </Grid>
       
          <TextField
            id="outlined-select-currency-native"
            select
            label="権限を選択"
            margin="dense"
            fullWidth
            SelectProps={{
                    native: true,
            }}
            helperText="権限を選択してください"
            variant="outlined"
            >
            {admins.map((admin) => (
              <option key={admin.value} value={admin.value}>
              {admin.label}
              </option>
            ))}
          </TextField>
        </CardContent>
        <CardActions>
        <Button
        variant="contained"
        color="primary"
        fullWidth
        >
          釣果を登録
        </Button>
        </CardActions>
			</Card>
		</React.Fragment>
	);
}
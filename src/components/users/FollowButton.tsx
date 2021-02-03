import { Button } from "@material-ui/core";
import React, { Fragment, useContext} from "react";
import AddIcon from '@material-ui/icons/Add';


export default function FollowButton(props: any) {

  
	return (
    <Fragment>
       <Button
        variant="contained"
        color="primary"
        fullWidth
        startIcon={<AddIcon />}
      >
        フォロー
      </Button>
    </Fragment>
	);
}
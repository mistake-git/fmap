import { Button,Hidden,Typography} from "@material-ui/core";
import React, { Fragment} from "react";
import UserModel from "../../models/UserModel";
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';


interface Props {
  user: UserModel;
  currentUser: UserModel | null;
  createRelationships: (follow_id: number) => {}
  destroyRelationships: (user_id: number, follow_id: number) => {}
  isFollowed: boolean
}

export default function FollowButton(props: Props) {

  const follow = () => {
    props.createRelationships(props.user.id)
  }

  const unFollow = () => {
    props.destroyRelationships(props.currentUser!.id, props.user.id)
  }

	return (
    <Fragment>
    { props.isFollowed?
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={unFollow}
        startIcon={
          <Hidden smDown>
            <RemoveIcon/>
          </Hidden>
        }
      >
        フォロー中
      </Button>
      :
      <Button
        variant="contained"
        color="default"
        fullWidth
        onClick={follow}
        startIcon={
          <Hidden smDown>
            <AddIcon/>
          </Hidden>
        }
      >
        フォロー
      </Button>
    }
    </Fragment>
	);
}
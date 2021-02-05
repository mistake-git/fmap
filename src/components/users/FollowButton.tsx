import { Button } from "@material-ui/core";
import React, { Fragment} from "react";
import AddIcon from '@material-ui/icons/Add';
import UserModel from "../../models/UserModel";
import RemoveIcon from '@material-ui/icons/Remove';

interface Props {
  user: UserModel;
  currentUser: UserModel;
  createRelationships: (user_id: number, follow_id: number) => {}
  destroyRelationships: (user_id: number, follow_id: number) => {}
  isFollowed: boolean
}

export default function FollowButton(props: Props) {

  const follow = () => {
    props.createRelationships(props.currentUser.id, props.user.id)
  }

  const unFollow = () => {
    props.destroyRelationships(props.currentUser.id, props.user.id)
  }

	return (
    <Fragment>
    { props.isFollowed?
      <Button
          variant="contained"
          color="primary"
          fullWidth
          startIcon={<RemoveIcon />}
          onClick={unFollow}
        >
        フォロー解除
      </Button>
      :
      <Button
        variant="contained"
        color="default"
        fullWidth
        startIcon={<AddIcon />}
        onClick={follow}
      >
        フォロー
      </Button>
    }
    </Fragment>
	);
}
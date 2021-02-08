import { Button,Typography} from "@material-ui/core";
import React, { Fragment} from "react";
import UserModel from "../../models/UserModel";

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
          onClick={unFollow}
        >
          フォロー中
      </Button>
      :
      <Button
        variant="contained"
        color="default"
        fullWidth
        onClick={follow}
      >
        <Typography variant="button">フォロー</Typography>
      </Button>
    }
    </Fragment>
	);
}
import { Button } from "@material-ui/core";
import React, { Fragment} from "react";
import AddIcon from '@material-ui/icons/Add';
import UserModel from "../../models/UserModel";
import RemoveIcon from '@material-ui/icons/Remove';

interface Props {
  postUser: UserModel;
  currentUser: UserModel;
  createRelationships: (user_id: number, follow_id: number) => {}
  destroyRelationships: (user_id: number, follow_id: number) => {}
}

export default function FollowButton(props: Props) {

  const follow = () => {
    props.createRelationships(props.currentUser.id, props.postUser.id)
  }

  const unFollow = () => {
    props.destroyRelationships(props.currentUser.id, props.postUser.id)
  }

	return (
    <Fragment>

        <Button
           variant="contained"
           color="primary"
           fullWidth
           startIcon={<RemoveIcon />}
           onClick={unFollow}
         >
          フォロー解除
        </Button>

        <Button
        variant="contained"
        color="default"
        fullWidth
        startIcon={<AddIcon />}
        onClick={follow}
        >
          フォロー
        </Button>

    </Fragment>
	);
}
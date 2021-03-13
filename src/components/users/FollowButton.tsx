import { Button,Hidden} from "@material-ui/core";
import React, { Fragment, useContext} from "react";
import UserModel from "../../models/UserModel";
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { AuthContext } from "../../Auth";
import { CurrentUserContext } from "../../CurrentUser";

interface Props {
  user: UserModel;
  createRelationships: (follow_id: number) => {}
  destroyRelationships: (user_id: number, follow_id: number) => {}
  isFollowed: boolean
}

export default function FollowButton(props: Props) {
  const { firebaseAuthUser } = useContext(AuthContext)
  const {currentUser} = useContext(CurrentUserContext)

  const follow = () => {
    props.createRelationships(props.user.id)
  }

  const unFollow = () => {
    props.destroyRelationships(currentUser!.id, props.user.id)
  }

	return (
    <Fragment>
    {firebaseAuthUser && props.isFollowed?  
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
        フォロー
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
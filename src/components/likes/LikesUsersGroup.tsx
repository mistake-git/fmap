import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import UserModel from '../../models/UserModel';

interface Props {
  likesUsers: UserModel[]
}

export default function LikesUsersGroup(props: Props) {

  return (
    <AvatarGroup max={4}>
      {props.likesUsers.map((likeUser: UserModel) => (
        <Avatar alt={likeUser.name} key={likeUser.id} src={likeUser.image_url} />
      ))}     
    </AvatarGroup>
  );
}
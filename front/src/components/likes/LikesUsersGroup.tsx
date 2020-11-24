import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import UserModel from '../../models/UserModel';

export default function LikesUsersGroup(props: any) {

  return (
    <AvatarGroup max={4}>
      {props.likesUsers.map((user: UserModel) => (
        <Avatar alt={user.name} key={user.id} src="/static/images/avatar/1.jpg" />
      ))}     
    </AvatarGroup>
  );
}
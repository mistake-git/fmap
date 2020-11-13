import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import axios from 'axios'

const ITEM_HEIGHT = 48;

export default function CommentMenu(props: any) {

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const deleateComment = (id: any) => {
    axios.delete(`http://localhost:3000/api/v1/posts/${props.post.id}/comments/${props.comment.id}`)
    .then((response) => {
      props.history.push("/posts");
    })
    .catch((data) =>{
      console.log(data)
    })
  }

  const options = [
    {
    item: 
      <React.Fragment>
        <Edit color="action" />編集
      </React.Fragment>,
    },
    {item:
      <React.Fragment>
        <Delete color="action"
          onClick={deleateComment}
        />削除
      </React.Fragment>,
    }
  ];

  return (
    <div>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
        {options.map((option) => (
          <MenuItem onClick={handleClose}>
            {option.item}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
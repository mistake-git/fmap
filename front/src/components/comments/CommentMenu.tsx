import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';

const options = [
  {
  item: 
    <React.Fragment>
      <Edit color="action" />編集
    </React.Fragment>,
  action: ""
  
  },
  {item:
    <React.Fragment>
      <Delete color="action" />削除
    </React.Fragment>,
  action: ""
  }
];

const ITEM_HEIGHT = 48;

export default function CommentMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
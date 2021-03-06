import React, {useState} from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import CommentModel from '../../models/CommentModel';
import PostModel from '../../models/PostModel';

const ITEM_HEIGHT = 48;

interface Props {
  post: PostModel
  comment: CommentModel
  destroyComment: (id: number) => {}
  handleFormOpen: () => void
}

export default function CommentMenu(props: Props) {

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleFormOpen = () =>{
    props.handleFormOpen()
    setAnchorEl(null);
  }

  const handleDelete = () =>{
    props.destroyComment(props.comment.id!)
    setAnchorEl(null);
  }

  const options = [
    {
    id: 1,
    item:
    <MenuItem onClick={handleFormOpen}> 
      <Edit color="action" />編集
    </MenuItem>
    },
    {
      id:2,
      item:
      <MenuItem onClick={handleDelete}>
        <Delete color="action"
        />削除
      </MenuItem>
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
          <div key={option.id}>
             {option.item}
          </div>
        ))}
      </Menu>
    </div>
  );
}
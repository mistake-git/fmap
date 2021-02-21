import React, {Fragment}　from "react";
import CommentModel from "../../models/CommentModel";
import CommentForm from './CommentForm';
import Comment from './Comment';
import PostModel from "../../models/PostModel";
import CommentFormModel from "../../forms/CommentFormModel";
import { Box} from "@material-ui/core";
import { Link } from 'react-router-dom';
import { User } from "firebase";

interface Props {
  firebaseAuthUser: User | null | undefined
  post: PostModel
  comments: CommentModel[]
  createComment: (comment: CommentFormModel) => {}
  destroyComment: (id: number) => {}
  updateComment: (comment: CommentFormModel) => {}
}

export default function CommentContainer(props: Props) {
  return (
    <Fragment>
     {props.firebaseAuthUser ?
     <CommentForm 
        comments={props.comments}
        commentsCount={props.comments.length}
        createComment={props.createComment}
        post={props.post}
      />:
        <Box textAlign="center" my={5}>
          コメントするには 
          <Link to='/signin'>
            ログイン
          </Link>
          してください
        </Box>
      }
      {props.comments.map((comment: CommentModel) => (
        <Comment
          key={comment.id}
          comment={comment}
          post={props.post}
          destroyComment={props.destroyComment}
          updateComment={props.updateComment}
        />
      ))}
    </Fragment>
  );
}
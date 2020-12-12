import React, {Fragment}　from "react";
import CommentModel from "../../models/CommentModel";
import CommentForm from './CommentForm';
import Comment from './Comment';


export default function CommentContainer(props: any) {
  return (
    <Fragment>
     <CommentForm 
      comments={props.comments}
      commentsCount={props.comments.length}
      createComment={props.createComment}
      user={props.user}
      post={props.post}
      />
      {props.comments.map((comment: CommentModel) => (
        <Comment
          comment={comment}
          post={props.post}
          destroyComment={props.destroyComment}
          updateComment={props.updateComment}
          user={props.user}
        />
      ))}
    </Fragment>
  );
}
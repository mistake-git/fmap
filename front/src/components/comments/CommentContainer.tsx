import React, {Fragment}　from "react";
import CommentForm from './CommentForm';
import Comments from './Comments';


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
     <Comments 
      comments={props.comments}
      post={props.post} 
      destroyComment={props.destroyComment}
      updateComment={props.updateComment}
      user={props.user}
     />
    </Fragment>
  );
}
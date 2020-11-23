import React　from "react";
import CommentForm from './CommentForm';
import Comments from './Comments';


export default function CommentContainer(props: any) {
  return (
    <React.Fragment>
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
      user={props.user}
     />
    </React.Fragment>
  );
}
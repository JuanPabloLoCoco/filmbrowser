import React from "react";
import { mainTheme } from "../../App";

interface CommentListProps {
  list: Comment[];
  myComment?: Comment;
}

export interface Comment {
  id: number;
  rate?: number;
  description: string;
  name: string;
  date?: Date;
}

const CommentList: React.FC<CommentListProps> = (props: CommentListProps) => {
  const commentList = props.myComment
    ? [props.myComment, ...props.list]
    : props.list;
  return (
    <>
      {commentList.map((comment) => {
        return (
          <div
            style={{ marginBottom: "1.5em" }}
            key={`cli-${comment.description}`}
          >
            <div
              className="head3"
              style={{
                color: mainTheme.palette.midGrey.main,
              }}
            >
              {comment.name}
              {comment.rate && ` - ${comment.rate}/5`}
            </div>
            <div className="normal1">{comment.description}</div>
          </div>
        );
      })}
    </>
  );
};

export default CommentList;

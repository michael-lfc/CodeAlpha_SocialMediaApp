import type { CommentType } from "../../types/comment.types";

type CommentItemProps = {
  comment: CommentType;
};

const CommentItem = ({ comment }: CommentItemProps) => {
  // If comment is missing, return nothing
  if (!comment) return null;

  // userId may be a string or object
  const user =
    typeof comment.userId === "object" ? comment.userId : null;

  const username = user?.username || "Unknown";
  const profileImage = user?.profileImage?.url || "/default-avatar.png";

  return (
    <div className="comment-item">
      <div className="comment-user">
        <img
          src={profileImage}
          alt={username}
          className="comment-avatar"
        />

        <div className="comment-user-details">
          <p className="comment-username">{username}</p>
          <p className="comment-date">
            {comment.createdAt
              ? new Date(comment.createdAt).toLocaleString()
              : ""}
          </p>
        </div>
      </div>

      <p className="comment-text">
        {typeof comment.text === "string" ? comment.text : ""}
      </p>
    </div>
  );
};

export default CommentItem;

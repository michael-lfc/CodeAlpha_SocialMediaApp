// import type { Comment } from "../../types/comment.types";

// type CommentItemProps = {
//   comment: Comment;
// };

// const CommentItem = ({ comment }: CommentItemProps) => {
//   return (
//     <div className="comment-item">
//       <div className="comment-user">
//         <img
//           src={comment.userId.profileImage?.url || "/default-avatar.png"}
//           alt={comment.userId.username}
//           className="comment-avatar"
//         />
//         <div className="comment-user-details">
//           <p className="comment-username">{comment.userId.username}</p>
//           <p className="comment-date">{new Date(comment.createdAt).toLocaleString()}</p>
//         </div>
//       </div>

//       <p className="comment-text">{comment.text}</p>
//     </div>
//   );
// };

// export default CommentItem;


import type { Comment } from "../../types/comment.types";

type CommentItemProps = {
  comment: Comment;
};

const CommentItem = ({ comment }: CommentItemProps) => {
  return (
    <div className="comment-item">
      <div className="comment-user">
        <img
          src={comment.userId.profileImage?.url || "/default-avatar.png"}
          alt={comment.userId.username}
          className="comment-avatar"
        />
        <div className="comment-user-details">
          <p className="comment-username">{comment.userId.username}</p>
          <p className="comment-date">
            {new Date(comment.createdAt).toLocaleString()}
          </p>
        </div>
      </div>

      <p className="comment-text">{comment.text}</p>
    </div>
  );
};

export default CommentItem;

import { useState, useEffect } from "react";
import type { Post } from "../../types/post.types";
import { formatDate } from "../../utils/formatDate";
import { toggleLikePost } from "../../api/post.api";
import CommentList from "../comments/CommentList";
import CreateComment from "../comments/CreateComment";
import { Link } from "react-router-dom";


type PostCardProps = {
  post: Post;
};

const PostCard = ({ post }: PostCardProps) => {
  const [likes, setLikes] = useState<string[]>((
    post.likes || []
  ).map((id) => id.toString()));

  const [liked, setLiked] = useState(false);

  const [showComments, setShowComments] = useState(false);
  const [commentRefresh, setCommentRefresh] = useState(0);

  const userId = localStorage.getItem("userId") || "";

  useEffect(() => {
    setLiked(likes.includes(userId));
  }, [likes, userId]);

  const handleLike = async () => {
    try {
      // Get updated post from backend
      const updatedPost = await toggleLikePost(post._id);

      // Convert likes to string array
      const updatedLikes = updatedPost.likes.map((id) => id.toString());

      setLikes(updatedLikes);
      setLiked(updatedLikes.includes(userId));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="post-card">
      <div className="post-card__header">
        <img
          className="post-card__avatar"
          src={post.author.profileImage?.url || "https://via.placeholder.com/40"}
          alt="profile"
        />
        <div>
          {/* <div className="post-card__name">{post.author.username}</div> */}
          <div className="post-card__name">
            <Link to={`/users/${post.author._id}`}>
              {post.author.username}
            </Link>
          </div>

          <div className="post-card__time">{formatDate(post.createdAt)}</div>
        </div>
      </div>

      <div className="post-card__content">{post.content}</div>

      <div className="post-card__actions">
        <button
          className={`like-btn ${liked ? "liked" : ""}`}
          onClick={handleLike}
        >
          {liked ? "❤️ Liked" : "🤍 Like"} ({likes.length})
        </button>

        <button
          className="comment-toggle-btn"
          onClick={() => setShowComments((prev) => !prev)}
        >
          💬 Comments ({post.commentCount || 0})
        </button>
      </div>

      {showComments && (
        <div className="post-card__comments">
          <CreateComment
            postId={post._id}
            onCommentAdded={() => setCommentRefresh((prev) => prev + 1)}
          />
          <CommentList postId={post._id} key={commentRefresh} />
        </div>
      )}
    </div>
  );
};

export default PostCard;

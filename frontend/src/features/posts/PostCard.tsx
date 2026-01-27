import { useState, useEffect } from "react";
import type { Post } from "../../types/post.types";
import { formatDate } from "../../utils/formatDate";
import { toggleLikePost, deletePost, updatePost } from "../../api/post.api";
import CommentList from "../comments/CommentList";
import CreateComment from "../comments/CreateComment";
import { Link } from "react-router-dom";

type PostCardProps = {
  post: Post;
  onDelete: (postId: string) => void;
};

const PostCard = ({ post, onDelete }: PostCardProps) => {
  const [likes, setLikes] = useState<string[]>(
    (post.likes || []).map((id) => id.toString())
  );

  const [liked, setLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [commentRefresh, setCommentRefresh] = useState(0);

  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(post.content);
  const [newContent, setNewContent] = useState(post.content);

  const userId = localStorage.getItem("userId") || "";

  const authorId =
    typeof post.author === "string"
      ? post.author
      : post.author._id?.toString();

  const isOwner = authorId === userId;

  useEffect(() => {
    setLiked(likes.includes(userId));
  }, [likes, userId]);

  useEffect(() => {
    setContent(post.content);
    setNewContent(post.content);
  }, [post.content]);

  const handleLike = async () => {
    try {
      const updatedPost = await toggleLikePost(post._id);
      const updatedLikes = updatedPost.likes.map((id) => id.toString());

      setLikes(updatedLikes);
      setLiked(updatedLikes.includes(userId));
    } catch (err) {
      console.error("Like error:", err);
    }
  };

  const handleDelete = async () => {
    try {
      await deletePost(post._id);
      onDelete(post._id);
    } catch (err: any) {
      console.error("Delete error:", err.response?.data || err);
    }
  };

  const handleSave = async () => {
    try {
      const updated = await updatePost(post._id, newContent);
      setIsEditing(false);
      setContent(updated.content);
      setNewContent(updated.content);
    } catch (err: any) {
      console.error("Update error:", err.response?.data || err);
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
          <div className="post-card__name">
            <Link to={`/users/${authorId}`}>
              {typeof post.author === "string" ? "User" : post.author.username}
            </Link>
          </div>

          <div className="post-card__time">{formatDate(post.createdAt)}</div>
        </div>

        {isOwner && (
          <div className="post-card__owner-actions">
            <button type="button" onClick={() => setIsEditing(true)}>Edit</button>
            <button type="button" onClick={handleDelete}>Delete</button>
          </div>
        )}
      </div>

      {isEditing ? (
        <div className="edit-post">
          <textarea
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            rows={3}
          />
          <button type="button" onClick={handleSave}>Save</button>
          <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <div className="post-card__content">{content}</div>
      )}

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


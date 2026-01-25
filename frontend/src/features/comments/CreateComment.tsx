import { useState } from "react";
import { createComment } from "../../api/comment.api";
import { useAuth } from "../../hooks/useAuth";

type CreateCommentProps = {
  postId: string;
  onCommentAdded: () => void;
};

const CreateComment = ({ postId, onCommentAdded }: CreateCommentProps) => {
  const { user } = useAuth();
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  if (!user) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    setLoading(true);

    try {
      await createComment(postId, text);
      setText("");
      onCommentAdded();
    } catch (error) {
      console.error("Failed to create comment", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write a comment..."
      />
      <button type="submit" disabled={loading}>
        {loading ? "Posting..." : "Comment"}
      </button>
    </form>
  );
};

export default CreateComment;

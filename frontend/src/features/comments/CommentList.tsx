import { useEffect, useState } from "react";
import type { CommentType } from "../../types/comment.types";
import { getCommentsByPostId } from "../../api/comment.api";
import CommentItem from "./CommentItem";
import Loader from "../../components/Loader";

type CommentListProps = {
  postId: string;
};

const CommentList = ({ postId }: CommentListProps) => {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  const limit = 5;

  const [pagination, setPagination] = useState({
    hasNextPage: false,
    hasPrevPage: false,
    totalPages: 1,
  });

  useEffect(() => {
    // Reset page when postId changes
    setPage(1);
  }, [postId]);

  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true);

      try {
        const res = await getCommentsByPostId(postId, page, limit);
        setComments(res.comments || []);
        setPagination({
          hasNextPage: res.pagination.hasNextPage,
          hasPrevPage: res.pagination.hasPrevPage,
          totalPages: res.pagination.totalPages,
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [postId, page]);

  return (
    <div className="comment-list">
      {loading ? (
        <Loader />
      ) : comments.length === 0 ? (
        <p>No comments yet</p>
      ) : (
        comments.map((comment) => (
          <CommentItem key={comment._id} comment={comment} />
        ))
      )}

      {/* Pagination Controls */}
      {comments.length > 0 && (
        <div className="comment-pagination">
          <button
            onClick={() => setPage((prev) => prev - 1)}
            disabled={!pagination.hasPrevPage || loading}
          >
            Prev
          </button>

          <span>
            Page {page} of {pagination.totalPages}
          </span>

          <button
            onClick={() => setPage((prev) => prev + 1)}
            disabled={!pagination.hasNextPage || loading}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default CommentList;

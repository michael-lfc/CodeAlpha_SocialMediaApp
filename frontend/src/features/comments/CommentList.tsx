// // import { useEffect, useState } from "react";
// // import type { CommentType } from "../../types/comment.types";
// // import { getCommentsByPostId } from "../../api/comment.api";
// // import CommentItem from "./CommentItem";
// // import Loader from "../../components/Loader";

// // type CommentListProps = {
// //   postId: string;
// //   comments?: CommentType[]; // comments from PostCard
// // };

// // const CommentList = ({ postId, comments }: CommentListProps) => {
// //   const [loading, setLoading] = useState(true);
// //   const [allComments, setAllComments] = useState<CommentType[]>(comments || []);

// //   useEffect(() => {
// //     // If we already have comments from PostCard, don't fetch again
// //     if (comments?.length) {
// //       setAllComments(comments);
// //       setLoading(false);
// //       return;
// //     }

// //     const fetchComments = async () => {
// //       try {
// //         const res = await getCommentsByPostId(postId);

// //         // 💡 Safety: check if res.data exists
// //         if (res?.data && Array.isArray(res.data)) {
// //           setAllComments(res.data);
// //         } else {
// //           setAllComments([]);
// //         }
// //       } catch (error) {
// //         console.error("Failed to load comments", error);
// //         setAllComments([]);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchComments();
// //   }, [postId]); // ONLY run once per postId

// //   if (loading) return <Loader />;

// //   return (
// //     <div className="comment-list">
// //       {allComments
// //         .filter((c) => !!c.text)
// //         .map((comment) => (
// //           <CommentItem key={comment._id} comment={comment} />
// //         ))}
// //     </div>
// //   );
// // };

// // export default CommentList;


// import { useEffect, useState } from "react";
// import type { CommentType } from "../../types/comment.types";
// import { getCommentsByPostId } from "../../api/comment.api";
// import CommentItem from "./CommentItem";
// import Loader from "../../components/Loader";

// type CommentListProps = {
//   postId: string;
//   comments?: CommentType[];
// };

// const CommentList = ({ postId, comments }: CommentListProps) => {
//   const [loading, setLoading] = useState(true);
//   const [allComments, setAllComments] = useState<CommentType[]>(comments ?? []);

//   useEffect(() => {
//     // If comments were already passed from parent, use them
//     if (comments && comments.length > 0) {
//       setAllComments(comments);
//       setLoading(false);
//       return;
//     }

//     const fetchComments = async () => {
//       try {
//         const res = await getCommentsByPostId(postId);

//         // PaginatedResponse<CommentType[]>
//         if (Array.isArray(res.results)) {
//           setAllComments(res.results);
//         } else {
//           setAllComments([]);
//         }
//       } catch (error) {
//         console.error("Failed to load comments", error);
//         setAllComments([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchComments();
//   }, [postId, comments]);

//   if (loading) return <Loader />;

//   return (
//     <div className="comment-list">
//       {allComments.length === 0 ? (
//         <p className="no-comments">No comments yet</p>
//       ) : (
//         allComments
//           .filter((comment) => Boolean(comment.text))
//           .map((comment) => (
//             <CommentItem key={comment._id} comment={comment} />
//           ))
//       )}
//     </div>
//   );
// };

// export default CommentList;

import { useEffect, useState } from "react";
import type { CommentType } from "../../types/comment.types";
import { getCommentsByPostId } from "../../api/comment.api";
import CommentItem from "./CommentItem";
import Loader from "../../components/Loader";

type CommentListProps = {
  postId: string;
  comments?: CommentType[];
};

const CommentList = ({ postId, comments }: CommentListProps) => {
  const [loading, setLoading] = useState(true);
  const [allComments, setAllComments] = useState<CommentType[]>(comments ?? []);

  useEffect(() => {
    // Use comments from parent if available
    if (comments && comments.length > 0) {
      setAllComments(comments);
      setLoading(false);
      return;
    }

    const fetchComments = async () => {
      try {
        const res = await getCommentsByPostId(postId);

        // ✅ CORRECT: comments live on res.comments
        if (Array.isArray(res.comments)) {
          setAllComments(res.comments);
        } else {
          setAllComments([]);
        }
      } catch (error) {
        console.error("Failed to load comments", error);
        setAllComments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [postId, comments]);

  if (loading) return <Loader />;

  return (
    <div className="comment-list">
      {allComments.length === 0 ? (
        <p className="no-comments">No comments yet</p>
      ) : (
        allComments
          .filter((comment) => Boolean(comment.text))
          .map((comment) => (
            <CommentItem key={comment._id} comment={comment} />
          ))
      )}
    </div>
  );
};

export default CommentList;

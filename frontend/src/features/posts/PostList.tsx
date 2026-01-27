// import { useEffect, useState } from "react";
// import { getPosts } from "../../api/post.api";
// import type { Post } from "../../types/post.types";
// import type { PaginatedResponse } from "../../types/api.types";
// import PostCard from "./PostCard";
// import Pagination from "../../components/Pagination";
// import { usePagination } from "../../hooks/usePagination";
// import Loader from "../../components/Loader";

// const PostList = () => {
//   const { page, goToPage } = usePagination();
//   const [posts, setPosts] = useState<Post[]>([]);
//   const [pagination, setPagination] = useState<any>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const fetchPosts = async (pageNumber: number) => {
//     setLoading(true);
//     setError(null);

//     try {
//       const res: PaginatedResponse<Post[]> = await getPosts(pageNumber);
//       setPosts(res.posts || []);
//       setPagination(res.pagination);
//     } catch (error) {
//       setError("Failed to fetch posts");
//       console.error("Failed to fetch posts", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPosts(page);
//   }, [page]);

//   if (loading) return <Loader />;

//   if (!posts.length) return <p>No posts yet.</p>;

//   return (
//     <div className="post-list">
//       {error && <p>{error}</p>}

//       {posts.map((post) => (
//         <PostCard key={post._id} post={post} />
//       ))}

//       {pagination && (
//         <Pagination
//           pagination={pagination}
//           onPageChange={goToPage}
//           loading={loading}
//         />
//       )}
//     </div>
//   );
// };

// export default PostList;

import { useEffect, useState } from "react";
import { getPosts } from "../../api/post.api";
import type { Post } from "../../types/post.types";
import type { PaginatedResponse } from "../../types/api.types";
import PostCard from "./PostCard";
import Pagination from "../../components/Pagination";
import { usePagination } from "../../hooks/usePagination";
import Loader from "../../components/Loader";

const PostList = () => {
  const { page, goToPage } = usePagination();
  const [posts, setPosts] = useState<Post[]>([]);
  const [pagination, setPagination] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = async (pageNumber: number) => {
    setLoading(true);
    setError(null);

    try {
      const res: PaginatedResponse<Post[]> = await getPosts(pageNumber);
      setPosts(res.posts || []);
      setPagination(res.pagination);
    } catch (error) {
      setError("Failed to fetch posts");
      console.error("Failed to fetch posts", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(page);
  }, [page]);

  // ✅ NEW: delete post from UI
  const handleDeletePost = (postId: string) => {
    setPosts((prev) => prev.filter((p) => p._id !== postId));
  };

  if (loading) return <Loader />;

  if (!posts.length) return <p>No posts yet.</p>;

  return (
    <div className="post-list">
      {error && <p>{error}</p>}

      {posts.map((post) => (
        <PostCard
          key={post._id}
          post={post}
          onDelete={handleDeletePost}  // <-- pass callback
        />
      ))}

      {pagination && (
        <Pagination
          pagination={pagination}
          onPageChange={goToPage}
          loading={loading}
        />
      )}
    </div>
  );
};

export default PostList;

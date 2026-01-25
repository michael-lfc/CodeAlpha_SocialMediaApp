// import type { ApiResponse, PaginatedResponse } from "../types/api.types";
// import type { CommentType } from "../types/comment.types";
// import axios from "./axios";

// const BASE_URL = "/comments";

// export const getCommentsByPostId = async (
//   postId: string,
//   page = 1,
//   limit = 10
// ): Promise<PaginatedResponse<Comment[]>> => {
//   const res = await axios.get<PaginatedResponse<Comment[]>>(
//     `${BASE_URL}/${postId}`,
//     {
//       params: { page, limit },
//     }
//   );

//   return res.data;
// };

// export const createComment = async (
//   postId: string,
//   text: string
// ): Promise<ApiResponse<Comment>> => {
//   const res = await axios.post<ApiResponse<CommentType>>(`${BASE_URL}`, {
//     postId,
//     text,
//   });

//   return res.data;
// };

// export const deleteComment = async (commentId: string) => {
//   const res = await axios.delete<ApiResponse<null>>(
//     `${BASE_URL}/${commentId}`
//   );

//   return res.data;
// };

// export const updateComment = async (
//   commentId: string,
//   text: string
// ): Promise<ApiResponse<Comment>> => {
//   const res = await axios.put<ApiResponse<Comment>>(
//     `${BASE_URL}/${commentId}`,
//     { text }
//   );

//   return res.data;
// };

import type { ApiResponse, PaginatedResponse } from "../types/api.types";
import type { CommentType } from "../types/comment.types";
import axios from "./axios";

const BASE_URL = "/comments";

export const getCommentsByPostId = async (
  postId: string,
  page = 1,
  limit = 10
): Promise<PaginatedResponse<CommentType[]>> => {
  const res = await axios.get<PaginatedResponse<CommentType[]>>(
    `${BASE_URL}/${postId}`,
    {
      params: { page, limit },
    }
  );

  return res.data;
};

export const createComment = async (
  postId: string,
  text: string
): Promise<ApiResponse<CommentType>> => {
  const res = await axios.post<ApiResponse<CommentType>>(`${BASE_URL}`, {
    postId,
    text,
  });

  return res.data;
};

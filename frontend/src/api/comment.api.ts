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
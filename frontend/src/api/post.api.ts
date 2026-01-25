import axios from "./axios";
import type { Post } from "../types/post.types";
import type { PaginatedResponse, ApiResponse } from "../types/api.types";

export const getPosts = async (
  page = 1,
  limit = 10
): Promise<PaginatedResponse<Post[]>> => {
  const { data } = await axios.get(`/posts?page=${page}&limit=${limit}`);
  return data;
};

export const createPost = async (
  content: string
): Promise<ApiResponse<Post>> => {
  const { data } = await axios.post("/posts", { content });
  return data;
};

export const toggleLikePost = async (postId: string): Promise<Post> => {
  const { data } = await axios.put(`/posts/${postId}/like`);
  return data.post;   // <-- backend returns { success, message, post }
};

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
  return data.post;
};

export const deletePost = async (postId: string) => {
  const { data } = await axios.delete(`/posts/${postId}`);
  return data;
};

export const updatePost = async (postId: string, content: string) => {
  const { data } = await axios.put(`/posts/${postId}`, { content });
  return data.post;
};


import axiosInstance from "./axios";
import type { User } from "../types/user.types";

/**
 * Get a user's public profile
 * GET /api/users/:id
 */
export const getUserProfile = async (userId: string): Promise<User> => {
  const res = await axiosInstance.get<{ data: User }>(`/users/${userId}`);
  return res.data.data;
};

/**
 * Get logged-in user's profile
 * GET /api/users/profile
 */
export const getMyProfile = async (): Promise<User> => {
  const res = await axiosInstance.get<{ data: User }>("/users/profile");
  return res.data.data;
};

/**
 * Update logged-in user's profile (username / email)
 * PUT /api/users/profile
 */
export type UpdateProfilePayload = {
  username?: string;
  email?: string;
};

export const updateProfile = async (
  payload: UpdateProfilePayload
): Promise<User> => {
  const res = await axiosInstance.put<{ data: User }>(
    "/users/profile",
    payload
  );
  return res.data.data;
};

/**
 * Update logged-in user's profile image
 * PUT /api/users/profile-image
 */
export const updateProfileImage = async (
  formData: FormData
): Promise<User> => {
  const res = await axiosInstance.put<{ data: User }>(
    "/users/profile-image",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return res.data.data;
};

/**
 * Follow / unfollow a user
 * PUT /api/users/:id/follow
 */
export const toggleFollow = async (
  userId: string
): Promise<{ message: string }> => {
  const res = await axiosInstance.put<{ message: string }>(
    `/users/${userId}/follow`
  );

  return res.data;
};

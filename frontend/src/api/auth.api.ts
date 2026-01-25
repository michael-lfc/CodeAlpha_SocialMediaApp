import axiosInstance from "./axios";
import type { AuthResponse } from "../types/api.types";
import type { AuthUser } from "../types/auth.types";

export const login = async (data: { email: string; password: string }) => {
  const res = await axiosInstance.post<AuthResponse>("/auth/login", data);

  const user: AuthUser = {
    _id: res.data.user.id,
    username: res.data.user.username,
    email: res.data.user.email,
    profileImage: res.data.user.profileImage
      ? { url: res.data.user.profileImage, public_id: "" }
      : undefined,
  };

  return { token: res.data.token, user };
};

export const register = async (data: { username: string; email: string; password: string }) => {
  const res = await axiosInstance.post<AuthResponse>("/auth/register", data);

  const user: AuthUser = {
    _id: res.data.user.id,
    username: res.data.user.username,
    email: res.data.user.email,
    profileImage: res.data.user.profileImage
      ? { url: res.data.user.profileImage, public_id: "" }
      : undefined,
  };

  return { token: res.data.token, user };
};

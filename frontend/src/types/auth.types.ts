import type { UserPreview } from "./user.types";

export interface AuthUser {
  _id: string;
  username: string;
  email: string;
  profileImage?: {
    url: string;
    public_id: string;
  };
  followers?: UserPreview[];
  following?: UserPreview[];
  createdAt?: string;
}

export interface AuthResponse {
  token: string;
  user: AuthUser;
}


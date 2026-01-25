import type { User } from "./user.types";

export interface Post {
  _id: string;
  author: Pick<User, "_id" | "username" | "profileImage">;
  content: string;
  likes: string[];
  createdAt: string;

  // Add this
  commentCount?: number;
}

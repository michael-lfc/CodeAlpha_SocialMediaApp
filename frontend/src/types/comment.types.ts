import type { User } from "./user.types";


export interface CommentType {
  _id: string;
  postId: string;
  userId: Pick<User, "_id" | "username" | "profileImage">;
  text: string;
  createdAt: string;
}

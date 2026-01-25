import type { User } from "./user.types";


export interface Comment {
  _id: string;
  postId: string;
  userId: Pick<User, "_id" | "username" | "profileImage">;
  text: string;
  createdAt: string;
}

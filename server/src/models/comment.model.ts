import mongoose, { Schema, Document, Types } from "mongoose";

// Comment interface
export interface IComment extends Document {
  postId: Types.ObjectId;    // Reference to the Post
  userId: Types.ObjectId;    // Reference to the User
  text: string;
  createdAt: Date;
  updatedAt: Date;
}

// Comment schema
const commentSchema = new Schema<IComment>(
  {
    postId: { type: Schema.Types.ObjectId, ref: "Post", required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IComment>("Comment", commentSchema);

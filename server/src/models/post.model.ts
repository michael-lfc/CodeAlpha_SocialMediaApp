import mongoose, { Schema, Document, Types } from "mongoose";

export interface IPost extends Document {
  author: Types.ObjectId;
  content: string;
  likes: Types.ObjectId[];
}

const postSchema = new Schema<IPost>(
  {
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

export default mongoose.model<IPost>("Post", postSchema);

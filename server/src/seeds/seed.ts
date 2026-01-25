import dotenv from "dotenv";
import connectDB from "../config/db.js";

import User from "../models/user.model.js";
import Post from "../models/post.model.js";
import Comment from "../models/comment.model.js";

dotenv.config();

const seedData = async () => {
  try {
    await connectDB();

    // Clear old data (optional)
    await Comment.deleteMany();
    await Post.deleteMany();
    await User.deleteMany();

    const user = await User.create({
      username: "michael",
      email: "michael@test.com",
      password: "password123",
    });

    const post = await Post.create({
      author: user._id,
      content: "My first post on this social media app!",
    });

    await Comment.create({
      postId: post._id,
      userId: user._id,
      text: "First comment 🎉",
    });

    console.log("✅ Seed data inserted successfully");
    process.exit();
  } catch (error) {
    console.error("❌ Seeding error:", error);
    process.exit(1);
  }
};

seedData();

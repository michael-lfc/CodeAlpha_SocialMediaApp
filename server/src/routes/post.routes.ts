import { Router } from "express";
import { createPost, getPosts, toggleLike, deletePost, updatePost } from "../controllers/post.controller.js";
import protect from "../middleware/auth.middleware.js";


const router = Router();

// Create a post (protected)
router.post("/", protect, createPost);


// Get all posts
router.get("/", getPosts);

// Get posts by user (with pagination)
router.get("/user/:id", getPosts);

// Like / unlike a post
router.put("/:id/like", protect, toggleLike);

// NEW
router.delete("/:id", protect, deletePost);
router.put("/:id", protect, updatePost);

export default router; // ✅ Default export

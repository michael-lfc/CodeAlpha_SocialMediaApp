import { Router } from "express";
import { addComment, getComments } from "../controllers/comment.controller.js";
import protect from "../middleware/auth.middleware.js";

const router = Router();

// Add a comment (protected)
router.post("/", protect, addComment);

// Get all comments for a post (public)
router.get("/:postId", getComments);

export default router;

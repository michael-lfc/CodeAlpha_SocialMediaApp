import { Router } from "express";
import {
  addComment,
  getComments,
  deleteComment,
  updateComment,
} from "../controllers/comment.controller.js";
import protect from "../middleware/auth.middleware.js";


const router = Router();

// Add a comment (protected)
router.post("/", protect, addComment);

// Get all comments for a post (public)
router.get("/:postId", getComments);

// NEW

router.delete("/:id", protect, deleteComment);
router.put("/:id", protect, updateComment);

export default router;

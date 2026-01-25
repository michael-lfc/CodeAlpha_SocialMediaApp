import { Router } from "express";
import {
  getUserProfile,
  getMyProfile,
  updateProfileImage,
  toggleFollow,
  updateProfile,
} from "../controllers/user.controller.js";
import { uploadSingleImage, uploadToCloudinaryAndDeleteOld } from "../middleware/upload.middleware.js";
import protect from "../middleware/auth.middleware.js";

const router = Router();

// 🔐 Get own profile
router.get("/profile", protect, getMyProfile);

// 🔓 Public route
router.get("/:id", getUserProfile);

// 🔐 Update own profile
router.put("/profile", protect, updateProfile);

// 🔐 Update own profile image
router.put(
  "/profile-image",
  protect,
  uploadSingleImage,
  uploadToCloudinaryAndDeleteOld,
  updateProfileImage
);

// 🔐 Follow / unfollow another user
router.put("/:id/follow", protect, toggleFollow);

export default router;

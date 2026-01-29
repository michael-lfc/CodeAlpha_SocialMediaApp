import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import User from "../models/user.model.js";
import { AppError } from "../utils/AppError.js";
import cloudinary from "../config/cloudinary.js";

export const getMyProfile = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    throw new AppError("Not authenticated", 401);
  }

  const user = await User.findById(req.user._id)
    .select("-password")
    .populate("followers", "username profileImage _id")
    .populate("following", "username profileImage _id");

  if (!user) {
    throw new AppError("User not found", 404);
  }

  res.status(200).json({
    success: true,
    data: user,
  });
});



export const getUserProfile = asyncHandler(
  async (req: Request, res: Response) => {
    const user = await User.findById(req.params.id)
      .select("-password")
      .populate("followers", "username profileImage _id")
      .populate("following", "username profileImage _id");

    if (!user) {
      throw new AppError("User not found", 404);
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  }
);


export const updateProfile = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user) {
      throw new AppError("Not authenticated", 401);
    }

    const user = await User.findById(req.user._id);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    const { username, email } = req.body;

    // Optional: prevent duplicate emails
    if (email && email !== user.email) {
      const emailExists = await User.findOne({ email });
      if (emailExists) {
        throw new AppError("Email already exists", 400);
      }
      user.email = email;
    }

    if (username) user.username = username;

    await user.save();

    const updatedUser = await User.findById(user._id)
      .select("-password")
      .populate("followers", "username profileImage _id")
      .populate("following", "username profileImage _id");

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: updatedUser
    });
  }
);


export const updateProfileImage = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) throw new AppError("Not authenticated", 401);

  if (!req.body.profileImage) {
    throw new AppError("Image upload failed", 400);
  }

  const user = await User.findById(req.user._id);
  if (!user) throw new AppError("User not found", 404);

  // 🔥 Delete old image
  if (user.profileImage?.public_id) {
    await cloudinary.uploader.destroy(user.profileImage.public_id);
  }

  user.profileImage = req.body.profileImage;
  await user.save();

  const updatedUser = await User.findById(user._id)
  .select("-password")
  .populate("followers", "username profileImage _id")
  .populate("following", "username profileImage _id");

  res.status(200).json({
    success: true,
    message: "Profile image updated",
    data: updatedUser,
  });
});


export const toggleFollow = asyncHandler(
  async (req: Request, res: Response) => {
    // ✅ Add authentication check
    if (!req.user) {
      throw new AppError("Not authenticated", 401);
    }

    const userToFollow = await User.findById(req.params.id);
    const currentUser = await User.findById(req.user._id);

    if (!userToFollow || !currentUser) {
      throw new AppError("User not found", 404);
    }

    const isFollowing = currentUser.following
      .map(id => id.toString())
      .includes(userToFollow._id.toString());

    if (isFollowing) {
      currentUser.following = currentUser.following.filter(
        id => id.toString() !== userToFollow._id.toString()
      );
      userToFollow.followers = userToFollow.followers.filter(
        id => id.toString() !== currentUser._id.toString()
      );
    } else {
      currentUser.following.push(userToFollow._id);
      userToFollow.followers.push(currentUser._id);
    }

    await currentUser.save();
    await userToFollow.save();

    res.status(200).json({
      success: true,
      message: isFollowing ? "Unfollowed successfully" : "Followed successfully",
    });
  }
);


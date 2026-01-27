import { Request, Response } from "express";
import { Types } from "mongoose";
import Comment from "../models/comment.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { AppError } from "../utils/AppError.js";

interface AddCommentBody {
  postId: string;
  text: string;
}



export const addComment = asyncHandler(
  async (req: Request, res: Response) => {
    const { postId, text } = req.body as AddCommentBody;

    if (!req.user) {
      throw new AppError("Not authenticated", 401);
    }

    if (!text || !postId) {
      throw new AppError("Post ID and text are required", 400);
    }

    const comment = await Comment.create({
      postId,
      userId: req.user._id as Types.ObjectId,
      text,
    });

    // ✅ Populate user data before sending response
    const populatedComment = await comment.populate(
      "userId",
      "username profileImage"
    );

    res.status(201).json({
      success: true,
      message: "Comment added successfully",
      comment: populatedComment,
    });
  }
);


export const getComments = asyncHandler(
  async (req: Request, res: Response) => {
    // Pagination
    const page = Math.max(Number(req.query.page) || 1, 1);
    const limit = Math.min(Number(req.query.limit) || 10, 50);
    const skip = (page - 1) * limit;

    const [comments, total] = await Promise.all([
      Comment.find({ postId: req.params.postId })
        .populate("userId", "username profileImage")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Comment.countDocuments({ postId: req.params.postId }),
    ]);

    res.status(200).json({
      success: true,
      message: "Comments retrieved successfully",
      comments,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        hasNextPage: page * limit < total,
        hasPrevPage: page > 1,
      },
    });
  }
);

// DELETE COMMENT
export const deleteComment = asyncHandler(async (req: Request, res: Response) => {
  const comment = await Comment.findById(req.params.id);
  if (!comment) throw new AppError("Comment not found", 404);

  if (comment.userId.toString() !== req.user!._id.toString()) {
    throw new AppError("Not authorized", 401);
  }

  await Comment.findByIdAndDelete(req.params.id);

  res.status(200).json({ success: true, message: "Comment deleted" });
});


// UPDATE COMMENT
export const updateComment = asyncHandler(async (req: Request, res: Response) => {
  const { text } = req.body;
  const comment = await Comment.findById(req.params.id);
  if (!comment) throw new AppError("Comment not found", 404);

  if (comment.userId.toString() !== req.user!._id.toString()) {
    throw new AppError("Not authorized", 401);
  }

  comment.text = text || comment.text;
  await comment.save();

  res.status(200).json({ success: true, message: "Comment updated", comment });
});

import { Request, Response } from "express";
import Comment from "../models/comment.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { AppError } from "../utils/AppError.js";

interface CreateCommentBody {
  text: string;
}

// ADD COMMENT
export const addComment = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) throw new AppError("Not authenticated", 401);

  const { text } = req.body as CreateCommentBody;
  if (!text) throw new AppError("Comment text required", 400);

  const comment = await Comment.create({
    postId: req.body.postId,
    userId: req.user._id,
    text,
  });

  res.status(201).json({ success: true, comment });
});

// GET COMMENTS
export const getComments = asyncHandler(async (req: Request, res: Response) => {
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
});

// DELETE COMMENT
export const deleteComment = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) throw new AppError("Not authenticated", 401);

  const comment = await Comment.findById(req.params.id);
  if (!comment) throw new AppError("Comment not found", 404);

  if (comment.userId.toString() !== req.user._id.toString()) {
    throw new AppError("Not authorized", 403);
  }

  await Comment.findByIdAndDelete(req.params.id);
  res.status(200).json({ success: true });
});

// UPDATE COMMENT
export const updateComment = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) throw new AppError("Not authenticated", 401);

  const comment = await Comment.findById(req.params.id);
  if (!comment) throw new AppError("Comment not found", 404);

  if (comment.userId.toString() !== req.user._id.toString()) {
    throw new AppError("Not authorized", 403);
  }

  comment.text = req.body.text || comment.text;
  await comment.save();

  res.status(200).json({ success: true, comment });
});

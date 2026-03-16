import { Request, Response } from "express";
import { Types } from "mongoose";
import Post from "../models/post.model.js";
import Comment from "../models/comment.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { AppError } from "../utils/AppError.js";

interface CreatePostBody {
  content: string;
}

// CREATE POST
export const createPost = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) throw new AppError("Not authenticated", 401);

  const { content } = req.body as CreatePostBody;
  if (!content) throw new AppError("Post content required", 400);

  const post = await Post.create({
    author: req.user._id as Types.ObjectId,
    content,
  });

  res.status(201).json({ success: true, post });
});

// GET POSTS (ALL or BY USER)
export const getPosts = asyncHandler(async (req: Request, res: Response) => {
  const page = Math.max(Number(req.query.page) || 1, 1);
  const limit = Math.min(Number(req.query.limit) || 10, 50);
  const skip = (page - 1) * limit;

  const filter = req.params.id ? { author: req.params.id } : {};

  const [posts, total] = await Promise.all([
    Post.find(filter)
      .populate("author", "username profileImage")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    Post.countDocuments(filter),
  ]);

  const postsWithCommentCount = await Promise.all(
    posts.map(async (post) => {
      const count = await Comment.countDocuments({ postId: post._id });
      return { ...post.toObject(), commentCount: count };
    })
  );

  res.status(200).json({
    success: true,
    posts: postsWithCommentCount,
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

// LIKE / UNLIKE
export const toggleLike = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) throw new AppError("Not authenticated", 401);

  const post = await Post.findById(req.params.id);
  if (!post) throw new AppError("Post not found", 404);

  const userId = req.user._id.toString();

  const liked = post.likes.some(
    (id) => id.toString() === userId
  );

  post.likes = liked
    ? post.likes.filter((id) => id.toString() !== userId)
    : [...post.likes, req.user._id];

  await post.save();

  res.status(200).json({ success: true, post });
});

// DELETE POST
export const deletePost = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) throw new AppError("Not authenticated", 401);

  const post = await Post.findById(req.params.id);
  if (!post) throw new AppError("Post not found", 404);

  if (post.author.toString() !== req.user._id.toString()) {
    throw new AppError("Not authorized", 403);
  }

  await Post.findByIdAndDelete(req.params.id);
  res.status(200).json({ success: true, message: "Post deleted" });
});

// UPDATE POST
export const updatePost = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) throw new AppError("Not authenticated", 401);

  const post = await Post.findById(req.params.id);
  if (!post) throw new AppError("Post not found", 404);

  if (post.author.toString() !== req.user._id.toString()) {
    throw new AppError("Not authorized", 403);
  }

  post.content = req.body.content || post.content;
  await post.save();

  res.status(200).json({ success: true, post });
});

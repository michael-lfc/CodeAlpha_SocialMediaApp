import { Request, Response } from "express";
import { Types } from "mongoose";
import Post from "../models/post.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { AppError } from "../utils/AppError.js";
import Comment from "../models/comment.model.js";


interface CreatePostBody {
  content: string;
}

export const createPost = asyncHandler(
  async (req: Request, res: Response) => {
    const { content } = req.body as CreatePostBody;

    if (!req.user) {
      throw new AppError("Not authenticated", 401);
    }

    if (!content) {
      throw new AppError("Post content is required", 400);
    }

    const author = req.user._id as Types.ObjectId;

    const post = await Post.create({ author, content });

    res.status(201).json({
      success: true,
      message: "Post created successfully",
      post,
    });
  }
);

export const getPosts = asyncHandler(
  async (req: Request, res: Response) => {
    const page = Math.max(Number(req.query.page) || 1, 1);
    const limit = Math.min(Number(req.query.limit) || 10, 50);
    const skip = (page - 1) * limit;

    // If userId exists in params, filter posts
    const filter = req.params.id ? { author: req.params.id } : {};

    const [posts, total] = await Promise.all([
      Post.find(filter)
        .populate("author", "username profileImage")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Post.countDocuments(filter),
    ]);

    // 🔥 NEW: Add commentCount for each post
    const postsWithCommentCount = await Promise.all(
      posts.map(async (post) => {
        const commentCount = await Comment.countDocuments({ postId: post._id });
        return { ...post.toObject(), commentCount };
      })
    );

    res.status(200).json({
      success: true,
      message: "Posts retrieved successfully",
      posts:  postsWithCommentCount,
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


export const toggleLike = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user) {
      throw new AppError("Not authenticated", 401);
    }

    const post = await Post.findById(req.params.id);
    if (!post) {
      throw new AppError("Post not found", 404);
    }

    const userId = req.user._id.toString();

    const hasLiked = post.likes
      .map((id: Types.ObjectId) => id.toString())
      .includes(userId);

    if (hasLiked) {
      post.likes = post.likes.filter(
        (id: Types.ObjectId) => id.toString() !== userId
      );
    } else {
      post.likes.push(req.user._id);
    }

    await post.save();

    res.status(200).json({
      success: true,
      message: hasLiked
        ? "Post unlike successfully"
        : "Post liked successfully",
      post,
    });
  }
);

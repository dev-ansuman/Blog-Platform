import type { Request, Response } from 'express';
import {
  addPost,
  getPostByPostId,
  getPostsByUserId,
  addCommentToPost,
  getCommentsByPostId,
  addReactionToPost,
  getReactionsByPostId,
} from '../db/queries.js';

const createPost = async (req: Request, res: Response) => {
  try {
    const { content } = req.body;
    const userId = req.userInfo!.userId;
    const createdAt = new Date().toISOString();
    const newPost = addPost.get(content, userId, createdAt);
    return res.status(201).json({
      success: true,
      message: 'New Post created!',
      newPost,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error - createPost',
      error,
    });
  }
};

const getUserPosts = async (req: Request, res: Response) => {
  try {
    const posts = getPostsByUserId.all(req.userInfo!.userId);
    return res.status(200).json({
      success: true,
      message: `Posts for ${req.userInfo!.username} retrieved successfully!`,
      posts,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error - getUserPosts',
      error,
    });
  }
};

const getUserPostById = async (req: Request, res: Response) => {
  try {
    const postId = Number(req.params.postId);
    const post = await getPostByPostId.get(postId);

    if (!post) {
      return res.status(404).json({
        success: true,
        message: `post-${postId}, not found`,
        post,
      });
    }

    return res.status(200).json({
      success: true,
      message: `post-${postId}, retrieved successfully`,
      post,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error - getUserPostById',
      error,
    });
  }
};

const addComment = async (req: Request, res: Response) => {
  try {
    const postId = Number(req.params.postId);
    const userId = req.userInfo!.userId;
    const { content } = req.body;
    const createdAt = new Date().toISOString();

    const newComment = addCommentToPost.get(content, postId, userId, createdAt);

    return res.status(201).json({
      success: true,
      message: 'Comment added successfully',
      newComment,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error - addComment',
      error,
    });
  }
};

const getComments = async (req: Request, res: Response) => {
  try {
    const postId = Number(req.params.postId);

    const comments = getCommentsByPostId.all(postId);

    return res.status(201).json({
      success: true,
      message: `Comments for postId - ${postId} retrieved successfully`,
      comments,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error - addComment',
      error,
    });
  }
};

const addReaction = async (req: Request, res: Response) => {
  try {
    const postId = Number(req.params.postId);
    const userId = req.userInfo!.userId;
    const { content } = req.body;
    const createdAt = new Date().toISOString();

    const newReaction = addReactionToPost.get(content, postId, userId, createdAt);

    return res.status(201).json({
      success: true,
      message: 'Reaction added successfully',
      newReaction,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error - addReaction',
      error,
    });
  }
};

const getReactions = async (req: Request, res: Response) => {
  try {
    const postId = Number(req.params.postId);

    const reactions = getReactionsByPostId.all(postId);

    return res.status(201).json({
      success: true,
      message: `Reactions for postId - ${postId} retrieved successfully`,
      reactions,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error - addComment',
      error,
    });
  }
};

export {
  createPost,
  getUserPosts,
  getUserPostById,
  addComment,
  getComments,
  addReaction,
  getReactions,
};

import type { Request, Response } from 'express';
import {
  addCommentService,
  addReactionService,
  createPostService,
  getCommentsService,
  getReactionsService,
  getUserPostByIdService,
  getUserPostsService,
} from '../services/blog.js';

const createPost = async (req: Request, res: Response) => {
  try {
    if (!req.body) {
      return res.status(400).json({
        success: false,
        message: 'Please enter all required fields (BODY)!',
      });
    }

    const { content } = req.body;
    if (!content) {
      return res.status(400).json({
        success: false,
        message: 'Content cannot be empty!',
      });
    }
    const userId = req.userInfo!.userId;

    const newPost = await createPostService(content, userId);

    return res.status(201).json(newPost);
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
    const userId = req.userInfo!.userId;
    const username = req.userInfo!.username;
    const userPosts = await getUserPostsService(userId, username);

    return res.status(200).json(userPosts);
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
    const post = await getUserPostByIdService(postId);

    if (post.success) return res.status(200).json(post);
    else return res.status(400).json(post);
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
    if (!req.params) {
      return res.status(400).json({
        success: false,
        message: `Please select a post to comment!`,
      });
    }

    const postId = Number(req.params.postId);
    const userId = Number(req.userInfo!.userId);

    if (!req.body) {
      return res.status(400).json({
        success: false,
        message: 'Please enter all required fields (BODY)!',
      });
    }
    const { content } = req.body;

    const newComment = await addCommentService(content, postId, userId);

    return res.status(201).json(newComment);
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
    if (!req.params) {
      return res.status(400).json({
        success: false,
        message: `Please select a post to comment!`,
      });
    }
    const postId = Number(req.params.postId);

    const comments = await getCommentsService(postId);

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
    if (!req.params) {
      return res.status(400).json({
        success: false,
        message: `Please select a post to comment!`,
      });
    }

    const postId = Number(req.params.postId);
    const userId = req.userInfo!.userId;

    if (!req.body) {
      return res.status(400).json({
        success: false,
        message: 'Please enter all required fields (BODY)!',
      });
    }
    const { content } = req.body;

    const newReaction = await addReactionService(content, postId, userId);

    return res.status(201).json(newReaction);
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
    if (!req.params) {
      return res.status(400).json({
        success: false,
        message: `Please select a post to add reaction!`,
      });
    }
    const postId = Number(req.params.postId);

    const reactions = await getReactionsService(postId);

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

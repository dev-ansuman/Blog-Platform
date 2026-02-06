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
import { ERROR, REQUIRED } from '../constants/common.js';
import { POST } from '../constants/blog.js';

const createPost = async (req: Request, res: Response) => {
  try {
    if (!req.body) {
      return res.status(400).json({
        success: false,
        message: REQUIRED.REQUIRED_FIELDS,
      });
    }

    const { content } = req.body;
    if (!content) {
      return res.status(400).json({
        success: false,
        message: REQUIRED.REQUIRED_FIELDS,
      });
    }
    const userId = req.userInfo!.userId;

    const newPost = await createPostService(content, userId);

    return res.status(201).json(newPost);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `${ERROR.INTERNAL_SERVER} - createPost`,
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
      message: `${ERROR.INTERNAL_SERVER} - getUserPosts`,
      error,
    });
  }
};

const getUserPostById = async (req: Request, res: Response) => {
  try {
    if (!req.params) {
      return res.status(400).json({
        success: false,
        message: POST.POST_NOT_SELECTED,
      });
    }
    const postId = Number(req.params.postId);
    const post = await getUserPostByIdService(postId);

    if (post.success) return res.status(200).json(post);
    else return res.status(400).json(post);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `${ERROR.INTERNAL_SERVER} - getUserPostById`,
      error,
    });
  }
};

const addComment = async (req: Request, res: Response) => {
  try {
    if (!req.params) {
      return res.status(400).json({
        success: false,
        message: `${POST.POST_NOT_SELECTED} to comment!`,
      });
    }

    const postId = Number(req.params.postId);
    const userId = Number(req.userInfo!.userId);

    if (!req.body) {
      return res.status(400).json({
        success: false,
        message: REQUIRED.REQUIRED_FIELDS,
      });
    }
    const { content } = req.body;

    const newComment = await addCommentService(content, postId, userId);

    return res.status(201).json(newComment);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `${ERROR.INTERNAL_SERVER} - addComment`,
      error,
    });
  }
};

const getComments = async (req: Request, res: Response) => {
  try {
    if (!req.params) {
      return res.status(400).json({
        success: false,
        message: `${POST.POST_NOT_SELECTED} to comment!`,
      });
    }
    const postId = Number(req.params.postId);

    const comments = await getCommentsService(postId);

    return res.status(201).json(comments);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `${ERROR.INTERNAL_SERVER} - addComment`,
      error,
    });
  }
};

const addReaction = async (req: Request, res: Response) => {
  try {
    if (!req.params) {
      return res.status(400).json({
        success: false,
        message: `${POST.POST_NOT_SELECTED} to comment!`,
      });
    }

    const postId = Number(req.params.postId);
    const userId = req.userInfo!.userId;

    if (!req.body) {
      return res.status(400).json({
        success: false,
        message: REQUIRED.REQUIRED_FIELDS,
      });
    }
    const { content } = req.body;

    const newReaction = await addReactionService(content, postId, userId);

    return res.status(201).json(newReaction);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `${ERROR.INTERNAL_SERVER} - addReaction`,
      error,
    });
  }
};

const getReactions = async (req: Request, res: Response) => {
  try {
    if (!req.params) {
      return res.status(400).json({
        success: false,
        message: `${POST.POST_NOT_SELECTED} to add reaction!`,
      });
    }
    const postId = Number(req.params.postId);

    const reactions = await getReactionsService(postId);

    return res.status(201).json(reactions);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `${ERROR.INTERNAL_SERVER} - addComment`,
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
